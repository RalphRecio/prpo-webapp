<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PurchaseRequisition;

class PurchaseRequisitionDetails extends Model
{
    protected $table = 'purchase_req_details';
    protected $fillable = [
        'pr_id',
        'qty_in_figures',
        'uom',
        'description',
        'status',
    ];

    public function purchaseRequisition()
    {
        return $this->belongsTo(PurchaseRequisiton::class, 'pr_id');
    }
}
