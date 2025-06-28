<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PurchaseOrderDetails extends Model
{
    protected $table = 'purchase_order_details';
    protected $fillable = [
        'qty_ordered',
        'unit_of_measure',
        'unit_price',
        'extended_price',
        'description1',
        'description2',
        'po_id',
        'pr_id',
        'pr_details_id',
        'created_at',
        'updated_at'


    ];
}
