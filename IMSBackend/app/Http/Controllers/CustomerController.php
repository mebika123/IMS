<?php

namespace App\Http\Controllers;

use App\Models\Party;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
        public function index()
    {
        $customers = Party::where('type','customer')->get();
        return response()->json( $customers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|unique:users,phone|digits:10',
            'address' => 'required',
        ]);

        $customer = new Party();
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->address = $request->address;
        $customer->type = "customer";
        $customer->save();

        return response()->json(['message' => 'Customer created successfully!', 'status' => true], 200);
    }
   
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:parties,email,'.$id,
            'phone' => 'required|digits:10|unique:parties,phone,'.$id,
            'address' => 'required',
        ]);
        
        $customer = Party::find($id);
         $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->address = $request->address;
        $customer->type = "customer";
        $customer->save();
        return response()->json(['message' => 'Customer updated successfully!', 'status' => true], 200);
    }
    public function delete($id)
    {
        $customer = Party::find($id);
        $customer->delete();
        return response()->json(['message' => "Customer deleted successfully!"], 200);
    }

    public function show($id)
    {
        $customer = Party::find($id);
        return response()->json(['customer' => $customer], 200);
    }
}
