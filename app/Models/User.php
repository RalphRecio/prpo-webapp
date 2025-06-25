<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use Notifiable;


    protected $connection = 'ums_sqlsrv';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Format the created_at attribute.
     */
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Always eager load these relations
    protected $with = ['department', 'businessUnit','immediateHead'];

    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_id');
    }

    public function businessUnit()
    {
        return $this->belongsTo(BusinessUnit::class, 'bu_id');
    }

    public function immediateHead()
    {
        return $this->belongsTo(User::class, 'immediate_head_id');
    }
}
