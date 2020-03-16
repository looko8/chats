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

Route::middleware('auth:airlock')->get('/user', function (Request $request) {
    return $request->user();
});

    Route::post('/login', 'API\UserController@login');
    Route::post('/register', 'API\UserController@register');
    Route::post('/token', 'API\UserController@token');

    Route::middleware('auth:airlock')->post('/logout', 'API\UserController@logout');
