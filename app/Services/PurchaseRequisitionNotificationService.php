<?php
namespace App\Services;

use App\Mail\ApproveEmail;
use App\Mail\ApprovedEmail;
use App\Mail\DisapprovedEmail;
use App\Mail\ReviewerEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\ApproverList;

class PurchaseRequisitionNotificationService
{
    public static function sendApprovalEmail($requestType, $prNo, $approverName, $submittedBy, $dateSubmitted, $prId, $recipient)
    {
        $approverList = ApproverList::where('pr_id', $prId)
        ->with(['approver','purchaseRequest'])
        ->whereNot('is_approve',  0)
        ->orderBy('created_at', 'desc')
        ->get();

        $data = [
            'request_type' => $requestType,
            'pr_no' => $prNo,
            'approver_name' => $approverName,
            'submitted_by' => $submittedBy,
            'date_submitted' => $dateSubmitted,
            'approver_link' => url('/prpo/purchase-request/details/' . $prId),
            'approver_history' => $approverList
        ];

        Mail::to($approverList->first()->purchaseRequest->requestor->email)->send(new ApprovedEmail($data));
        Mail::to($recipient)->send(new ApproveEmail($data));
    }


    public static function sendReviewerEmail($requestType, $prNo, $approverName, $submittedBy, $dateSubmitted, $prId, $recipient)
    {

        $approverList = ApproverList::where('pr_id', $prId)
                ->with(['approver','approver2','purchaseRequest'])
                ->whereNot('is_approve',  0)
                ->orderBy('created_at', 'desc')
                ->get();
         
        $data = [
            'request_type' => $requestType,
            'pr_no' => $prNo,
            'approver_name' => $approverName,
            'submitted_by' => $submittedBy,
            'date_submitted' => $dateSubmitted,
            'approver_link' => url('/prpo/purchase-request/details/' . $prId),
            'approver_history' => $approverList,

            'creator_name' => $approverList->first()->purchaseRequest->requestor->fname . ' ' . $approverList->first()->purchaseRequest->requestor->lname
        ];

        Mail::to($approverList->first()->purchaseRequest->requestor->email)->send(new ApprovedEmail($data));
        Mail::to($recipient)->send(new ReviewerEmail($data));
    }

    public static function sendDisapprovedEmail($requestType, $prNo, $approverName, $requestorName, $dateSubmitted, $prId, $recipient)
    {
        $approverList = ApproverList::where('pr_id', $prId)
        ->with(['approver','approver2','purchaseRequest'])
        ->whereNot('is_approve',  0)
        ->orderBy('created_at', 'desc')
        ->get();

        $data = [
            'request_type' => $requestType,
            'pr_no' => $prNo,
            'approver_name' => $approverName,
            'requestor_name' => $requestorName,
            'date_submitted' => $dateSubmitted,
            'view_link' => url('/prpo/purchase-request/details/' . $prId),
            'approver_history' =>  $approverList
        ];

        Mail::to($recipient)->send(new DisapprovedEmail($data));
    }
}