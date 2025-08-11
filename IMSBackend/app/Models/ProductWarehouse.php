<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductWarehouse extends Model
{
    protected $fillable = [
        'warehouse_id',
        'quantity',
        'product_id'
    ];
}
