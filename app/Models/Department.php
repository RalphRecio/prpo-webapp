<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    protected $connection = 'ums_sqlsrv';
    protected $table = 'departments';
}
