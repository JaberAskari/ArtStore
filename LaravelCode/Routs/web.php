<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();






Route::group(['middleware' => ['auth']], function(){
    //loading the uploadimg blade
    Route::get('/upload', 'UploadController@uploadPage');
    //uploads image to storage
    Route::post('/uploadfromreact', 'ReactController@uploadFromReact');

    //loading the home blade
    Route::get('/home', 'HomeController@index')->name('home');
    //sends all arts of the logged in user to react to show in home blade
    Route::get('/myArtsJson','ApiController@myArtsJson');

});

//sends to react a json file that contains all arts information in database
Route::get('/allArtJson','ApiController@allArtJson');



Route::get('/artdetail/{id}','ApiController@DetailPage');
Route::get('/artdetailjson/{id}','ApiController@sendArtDetailjson');


/*
Route::group(['middleware' => ['auth']], function(){
    Route::get('/h', 'GalleryController@index');
 
    Route::get('/photos', 'GalleryController@getPhotos');
 
    Route::post('/photos', 'GalleryController@uploadPhotos');
 
    Route::delete('/photos', 'GalleryController@deletePhoto');
 
    Route::get('/logout', 'Auth\LoginController@logout');
 
    Route::get('/upload/{all?}', 'GalleryController@index')->where('all', '([A-z\d-\/_.]+)?');});*/