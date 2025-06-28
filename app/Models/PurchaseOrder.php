<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PurchaseOrderDetails;

class PurchaseOrder extends Model
{
    protected $table = 'purchase_order';

    protected $fillable = [
        'po_no',
        'vendor_id',
        'ship_via',
        'terms',
        'status',
        'buyer',
        'confirming_to',
        'pr_id',
        'freight',
        'remarks',
        'department_id',
        'prepared_by',
        'is_approve1',
        'is_approve2',
        'approver1_id',
        'approver2_id',
        'vendor_contact_person',
        'vendor_email_address',
        'vendor_tel_no',
        'vendor_name'
    ];

    public function purchaseOrderDetails() {
        return $this->hasMany(PurchaseOrderDetails::class, 'po_id');
    }
}
