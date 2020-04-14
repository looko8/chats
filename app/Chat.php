<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $hidden = ['pivot'];

    protected $fillable = [
        'title', 'image', 'last_message_time',
    ];

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_chats');
    }

    public function newMessages()
    {

    }

    public function lastMessage()
    {
        return $this->hasOne('App\Message')->latest();
    }
}
