<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\WareHouseController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware(['auth:sanctum', AdminMiddleware::class])->group(function () {
    // Route::get('/products', [ProductController::class, 'index']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::post('/user/store', [UserController::class, 'store']);
    Route::put('/user/update/{id}', [UserController::class, 'update']);
    Route::delete('/user/delete/{id}', [UserController::class, 'delete']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/product/store', [ProductController::class, 'store']);
    Route::get('/product/{id}', [ProductController::class, 'show']);
    Route::put('/product/update/{id}', [ProductController::class, 'update']);
    Route::delete('/product/delete/{id}', [ProductController::class, 'delete']);

    // Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/category/{id}', [CategoryController::class, 'show']);
    Route::post('/category/store', [CategoryController::class, 'store']);
    Route::put('/category/update/{id}', [CategoryController::class, 'update']);
    Route::delete('/category/delete/{id}', [CategoryController::class, 'delete']);

    Route::get('/warehouses', [WareHouseController::class, 'index']);
    Route::get('/warehouse/{id}', [WareHouseController::class, 'show']);
    Route::get('/warehouseProduct/{id}', [WareHouseController::class, 'showProduct']);
    Route::delete('/warehouse/{warehouseId}/product/{productId}', [WarehouseController::class, 'removeProductFromWarehouse']);
    Route::post('/warehouse/store', [WareHouseController::class, 'store']);
    Route::put('/warehouse/update/{id}', [WareHouseController::class, 'update']);
    Route::delete('/warehouse/delete/{id}', [WareHouseController::class, 'delete']);


    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/dashboard', [DashboardController::class, 'index']);


    Route::get('/customers', [CustomerController::class, 'index']);
    Route::get('/vendors', [VendorController::class, 'index']);

    Route::get('/purchases', [PurchaseController::class, 'index']);
    Route::post('/distribute', [PurchaseController::class, 'recommendPurchaseAllocation']);
    Route::post('/purchaseRequest', [PurchaseController::class, 'store']);
    Route::put('/purchaseOrders/{id}/status/{status}', [PurchaseController::class, 'updateStatus']);

    Route::get('/sales', [SaleController::class, 'index']);
    Route::post('/saleRequest', [SaleController::class, 'store']);
    Route::put('/saleOrders/{id}/status/{status}', [SaleController::class, 'updateStatus']);


    Route::get('/vendor/{id}', [VendorController::class, 'show']);
    Route::post('/vendor/store', [VendorController::class, 'store']);
    Route::put('/vendor/update/{id}', [VendorController::class, 'update']);
    Route::delete('/vendor/delete/{id}', [VendorController::class, 'delete']);

    Route::get('/customer/{id}', [CustomerController::class, 'show']);
    Route::post('/customer/store', [CustomerController::class, 'store']);
    Route::put('/customer/update/{id}', [CustomerController::class, 'update']);
    Route::delete('/customer/delete/{id}', [CustomerController::class, 'delete']);

    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
