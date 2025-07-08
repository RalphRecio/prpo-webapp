<?php

namespace App\Traits;

use App\Models\PurchaseOrder;
use Illuminate\Http\Request;

trait PurchaseOrderQuery
{
    private function buildPurchaseOrderQuery(Request $request)
    {
        $search = $request->input('search', '');

        $po = PurchaseOrder::query();

        // Search filter
        if (!empty($search)) {
            $columns = [
                'pr_no', 'requestor_id', 'date_issue', 'date_needed', 'bu_id',
                'department_id', 'prod_end_user', 'classification_id', 'remarks',
                'is_it_related', 'is_approve_it_manager', 'is_approve_im_supervisor', 'status'
            ];
            $po->where(function($query) use ($search, $columns) {
                foreach ($columns as $col) {
                    $query->orWhere($col, 'like', '%' . $search . '%');
                }
            });
        }
        
        return $po->with(['purchaseRequest','vendors','preparedBy']);
    }
}
