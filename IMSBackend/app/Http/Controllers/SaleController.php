<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\throwException;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Order::where('type', 'Sell')->with(['orderItems.product', 'party','orderItems.warehouse'])->get();
        foreach ($sales as $order) {
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
            'sales' => $sales
        ], 200);
    }

    public function create() {}

    public function store(Request $request)
    {
        $request->validate([
            'party_id' => 'required|exists:parties,id',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required'
        ]);

        DB::beginTransaction();

        try {

            $order = new Order();
            $order->type = $request->type === 'saleOrder' ? 'Sell' : 'Purchase';
            $order->party_id = $request->party_id;
            $order->save();
            foreach ($request->items as $item) {

                $product = Product::with('warehouses')->findOrFail($item['product_id']);
                $warehouses = $product->warehouses->sortBy('delivery_charge');
                $remaining = $item['quantity'];


                foreach ($warehouses as $warehouse) {
                    if ($remaining <= 0) break;

                    $orderitem = new OrderItem();
                    $availableQty = $warehouse->pivot->quantity;
                    $qty = min($availableQty, $remaining);
                    $product->warehouses()->updateExistingPivot($warehouse->id, [
                        'quantity' => DB::raw('quantity - ' . $qty)
                    ]);
                    $remaining -= $qty;

                    $orderitem->quantity = $qty;
                    $orderitem->order_id = $order->id;
                    $orderitem->product_id = $item['product_id'];
                    $orderitem->warehouse_id = $warehouse->id;
                    $orderitem->price = $item['price'];
                    $orderitem->save();
                }
                if ($remaining > 0) {
                    throw new Exception("Insufficient Stock");
                }
            }
            DB::commit();
            return response()->json(['status' => true, 'message' => "Order request has been created successfully!"], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }
    public function edit(Request $request, $id)
    {
        $request->validate([
            'party_id' => 'required|exists:parties,id',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required'
        ]);

        DB::beginTransaction();

        try {

            $order = Order::find($id);
            $order->type = $request->type === 'saleOrder' ? 'Sell' : 'Purchase';
            $order->party_id = $request->party_id;
            $order->save();

            $order->items->delete();
            foreach ($request->items as $item) {
                $orderitem = new OrderItem();
                $orderitem->product_id = $item['product_id'];
                $orderitem->quantity = $item['quantity'];
                $orderitem->price = $item['price'];
                $orderitem->order_id = $order->id;
                $orderitem->save();
            }
            DB::commit();
            return response()->json(['status' => true, 'message' => "Order request has been created successfully!"], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
