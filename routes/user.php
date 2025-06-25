<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;

Route::middleware('auth')->prefix('user')->group(function () {
    Route::get('permissions', [UserController::class, 'permissions']);

    Route::get('user_list', [UserController::class, 'index']);
    Route::post('user_list', [UserController::class, 'store']);
    Route::delete('user_list/{id}', [UserController::class, 'destroy']);
    Route::post('user_list/delete-checked', [UserController::class, 'deleteChecked']);
    Route::put('user_list', [UserController::class, 'update']);

});