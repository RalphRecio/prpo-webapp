<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ApproverList extends Model
{
    protected $table = 'pr_approver_list';
    protected $fillable = [
        'approver_id',
        'is_approve',
        'is_send_count',
        'pr_id',
        'approval_date',
        'remarks',
        'approver_level',
        'created_at',
        'updated_at'
    ];

    // protected $appends = ['approve_date_formatted'];

    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id', 'id');
    }

    public function approver2()
    {
        return $this->belongsTo(Approver::class, 'approver_id', 'user_id');
    }

    public function getApprovalDateAttribute()
    {
        return $this->attributes['approval_date']
        ? Carbon::parse($this->attributes['approval_date'])->format('M d, Y h:i A')
        : '';
    }

    public function purchaseRequest(){
        return $this->belongsTo(PurchaseRequisiton::class, 'pr_id', 'id');
    }

    // protected static function booted()
    // {
    //     static::addGlobalScope('orderByApproverLevel', function ($query) {
    //         $query->orderBy('approver_level');
    //     });
    // }
}
