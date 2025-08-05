<?php

namespace App\Http\Controllers;

use App\Models\Party;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    public function index()
    {
        $vendors = Party::where('type','vendor')->get();
        return response()->json( ['vendors'=>$vendors]);
    }
public function show($id)
    {
        $vendor = Party::find($id);
        return response()->json(['vendor' => $vendor], 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:parties,email',
            'phone' => 'required|unique:parties,phone|digits:10',
            'address' => 'required',
            'pan_no'=>'required'
        ]);

        $vendor = new Party();
        $vendor->name = $request->name;
        $vendor->email = $request->email;
        $vendor->phone = $request->phone;
        $vendor->address = $request->address;
        $vendor->pan_no = $request->pan_no;
        $vendor->type = "vendor";
        $vendor->save();

        return response()->json(['message' => 'Vendor created successfully!', 'status' => true], 200);
    }
   
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:parties,email,'.$id,
            'phone' => 'required|digits:10|unique:parties,phone,'.$id,
            'address' => 'required',
        ]);
        
        $vendor = Party::find($id);
         $vendor->name = $request->name;
        $vendor->email = $request->email;
        $vendor->phone = $request->phone;
        $vendor->address = $request->address;
        $vendor->type = "vendor";
        $vendor->save();
        return response()->json(['message' => 'Vendor updated successfully!', 'status' => true], 200);
    }
    public function delete($id)
    {
        $vendor = Party::find($id);
        $vendor->delete();
        return response()->json(['message' => "Vendor deleted successfully!"], 200);
    }
}

