<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Models\PurchaseRequisiton;

trait PurchaseRequisitionQuery
{
    private function buildPurchaseRequisitionQuery(Request $request)
    {
        $search = $request->input('search', '');

        $pr = PurchaseRequisiton::query();

        // Search filter
        if (!empty($search)) {
            $columns = [
                'pr_no', 'requestor_id', 'date_issue', 'date_needed', 'bu_id',
                'department_id', 'prod_end_user', 'classification_id', 'remarks',
                'is_it_related', 'is_approve_it_manager', 'is_approve_im_supervisor', 'status'
            ];
            $pr->where(function($query) use ($search, $columns) {
                foreach ($columns as $col) {
                    $query->orWhere($col, 'like', '%' . $search . '%');
                }
            });
        }

        // Additional filters
        $filters = [
            'Barcode' => 'product.barcode',
            'Lot_Code' => 'lot_code',
            'Product_Code' => 'product.item_code',
        ];

        foreach ($filters as $requestKey => $dbColumn) {
            $value = $request->input($requestKey);
            if (!empty($value)) {
                if (str_contains($dbColumn, '.')) {
                    [$relation, $column] = explode('.', $dbColumn, 2);
                    $pr->whereHas($relation, function ($query) use ($column, $value) {
                        $query->where($column, 'like', "%{$value}%");
                    });
                } else {
                    $pr->where($dbColumn, 'like', "%{$value}%");
                }
            }
        }

        return $pr->select(
                'id',
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
                'status')

            ->with(['requestor', 'bu', 'department', 'classification','approversList']);
    }
}