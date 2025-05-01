<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        $product = Product::all();
        return response()->json([ 
            'status' => true,
        'product' => $product],200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:100|unique:products,code', 
            'description' => 'required|string|max:1000',
            'stock' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'category' => 'required|exists:categories,id',
        ]);
    
        $product = new Product();
        $product->name = $request->name;
        $product->code = $request->code;
        $product->description = $request->description;
    
        $product->sku = strtolower(preg_replace('/\s+/', '_', trim($request->name)));
    
        $product->stock = $request->stock;
        $product->min_stock_level = $request->min_stock_level;
        $product->unit = $request->unit;
        $product->price = $request->price;
        $product->category_id = $request->category;
        $product->save();
    
        return response()->json(['status' => true, 'message' => "Product created successfully!"], 200);
    }
    public function update(Request $request,$id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:100|unique:products,code', 
            'description' => 'required|string|max:1000',
            'stock' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'category' => 'required|exists:categories,id',
        ]);
    
        $product = Product::find($id);
        $product->name = $request->name;
        $product->code = $request->code;
        $product->description = $request->description;
    
        $product->sku = strtolower(preg_replace('/\s+/', '_', trim($request->name)));
    
        $product->stock = $request->stock;
        $product->min_stock_level = $request->min_stock_level;
        $product->unit = $request->unit;
        $product->price = $request->price;
        $product->category_id = $request->category;
        $product->save();
    
        return response()->json(['status' => true, 'message' => "Product created successfully!"], 200);
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
