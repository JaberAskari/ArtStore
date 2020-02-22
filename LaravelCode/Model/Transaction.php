<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    //

    public  $timestamps=false;

    protected $fillable = ['date', 'price', 'art_id','buyer_id'];
}
