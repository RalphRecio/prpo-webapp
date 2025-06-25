<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApproverList extends Model
{
    protected $table = 'pr_approver_list';
    protected $fillable = [
        'approver_id',
        'is_approve',
        'is_send_count',
        'pr_id',
        'approve_date',
        'remarks',
        'approver_level',
        'created_at',
        'updated_at'
    ];

    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id', 'id');
    }

    // Always sort by approver_level
    // protected static function booted()
    // {
    //     static::addGlobalScope('orderByApproverLevel', function ($query) {
    //         $query->orderBy('approver_level');
    //     });
    // }
}
