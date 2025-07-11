<?php
namespace App\Services;

use App\Mail\PoApproveEmail;
use App\Mail\DisapprovedEmail;
use Illuminate\Support\Facades\Mail;
use App\Models\ApproverList;
use App\Models\PoApproverList;


class PurchaseOrderNotificationService
{
    public static function sendApprovalEmail($poNo, $approverName, $submittedBy, $dateSubmitted, $poId, $recipient)
    {
         
        $data = [
            'po_no' => $poNo,
            'approver_name' => $approverName,
            'submitted_by' => $submittedBy,
            'date_submitted' => $dateSubmitted,
            'approver_link' => url('/prpo/purchase-order/view-pending-approval/' . $poId),
            'approver_history' =>  PoApproverList::where('po_id', $poId)
                ->with('approver')
                ->whereNot('is_approve',  0)
                ->orderBy('created_at', 'desc')
                ->get()
        ];

        $recipient = app()->environment('local') ? 'jrecio@suhay.com.ph' : $recipient;

        Mail::to($recipient)->send(new PoApproveEmail($data));
    }

    public static function senddisapprovedEmail($requestType, $poNo, $approverName, $submittedBy, $dateSubmitted, $prId, $recipient)
    {
         
        $data = [
            'po_no' => $poNo,
            'approver_name' => $approverName,
            'submitted_by' => $submittedBy,
            'date_submitted' => $dateSubmitted,
            'approver_link' => url('/prpo/purchase-order/view-pending-approval/' . $prId),
            'approver_history' =>  PoApproverList::where('pr_id', $prId)
                ->with('approver')
                ->whereNot('is_approve',  0)
                ->orderBy('created_at', 'desc')
                ->get()
        ];

        $recipient = app()->environment('local') ? 'jrecio@suhay.com.ph' : $recipient;

        Mail::to($recipient)->send(new DisapprovedEmail($data));
    }
}