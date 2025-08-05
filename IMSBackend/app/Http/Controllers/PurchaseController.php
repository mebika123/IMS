<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

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
            'items.*.price' => 'required'
        ]);

        $order = new Order();
        $order->type = $request->type === 'saleOrder' ? 'Sell' : 'Purchase';
        $order->party_id = $request->party_id;
        $order->save();
        

        foreach ($request->items as $item) {
            $orderitem = new OrderItem();
            $orderitem->order_id = $order->id;
            $orderitem->product_id = $item['product_id'];
            $orderitem->quantity = $item['quantity'];
            $orderitem->save();
        }

        return response()->json(['status' => true, 'message' => "Order request has been created successfully!"], 200);
    }
    public function edit(Request $request)
    {
        $request->validate([
            'party_id' => 'required|exists:parties,id',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            // 'items.*.price' => 'required'
        ]);

        $order = new Order();
        $order->type = 'Purchase';
        $order->party_id = $request->party_id;
        $order->save();

        foreach ($request->items as $item) {
            $orderitem = new OrderItem();
            $orderitem->product_id = $request->product_id;
            $orderitem->product_id = $item['product_id'];
            $orderitem->quantity = $item['quantity'];
            $orderitem->save();
        }

        return response()->json(['status' => true, 'message' => "Order request has been created successfully!"], 200);
    }
}
