<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    public function index()
    {
        $purchases = Order::where('type', 'Purchase')->with(['orderItems.product', 'party'])->get();
        foreach ($purchases as $order) {
            $total = 0;
            foreach ($order->orderItems as $item) {
                $item->total = $item->price * $item->quantity;
                $total += $item->total;
            }

            // Add total_amount explicitly
            $order->setAttribute('total_amount', $total);
        }
        return response()->json([
            'status' => true,
            'purchases' => $purchases
        ], 200);
    }
   public function store(Request $request)
{
    $request->validate([
        'party_id' => 'required|exists:parties,id',
        'items' => 'required|array',
        'items.*.product_id' => 'required|exists:products,id',
        'items.*.quantity' => 'required|integer|min:1',
        'items.*.price' => 'required|numeric|min:0',
        'items.*.warehouse_id' => 'required|exists:warehouses,id'
    ]);

    $order = new Order();
    $order->type = 'Purchase';
    $order->party_id = $request->party_id;
    $order->save();

    foreach ($request->items as $item) {
        // Save to OrderItem
        $orderitem = new OrderItem();
        $orderitem->order_id = $order->id;
        $orderitem->product_id = $item['product_id'];
        $orderitem->quantity = $item['quantity'];
        $orderitem->price = $item['price']; // save price
        $orderitem->warehouse_id = $item['warehouse_id'];
        $orderitem->save();

        // Check and update product price if different
        $product = Product::find($item['product_id']);
        if ($product && $product->price != $item['price']) {
            $product->price = $item['price'];
            $product->save();
        }

        // Update or insert into product_warehouses
        DB::table('product_warehouses')->updateOrInsert(
            [
                'product_id' => $item['product_id'],
                'warehouse_id' => $item['warehouse_id']
            ],
            [
                'quantity' => DB::raw('quantity + ' . $item['quantity']),
                'updated_at' => now(),
                'created_at' => now()
            ]
        );
    }

    return response()->json(['status' => true, 'message' => "Order request has been created successfully!"], 200);
}

    
public function recommendPurchaseAllocation(Request $request)
{
  
    $purchaseItems= $request->items;

    $warehouses = Warehouse::with('products')->get();

    $warehouses->transform(function ($wh) {
        $usedCapacity = $wh->products->sum('pivot.quantity');
        $wh->remaining_capacity = $wh->capacity - $usedCapacity;
        return $wh;
    });

    $totalRemainingCapacity = $warehouses->sum('remaining_capacity');
    $totalPurchaseQty = collect($purchaseItems)->sum('quantity');

    if ($totalPurchaseQty > $totalRemainingCapacity) {
        return response()->json(['status'=>false, 'message'=>'Not enough total warehouse capacity for this purchase order.'],422);
    }

    $recommendations = [];

    foreach ($purchaseItems as $item) {
        $product = Product::find($item['product_id']);
        $qtyToAllocate = $item['quantity'];

        foreach ($warehouses as $wh) {
            if ($qtyToAllocate <= 0) break;

            if ($wh->remaining_capacity > 0) {
                $allocateQty = min($qtyToAllocate, $wh->remaining_capacity);

                $recommendations[] = [
                    'warehouse_id' => $wh->id,
                    'warehouse_name' => $wh->name,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'quantity' => $allocateQty,
                    'price'=>$item['price']
                ];

                $wh->remaining_capacity -= $allocateQty;
                $qtyToAllocate -= $allocateQty;
            }
        }
    }

    return response()->json(['status'=>true,'distributed'=>$recommendations]);
}

public function updateStatus($orderId, $status)
{
    if (!in_array($status, ['complete', 'cancel'])) {
        return response()->json(['status' => false, 'message' => 'Invalid status'], 400);
    }

    $order = Order::with('orderItems')->findOrFail($orderId);
    $previousStatus = $order->status;

    // Update status
    $order->status = $status;
    $order->save();

    // Handle stock changes
    foreach ($order->orderItems as $item) {
        
        if ($status === 'cancel') {
            // Revert stock increase
            DB::table('product_warehouses')
                ->where('product_id', $item->product_id)
                ->where('warehouse_id', $item->warehouse_id)
                ->decrement('quantity', $item->quantity);
        }
    }

    return response()->json(['status' => true, 'message' => "Purchase order marked as {$status}"]);
}

// public function edit(Request $request)
    // {
    //     $request->validate([
    //         'party_id' => 'required|exists:parties,id',
    //         'items' => 'required|array',
    //         'items.*.product_id' => 'required|exists:products,id',
    //         'items.*.quantity' => 'required|integer|min:1',
    //         // 'items.*.price' => 'required'
    //     ]);

    //     $order = new Order();
    //     $order->type = 'Purchase';
    //     $order->party_id = $request->party_id;
    //     $order->save();

    //     foreach ($request->items as $item) {
    //         $orderitem = new OrderItem();
    //         $orderitem->product_id = $request->product_id;
    //         $orderitem->product_id = $item['product_id'];
    //         $orderitem->quantity = $item['quantity'];

    //         $orderitem->save();
    //     }

    //     return response()->json(['status' => true, 'message' => "Order request has been created successfully!"], 200);
    // }

    // public function getDistribution(Request $request)
    // {
    //     $products = $request->items;
    //     $distributed = [];
    //     foreach ($products as $product) {
    //         $distributed[] = $this->distributePurchaseOrder($product['product_id'], $product['quantity']);
    //     }
    //     return response()->json(['status' => true, 'distributed' => $distributed]);
    // }

    // public function distributePurchaseOrder(int $productId, int $purchaseQty)
    // {
    //     $salesData = OrderItem::select('warehouse_id')
    //         ->join('orders', 'orders.id', '=', 'order_items.order_id')
    //         ->where('order_items.product_id', $productId)
    //         ->where('orders.type', 'Sell')
    //         ->groupBy('warehouse_id')
    //         ->selectRaw('warehouse_id, SUM(order_items.quantity) as total_sold')
    //         ->get();

    //     $totalSold = $salesData->sum('total_sold');

    //     $salesProportion = $salesData->mapWithKeys(function ($item) use ($totalSold) {
    //         return [
    //             $item->warehouse_id => $totalSold > 0 ? ($item->total_sold / $totalSold) : 0,
    //         ];
    //     });

    //     $warehouses = Warehouse::all()->map(function ($warehouse) use ($salesProportion) {
    //         $usedCapacity = DB::table('product_warehouses')
    //             ->where('warehouse_id', $warehouse->id)
    //             ->sum('quantity');

    //         return [
    //             'id' => $warehouse->id,
    //             'remaining_capacity' => max($warehouse->capacity - $usedCapacity, 0),
    //             'sales_proportion' => $salesProportion->get($warehouse->id, 0),
    //             'delivery_charge' => $warehouse->delivery_charge,
    //         ];
    //     });

    //     $leftover = $purchaseQty;
    //     $distributed = [];

    //     foreach ($warehouses as $warehouse) {
    //         if ($leftover <= 0) break;

    //         $idealQty = round($purchaseQty * $warehouse['sales_proportion']);
    //         $qtyToAssign = min($idealQty, $warehouse['remaining_capacity']);

    //         if ($qtyToAssign == 0 && $warehouse['remaining_capacity'] > 0 && $leftover > 0) {
    //             $qtyToAssign = min($warehouse['remaining_capacity'], $leftover);
    //         }

    //         if ($qtyToAssign > 0) {
    //             $distributed[] = [
    //                 'product_id' => $productId,
    //                 'warehouse_id' => $warehouse['id'],
    //                 'quantity' => $qtyToAssign,
    //             ];
    //             $leftover -= $qtyToAssign;
    //         }
    //     }

    //     if ($leftover > 0) {
    //         $warehousesByCost = $warehouses->sortBy('delivery_charge');

    //         foreach ($warehousesByCost as $warehouse) {
    //             if ($leftover <= 0) break;

    //             $alreadyAssigned = collect($distributed)
    //                 ->where('warehouse_id', $warehouse['id'])
    //                 ->sum('quantity');

    //             $available = $warehouse['remaining_capacity'] - $alreadyAssigned;

    //             if ($available > 0) {
    //                 $qtyToAssign = min($available, $leftover);
    //                 $distributed[] = [
    //                     'product_id' => $productId,
    //                     'warehouse_id' => $warehouse['id'],
    //                     'quantity' => $qtyToAssign,
    //                 ];
    //                 $leftover -= $qtyToAssign;
    //             }
    //         }
    //     }

    //     if ($leftover > 0) {
    //         return response()->json(['status' => false, 'message' => 'Not enough capacity in warehouses!']);
    //     }
    //     return $distributed;
    // }


}
