<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = [
        'user_id',
        'page',
        'can_access'
    ];

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
