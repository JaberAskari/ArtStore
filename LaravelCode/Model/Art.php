<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Art extends Model
{
    //

    protected $fillable = ['name','title', 'price', 'description','owner_id'];
}
