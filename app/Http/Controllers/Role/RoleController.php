<?php

namespace App\Http\Controllers\Role;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1); 
        $search = $request->input('search', ''); 

        $roles = Role::query();

        if (!empty($search)) {
            $roles->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $roles = $roles
            ->with("permissions")
            ->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'page', $page);

        return Inertia::render('roles/role', [
            'roles' => [
                'data' => $roles->items(),
                'current_page' => $roles->currentPage(),
                'last_page' => $roles->lastPage(),
                'total' => $roles->total(),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $role = Role::create($validated);

        return response()->json([
            'message' => 'Role created successfully.',
            'role' => $role,
        ], 201);
    }

    public function update(Request $request)
    {
        $role = Role::findOrFail($request->id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ]);

        $role->update($validated);

        return response()->json([
            'message' => 'Role updated successfully.',
            'role' => $role,
        ]);
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return response()->json([
            'message' => 'Role deleted successfully.',
        ]);
    }

    public function deleteChecked(Request $request)
    {
        $ids = $request->input('data', []);

        if (is_array($ids) && count($ids) && is_array($ids[0])) {
            $ids = $ids[0];
        }

        Role::whereIn('id', $ids)->delete();

        return response()->json([
            'message' => 'Selected roles deleted successfully.',
        ]);
    }
}