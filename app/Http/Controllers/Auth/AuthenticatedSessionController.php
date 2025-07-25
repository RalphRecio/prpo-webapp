<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Show the login page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {

        if (app()->environment('local')) {
            // Just find user by email (no password check)
            $user = \App\Models\User::where('email', $request->input('email'))->first();
    
            if (!$user) {
                return back()->withErrors(['email' => 'User not found.']);
            }
    
            Auth::login($user);
    
            $request->session()->regenerate();
    
            return redirect()->intended(route('purchase-request', absolute: false));
        }
        
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('purchase-request', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
