<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Approver extends Model
{
    //

    public function approverList(){
        return $this->hasOne(ApproverList::class, 'user_id');
    }
}
