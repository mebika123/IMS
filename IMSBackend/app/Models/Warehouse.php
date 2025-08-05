<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Warehouse extends Model
{
    public function products(){
        return $this->belongsToMany(Product::class,'product_warehouses')->withPivot('quantity');
    }
}
