<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request){

        $page = $request->input('page', 1); 
        $search = $request->input('search', ''); 

        $users = User::query();

        if (!empty($search)) {
            $users->where('name', 'like', "%{$search}%")
            ->orWhere('email', 'like', "%{$search}%");
        }

        $users = $users->with(['role'])
            ->orderBy('created_at', 'desc')
            ->paginate(10, ['*'], 'page', $page);

        // Fetch all roles
        $roles = Role::all(['id', 'name']);

        return Inertia::render('users/user', [
            'users' => [
                'data' => $users->items(),
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'total' => $users->total(),
            ],
            'roles' => $roles,
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);
    
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role_id' => (integer) $validated['role_id'],
        ]);
    
        // Optionally, return the created user or a success message
        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user->load('role'),
        ], 201);
    }

    public function permissions(Request $request){
        $permissions = Permission::where('user_id', auth()->user()->id)
        ->pluck('page');

        return response()->json($permissions);
    }

    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'required|exists:roles,id',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->role_id = (integer) $validated['role_id'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $user->load('role'),
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully.',
        ]);
    }

    public function deleteChecked(Request $request){


        $ids = $request->input('data', []);

        if (is_array($ids) && count($ids) && is_array($ids[0])) {
            $ids = $ids[0];
        }

        User::whereIn('id', $ids)->delete();

        return response()->json([
            'message' => 'Selected users deleted successfully.',
        ]);

    }
}
