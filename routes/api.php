<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'API\UserController@login');
Route::post('/register', 'API\UserController@register');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('chats/subscribed', 'API\ChatController@subscribedChats')->name('chats.subscribed');
    Route::post('chats/subscribe', 'API\ChatController@subscribe')->name('chats.subscribe');
    Route::post('chats/unsubscribe', 'API\ChatController@unsubscribe')->name('chats.unsubscribe');
    Route::resource('chats', 'API\ChatController');
    Route::resource('chats.messages', 'API\MessageController');
    Route::post('/logout', 'API\UserController@logout');
});

