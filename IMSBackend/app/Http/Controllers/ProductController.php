<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductWarehouse;
use App\Models\Warehouse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    public function index(Request $request)
    {
        $categories = $request->query('categories');

        $products = Product::with(['category', 'warehouses'])->get();
        return response()->json([
            'status' => true,
            'products' => $products
        ], 200);
    }
    public function show($id)
    {
        $product = Product::with('warehouses')->find($id);
        return response()->json([
            'status' => true,
            'product' => $product
        ], 200);
    }

   public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:1000',
        'warehouses' => 'nullable|array',
        'warehouses.*.warehouse_id' => 'sometimes|required|exists:warehouses,id',
        'warehouses.*.quantity' => 'sometimes|required|integer|min:1',
        'unit' => 'required|string|max:50',
        'price' => 'required|numeric|min:0',
        'category_id' => 'required|exists:categories,id',
    ]);

    DB::beginTransaction();
    try {
        $lastProduct = Product::latest('id')->first();
        $lastId = $lastProduct ? $lastProduct->id + 1 : 1;

        $code = 'PROD' . now()->format('Y') . '_' . str_pad($lastId, 3, '0', STR_PAD_LEFT);

        $product = new Product();
        $product->name = $request->name;
        $product->code = $code;
        $product->description = $request->description;
        $product->sku = strtolower(preg_replace('/\s+/', '_', trim($request->name)));
        $product->unit = $request->unit;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->save();

        if (!empty($request->warehouses)) {
            foreach ($request->warehouses as $item) {
                $warehouse = Warehouse::findOrFail($item['warehouse_id']);

                // Calculate current used capacity in this warehouse
                $currentUsedCapacity = ProductWarehouse::where('warehouse_id', $warehouse->id)
                    ->sum('quantity');

                $availableCapacity = $warehouse->capacity - $currentUsedCapacity;

                if ($item['quantity'] > $availableCapacity) {
                    throw new \Exception(
                        "Assigned quantity ({$item['quantity']}) exceeds available capacity ({$availableCapacity}) in warehouse '{$warehouse->name}'."
                    );
                }

                $warehouseProduct = new ProductWarehouse();
                $warehouseProduct->warehouse_id = $item['warehouse_id'];
                $warehouseProduct->quantity = $item['quantity'];
                $warehouseProduct->product_id = $product->id;
                $warehouseProduct->save();
            }
        }

        DB::commit();
        return response()->json(['status' => true, 'message' => "Product created successfully!"], 200);

    } catch (Exception $e) {
        DB::rollBack();
        return response()->json(['status' => false, 'message' => $e->getMessage()], 422);
    }
}

  public function update(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string|max:1000',
        'warehouses' => 'nullable|array',
        'warehouses.*.warehouse_id' => 'sometimes|required|exists:warehouses,id',
        'warehouses.*.quantity' => 'sometimes|required|integer|min:1',
        'unit' => 'required|string|max:50',
        'price' => 'required|numeric|min:0',
        'category_id' => 'required|exists:categories,id',
    ]);

    DB::beginTransaction();
    try {
        $product = Product::findOrFail($id);

        $product->name = $request->name;
        $product->description = $request->description;
        $product->sku = strtolower(preg_replace('/\s+/', '_', trim($request->name)));
        $product->unit = $request->unit;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->save();

        if (!empty($request->warehouses)) {
            foreach ($request->warehouses as $item) {
                $warehouse = Warehouse::findOrFail($item['warehouse_id']);

                $currentUsedCapacity = ProductWarehouse::where('warehouse_id', $warehouse->id)
                    ->where('product_id', '!=', $product->id)
                    ->sum('quantity');

                $availableCapacity = $warehouse->capacity - $currentUsedCapacity;

                if ($item['quantity'] > $availableCapacity) {
                    throw new \Exception(
                        "Assigned quantity ({$item['quantity']}) exceeds available capacity ({$availableCapacity}) in warehouse '{$warehouse->name}'."
                    );
                }

                $warehouseProduct = ProductWarehouse::where('product_id', $product->id)
                    ->where('warehouse_id', $item['warehouse_id'])
                    ->first();

                if ($warehouseProduct) {
                    $warehouseProduct->quantity = $item['quantity'];
                    $warehouseProduct->save();
                } else {
                    ProductWarehouse::create([
                        'warehouse_id' => $item['warehouse_id'],
                        'quantity' => $item['quantity'],
                        'product_id' => $product->id
                    ]);
                }
            }

            // Remove warehouse assignments not in request 
            $warehouseIds = collect($request->warehouses)->pluck('warehouse_id')->toArray();

            ProductWarehouse::where('product_id', $product->id)
                ->whereNotIn('warehouse_id', $warehouseIds)
                ->delete();

        } else {
            // If no warehouses provided, remove all existing assignments
            ProductWarehouse::where('product_id', $product->id)->delete();
        }

        DB::commit();

        return response()->json(['status' => true, 'message' => "Product updated successfully!"], 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['status' => false, 'message' => $e->getMessage()], 422);
    }
}




    public function delete($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['status' => false, 'message' => 'Product not found!'], 404);
        }

        $product->delete();

        return response()->json(['status' => true, 'message' => 'Product deleted successfully!'], 200);
    }
}
