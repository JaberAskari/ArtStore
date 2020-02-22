<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage; 
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use lluminate\Http\File;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Exception;
use Session;
use Alert;
use Illuminate\Support\Facades\Redirect;
use App\Art;
use App\User;


class ApiController extends Controller
{
     //Returning all the arts information as a json to front end, react
     public function allArtJson(){
        //getting all the info in arts table from database
        $arts= Art::all();
        return response()->json($arts);

    }


    public function DetailPage($id){

        $data=$id;
        return view('artdetail')->with('data',$data);
        //return response()->json($id);
    }

    //Returning a json file contains of all arts from current user
    public function myArtsJson(){
        $userID=auth()->user()->id;
        $Arts = Art::where('owner_id', $userID)->get();
        return response()->json($Arts);

    }


    public function sendArtDetailjson($id){

        // $art= Art::where('id',$id)->get();
        // $owner_id=$art->owner_id;

        // $user= User::where('id',$owner_id);
        // $datas= $user.$art;
        // return response()->json($datas);


        $artinfo = DB::table('arts')
      ->select('arts.title',
        DB::raw("arts.name AS imgurl"),
        'arts.description',
        'arts.price',
        'users.name',
        'users.email',
        'users.phone'
        )
      ->join('users', 'arts.owner_id', '=', 'users.id')            
      ->where('arts.id','=',$id)             
      ->get();
      return response()->json($artinfo);

    }
}
