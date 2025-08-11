<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\ProductWarehouse;
use App\Models\Warehouse;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function index()
    {
        $totalProduct = Product::count();

        // Total stock value
        $totalStockValue = DB::table('product_warehouses')
            ->join('products', 'product_warehouses.product_id', '=', 'products.id')
            ->selectRaw('products.id, products.price, SUM(product_warehouses.quantity) as total_quantity')
            ->groupBy('products.id', 'products.price')
            ->get()
            ->reduce(function ($carry, $item) {
                return $carry + ($item->price * $item->total_quantity);
            }, 0);

        // Total sale amount
        $sales = Order::where('type', 'Sell')
            ->with(['orderItems.product', 'party', 'orderItems.warehouse'])
            ->get();
        $totalSaleValue = 0;
        foreach ($sales as $order) {
            foreach ($order->orderItems as $item) {
                $totalSaleValue += $item->price * $item->quantity;
            }
        }

        // Total purchase amount
        $purchases = Order::where('type', 'Purchase')
            ->with(['orderItems.product', 'party', 'orderItems.warehouse'])
            ->get();
        $totalPurchaseValue = 0;
        foreach ($purchases as $order) {
            foreach ($order->orderItems as $item) {
                $totalPurchaseValue += $item->price * $item->quantity;
            }
        }

        // Recent 7 sell orders
        $recentSales = Order::where('type', 'Sell')
            ->latest()
            ->take(8)
            ->with(['orderItems.product', 'party'])
            ->get();

        // Warehouse capacity
        $totalCapacity = Warehouse::sum('capacity');
        $usedCapacity = ProductWarehouse::sum('quantity');

        // Products with minimum stock in warehouse
        $productsWithMinQty = DB::table('product_warehouses')
            ->join('products', 'product_warehouses.product_id', '=', 'products.id')
            ->join('warehouses', 'product_warehouses.warehouse_id', '=', 'warehouses.id')
            ->select(
                'product_warehouses.warehouse_id',
                'product_warehouses.product_id',
                DB::raw('MIN(product_warehouses.quantity) as min_quantity'),
                'products.name as product_name',
                'warehouses.name as warehouse_name'
            )
            ->groupBy('product_warehouses.warehouse_id', 'product_warehouses.product_id', 'products.name', 'warehouses.name')
            ->having('min_quantity', '<', 25)   // <-- filter here
            ->orderBy('min_quantity', 'asc')
            ->limit(7)
            ->get();


        // Warehouses with low delivery charge
        $lowestDeliveryChargeWarehouse = Warehouse::orderBy('delivery_charge', 'asc')->first();


        $dashboardData = [
            'totalProduct'          => $totalProduct,
            'totalStockValue'       => $totalStockValue,
            'totalSale'             => $totalSaleValue,
            'totalPurchase'         => $totalPurchaseValue,
            'recentSellOrders'      => $recentSales,
            'totalCapacity'         => $totalCapacity,
            'usedCapacity'          => $usedCapacity,
            'productsLowStock'      => $productsWithMinQty,
            'warehousesLowDelivery' => $lowestDeliveryChargeWarehouse,
        ];

        return response()->json([
            'status' => true,
            'dashboardData' => $dashboardData
        ]);
    }
}
