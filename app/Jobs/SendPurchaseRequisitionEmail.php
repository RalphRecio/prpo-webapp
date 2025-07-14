<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\PurchaseRequisitionNotificationService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SendPurchaseRequisitionEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $prNo, $approverName, $requestorName, $dateTime, $prId, $approverEmail;

    public function __construct($prNo, $approverName, $requestorName, $dateTime, $prId, $approverEmail)
    {
        $this->prNo = $prNo;
        $this->approverName = $approverName;
        $this->requestorName = $requestorName;
        $this->dateTime = $dateTime;
        $this->prId = $prId;
        $this->approverEmail = $approverEmail;
    }

    public function handle()
    {

        Log::info('[Job Started] SendPurchaseRequisitionEmail at ' . now());
           
        PurchaseRequisitionNotificationService::sendApprovalEmail(
            'Purchase Requisition',
            $this->prNo,
            $this->approverName,
            $this->requestorName,
            $this->dateTime,
            $this->prId,
            $this->approverEmail
        );
    }
}

