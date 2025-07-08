<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PurchaseOrderDetails;
use App\Models\PurchaseRequisiton;
use Illuminate\Support\Carbon;

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
        'prepared_by_id',
        'is_approve1',
        'is_approve2',
        'approver1_id',
        'approver2_id',
        'vendor_address',
        'vendor_contact_person',
        'vendor_email_address',
        'vendor_tel_no',
        'vendor_name',
        'ship_to',
        'ship_to_address'
    ];

    public function purchaseOrderDetails() {
        return $this->hasMany(PurchaseOrderDetails::class, 'po_id');
    }

    public function poApproversList() {
        return $this->hasMany(PoApproverList::class, 'po_id');
    }

    public function purchaseRequest() {
        return $this->belongsTo(PurchaseRequisiton::class, 'pr_id');
    }

    public function vendors() {
        return $this->belongsTo(Vendor::class, 'vendor_id');
    }

    public function preparedBy() {
        return $this->belongsTo(User::class, 'prepared_by_id');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('m/d/Y');
    }
}
