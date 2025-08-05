<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|unique:users,phone|digits:10',
            'address' => 'required',
            'password' => 'required|confirmed|min:8',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'User created successfully!', 'status' => true], 200);
    }
    public function show($id)
    {
        $user = User::find($id);
        return response()->json(['user' => $user], 200);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'phone' => 'required|digits:10|unique:users,phone,'.$id,
            'address' => 'required',
        ]);
        
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->save();
        return response()->json(['message' => 'User updated successfully!', 'status' => true], 200);
    }
    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json(['message' => "User deleted successfully!"], 200);
    }
}
