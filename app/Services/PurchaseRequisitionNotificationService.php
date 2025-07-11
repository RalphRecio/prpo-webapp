<?php
namespace App\Services;

use App\Mail\ApproveEmail;
use App\Mail\DisapprovedEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\ApproverList;

class PurchaseRequisitionNotificationService
{
    public static function sendApprovalEmail($requestType, $prNo, $approverName, $submittedBy, $dateSubmitted, $prId, $recipient)
    {
         
        $data = [
            'request_type' => $requestType,
            'pr_no' => $prNo,
            'approver_name' => $approverName,
            'submitted_by' => $submittedBy,
            'date_submitted' => $dateSubmitted,
            'approver_link' => url('/prpo/purchase-request/details/' . $prId),
            'approver_history' =>  ApproverList::where('pr_id', $prId)
                ->with('approver')
                ->whereNot('is_approve',  0)
                ->orderBy('created_at', 'desc')
                ->get()
        ];

        Mail::to($recipient)->send(new ApproveEmail($data));
    }

    public static function sendDisapprovedEmail($requestType, $prNo, $approverName, $requestorName, $dateSubmitted, $prId, $recipient)
    {
         
        $data = [
            'request_type' => $requestType,
            'pr_no' => $prNo,
            'approver_name' => $approverName,
            'requestor_name' => $requestorName,
            'date_submitted' => $dateSubmitted,
            'view_link' => url('/prpo/purchase-request/details/' . $prId),
            'approver_history' =>  ApproverList::where('pr_id', $prId)
                ->with('approver')
                ->whereNot('is_approve',  0)
                ->orderBy('created_at', 'desc')
                ->get()
        ];

        Mail::to($recipient)->send(new DisapprovedEmail($data));
    }
}