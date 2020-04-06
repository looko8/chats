<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Message;
use App\Http\Resources\Message as MessageResource;
use App\Events\Message as MessageEvent;


class MessageController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id)
    {
        $messages = Message::where('chat_id', $id)->paginate(10);
        return $this->sendResponse($messages, "messages for chat with id = {$id}");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $message = Message::create([
            'chat_id' => $request->chat_id,
            'user_id' => $request->user_id,
            'text' => $request->text,
            'reply_message_id' => $request->reply_message_id
        ]);

        $user = Message::find($message->id)->user;
        $data = [
            'message_id' => $message->id,
            'chat_id' => $message->chat_id,
            'user_id' => $user->id,
            'user_name' => $user->name,
            'message_text' => $message->text,
            'reply_message_id' => $message->reply_message_id
        ];

        event(new MessageEvent($data));

        return $this->sendResponse($data, "Message created successful");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
