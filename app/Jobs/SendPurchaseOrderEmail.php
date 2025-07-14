<?php

namespace App\Jobs;

use App\Services\PurchaseOrderNotificationService;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendPurchaseOrderEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $poNo;
    protected $approverName;
    protected $requestorName;
    protected $timestamp;
    protected $poId;
    protected $approverEmail;

    public function __construct($poNo, $approverName, $requestorName, $timestamp, $poId, $approverEmail)
    {
        $this->poNo = $poNo;
        $this->approverName = $approverName;
        $this->requestorName = $requestorName;
        $this->timestamp = $timestamp;
        $this->poId = $poId;
        $this->approverEmail = $approverEmail;
    }

    public function handle()
    {
        PurchaseOrderNotificationService::sendApprovalEmail(
            $this->poNo,
            $this->approverName,
            $this->requestorName,
            $this->timestamp,
            $this->poId,
            $this->approverEmail
        );
    }
}
