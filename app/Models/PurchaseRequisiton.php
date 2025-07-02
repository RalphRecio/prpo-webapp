<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\PurchaseRequisitionItem;
use Illuminate\Support\Carbon;

class PurchaseRequisiton extends Model
{
    protected $table = 'purchase_requisition';
    protected $fillable = [
        'pr_no',
        'requestor_id',
        'date_issue',
        'date_needed',
        'bu_id',
        'department_id',
        'prod_end_user',
        'classification_id',
        'remarks',
        'is_it_related',
        'is_approve_it_manager',
        'is_approve_im_supervisor',
        'im_supervisor_id',
        'status',
        'budgeted',
        'budgeted_amount',
        'isCapexOpex',
        'is_finance_verified',
        'finance_remarks',
        'supplier_name',
        'acual_amount',
        'procurement_remarks',
        'is_procurement_verified'

    ];

    protected $dates = ['date_issue', 'date_needed'];


    public function purchaseRequisitionItems()
    {
        return $this->hasMany(PurchaseRequisitionDetails::class,'pr_id');
    }

    public function requestor()
    {
        return $this->belongsTo(User::class, 'requestor_id');
    }

    public function bu()
    {
        return $this->belongsTo(BusinessUnit::class, 'bu_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    public function classification()
    {
        return $this->belongsTo(Classification::class, 'classification_id');
    }


    public function immediateHead()
    {
        return $this->belongsTo(User::class, 'im_supervisor_id');
    }

    public function getDateIssueAttribute($value)
    {
        return Carbon::parse($value)->format('m/d/Y');
    }

    public function getDateNeededAttribute($value)
    {
        return Carbon::parse($value)->format('m/d/Y');
    }

    public function approversList()
    {
        return $this->hasMany(ApproverList::class, 'pr_id');
    }



    
}




