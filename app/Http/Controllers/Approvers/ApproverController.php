<?php

namespace App\Http\Controllers\Approvers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Approver;

class ApproverController extends Controller
{
    public function index($bu_id)
    {
        $approvers = Approver::where(function($query) use ($bu_id) {
            $query->where('bu_id', $bu_id)
                ->orWhere('approver_type', 'immsupervisor')
                ->orWhere('approver_type', 'itmanager');
        })
        ->orderBy('approver_level')
        ->where('approver_status', 'active')
        ->whereNot('approver_type','comptroller')
        ->get();
        return response()->json($approvers);
    }

    public function show($id)
    {
        // Code to show a specific approver
    }

    public function create()
    {
        // Code to show a form for creating a new approver
    }

    public function store(Request $request)
    {
        // Code to store a new approver
    }

    public function edit($id)
    {
        // Code to show a form for editing an existing approver
    }

    public function update(Request $request, $id)
    {
        // Code to update an existing approver
    }

    public function destroy($id)
    {
        // Code to delete an existing approver
    }
}
