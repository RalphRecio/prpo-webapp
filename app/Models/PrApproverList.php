<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrApproverList extends Model
{
    protected $table = 'pr_approver_list';

    protected $fillable = [
        'pr_id',
        'approver_id',
        'is_approve',
        'is_send_count',
        'approver_level',
        'remarks',
        'created_at',
        'updated_at'
    ];

    public function purchaseRequisition()
    {
        return $this->belongsTo(PurchaseRequisiton::class, 'pr_id');
    }

    public function approver()
    {
        return $this->belongsTo(Approver::class, 'approver_id');
    }
}
