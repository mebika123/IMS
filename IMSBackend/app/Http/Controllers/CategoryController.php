<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(){
        $categories = Category::all();
        return response()->json([ 
            'status' => true,
        'categories' => $categories],200);
    }
    public function show($id){
        $category = Category::find($id);
        ;
        return response()->json([ 
            'status' => true,
        'category' => $category],200);
    }

    public function store(Request $request){
        $request->validate([
            'name'=>'required',
            'active' => 'required|boolean'
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->active =$request->active;
        $category->save();

        return response()->json([
            'status' => true,
            'message' => 'Category created successfully',
        ], 200);
    }
    public function update(Request $request, $id)
    {
        // Validate input
        $request->validate([
            'name' => 'required',
            'active' => 'required|boolean'
        ]);
    
        // Find the category by its ID
        $category = Category::find($id);
    
        // If category not found, return error message
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Category not found',
            ], 404);
        }
    
        // Update category details
        $category->name = $request->name;
        $category->active = $request->active;
        $category->save();
    
        // Return success message in JSON format
        return response()->json([
            'status' => true,
            'message' => 'Category updated successfully',
        ], 200);
    }
    
    public function delete($id)
    {
        $category = Category::find($id);
        $category->delete();

        return response()->json(['status' => true,'message' => "Category deleted successfully!"], 200);
    }
}
