<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $hidden = ['pivot'];

    protected $fillable = [
        'chat_id', 'user_id', 'text', 'reply_message_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
