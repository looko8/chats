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
        $messages = Message::where('chat_id', $id)->latest()->paginate(10);
        $messages->load('user');
        return $this->sendResponse($messages, "Messages for chat with id = {$id} load successful");
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

        $message = Message::find($message->id);
        $message->load('user');

        event(new MessageEvent($message));

        return $this->sendResponse($message, "Message created successful");
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
