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

class ReactController extends Controller
{
    //function for reciving http post request from react UI. 
    //it recives image and info and saves them into database
    public function uploadFromReact(Request $request)
    { 
        if($request->hasFile('file')){
            $filenameWithExt = $request->file('file')->getClientOriginalName();
            //get filename, esim. harkat
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            //get ext esim. csv
            $extension = $request->file('file')->getClientOriginalExtension();
            //Filename to storage
            $fileNameToStore = $filename.'-'.date("Y-m-d--H-i-s").'.'.$extension;
            //Upload file
            $path = $request->file('file')->storeAs('public', $fileNameToStore);
            //getting input values from user
            $title=$request->input('title', null);
            $p=$request->input('price',null);
            $price=floatval($p);
            $desc=$request->input('description',null);
            $userID=auth()->user()->id;

            //adding all data ro Art table in our database
           try{
            $art =  new Art();
            $art->name=$path;
            $art->title=$title;
            $art->price=$price;
            $art->description=$desc;
            $art->owner_id=$userID;
            $art->save();
           }catch(Exception $e){
                return response()->json("");
           }
               
           //returns the image url/location
            return response()->json($path);
        }else{
            return response()->json("");
        }
    }

}
