<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = [
        'title', 'image', 'last_message_time',
    ];

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_chats');
    }
}
