<?php

namespace App\Http\Controllers;

use App\Models\ProductWarehouse;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class WareHouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::withSum('products as used_capacity', 'product_warehouses.quantity')->get();

        return response()->json([
            'status' => true,
            'warehouses' => $warehouses,
        ], 200);
    }

    public function show($id)
    {
        $warehouse = Warehouse::find($id);

        return response()->json([
            'status' => true,
            'warehouse' => $warehouse
        ], 200);
    }
    public function showProduct($id)
    {
        $warehouseProducts = ProductWarehouse::where('warehouse_id', $id)
            ->join('products', 'product_warehouses.product_id', '=', 'products.id')
            ->get();
        return response()->json([
            'status' => true,
            'warehouse' => $warehouseProducts
        ], 200);
    }
    public function removeProductFromWarehouse($warehouseId, $productId)
    {
        $warehouse = Warehouse::findOrFail($warehouseId);

        $warehouse->products()->detach($productId);

        return response()->json([
            'status' => true,
            'message' => 'Product removed from warehouse successfully.'
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'capacity' => 'required',
            'delivery_charge' => 'required'
        ]);

        $warehouse = new Warehouse();
        $warehouse->name = $request->name;
        $warehouse->address = $request->address;
        $warehouse->capacity = $request->capacity;
        $warehouse->delivery_charge = $request->delivery_charge;
        $warehouse->save();

        return response()->json([
            'status' => true,
            'message' => 'warehouse created successfully',
        ], 200);
    }
    public function update(Request $request, $id)
    {
        // Validate input
        $request->validate([
            'name' => 'required',
            'address' => 'required',
            'capacity' => 'required',
            'delivery_charge' => 'required'
        ]);

        // Find the warehouse by its ID
        $warehouse = Warehouse::find($id);

        // If warehouse not found, return error message
        if (!$warehouse) {
            return response()->json([
                'status' => false,
                'message' => 'warehouse not found',

            ], 404);
        }

        // Update warehouse details
        $warehouse->name = $request->name;
        $warehouse->address = $request->address;
        $warehouse->capacity = $request->capacity;
        $warehouse->delivery_charge = $request->delivery_charge;

        $warehouse->save();

        // Return success message in JSON format
        return response()->json([
            'status' => true,
            'message' => 'warehouse updated successfully',
        ], 200);
    }

    public function delete($id)
    {
        $warehouse = Warehouse::find($id);
        $warehouse->delete();

        return response()->json(['status' => true, 'message' => "warehouse deleted successfully!"], 200);
    }
}
