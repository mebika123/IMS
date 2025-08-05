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

        $products = Product::with(['category','warehouses'])->get();
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
            'warehouses' => 'required|array',
            'warehouse.*.warehouse_id' => "required|exists:warehouses,id",
            'warehouse.*.quantity' => 'required|integer|min:1',
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
           
            foreach ($request->warehouses as $item) {
                $warehouseProduct  = new ProductWarehouse();
                $warehouseProduct->warehouse_id = $item['warehouse_id'];
                $warehouseProduct->quantity = $item['quantity'];
                $warehouseProduct->product_id = $product->id;
                $warehouseProduct->save();
            }
            DB::commit();
            return response()->json(['status' => true, 'message' => "Product created successfully!"], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['status' => false, 'message' => $e->getMessage()], 500);
        }
    }
    public function update(Request $request, $id)
    {
         $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'warehouses' => 'required|array',
            'warehouse.*.warehouse_id' => "required|exists:warehouses,id",
            'warehouse.*.quantity' => 'required|integer|min:1',
            'unit' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);
        DB::beginTransaction();
        try {

            $lastProduct = Product::latest('id')->first();
            $lastId = $lastProduct ? $lastProduct->id + 1 : 1;

            $code = 'PROD' . now()->format('Y') . '_' . str_pad($lastId, 3, '0', STR_PAD_LEFT);

             $product = Product::find($id);
            $product->name = $request->name;
            $product->code = $code;
            $product->description = $request->description;

            $product->sku = strtolower(preg_replace('/\s+/', '_', trim($request->name)));

            
            $product->unit = $request->unit;
            $product->price = $request->price;
            $product->category_id = $request->category_id;
            $product->save();
           
            foreach ($request->warehouses as $item) {
                $warehouseProduct  = new ProductWarehouse();
                $warehouseProduct->warehouse_id = $item['warehouse_id'];
                $warehouseProduct->quantity = $item['quantity'];
                $warehouseProduct->product_id = $product->id;
                $warehouseProduct->save();
            }
            DB::commit();
            return response()->json(['status' => true, 'message' => "Product created successfully!"], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['status' => false, 'message' => $e->getMessage()], 500);
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
