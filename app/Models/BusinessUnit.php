<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BusinessUnit extends Model
{
    protected $connection = 'ums_sqlsrv';
    protected $table = 'business_units';

    public function buHead(){
        return $this->belongsTo(User::class, 'gm_id');
    }

}
