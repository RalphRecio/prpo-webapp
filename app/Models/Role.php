<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Role extends Model
{
  
    protected $fillable = ["name","slug"];

    public function permissions()
    {
        return $this->hasMany(Permission::class, 'role_id');
    }


    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }
}
