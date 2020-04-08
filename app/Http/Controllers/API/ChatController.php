<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Chat;
use App\User;
use App\Http\Resources\Chat as ChatResource;
use Illuminate\Support\Facades\Auth;

class ChatController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $chatList = Chat::all();
        $data = [
            'subscribed' => $this->getSubscribedChats(),
            'unsubscribed' => $this->getUnsubscribedChats()
        ];

        return $this->sendResponse($data, 'Chat list returned successful');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $path = $request->file('image')->store('chats', 'public');
        $chat = Chat::create([
            'title' => $request->title,
            'image' => $path,
        ]);

        return $this->sendResponse(new ChatResource($chat), 'Chat created successful');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $chat = Chat::find($id);
        return  $this->sendResponse(new ChatResource($chat), 'Chat returned successful');
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

    public function subscribe(Request $request)
    {
        $chat = Chat::find($request->chat_id);
        $chat->users()->attach($request->user_id);
        return $this->sendResponse([], 'User subscribed to chat successfully');
    }

    public function unsubscribe(Request $request)
    {
        $chat = Chat::find($request->chat_id);
        $chat->users()->detach($request->user_id);
        return $this->sendResponse([], 'User unsubscribed to chat successfully');
    }

    private function getSubscribedChats()
    {
        return User::find(Auth::id())->chats->load('lastMessage.user');
    }

    private function getUnsubscribedChats()
    {
        $subscribedChats = $this->getSubscribedChats();
        $unsubscribedChats = Chat::whereNotIn('id', $subscribedChats->pluck('id')->toArray())->get();
        return $unsubscribedChats->load('lastMessage');
    }
}
