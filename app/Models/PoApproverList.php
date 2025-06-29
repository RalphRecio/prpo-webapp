<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PoApproverList extends Model
{
    protected $table = 'po_approver_list';
    protected $fillable = [
        'approver_id',
        'is_approve',
        'is_send_count',
        'po_id',
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

    public function getApprovalDateAttribute()
    {
        return $this->attributes['approval_date']
        ? Carbon::parse($this->attributes['approval_date'])->format('M d, Y h:i A')
        : '';
    }

    // Always sort by approver_level
    // protected static function booted()
    // {
    //     static::addGlobalScope('orderByApproverLevel', function ($query) {
    //         $query->orderBy('approver_level');
    //     });
    // }
}
