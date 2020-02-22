@extends('layouts.app')

@section('content')
<div>
<div class="hero-img">
<div class="hero-text">
    <h1>Hello, <span style="color:#ff886e "> {{$user}}</span></h1>
    <h5>Here you can see list of your arts</h5>
    
</div>
</div>
</div>

<div class="container">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                      {{ session('status') }}
                        </div>
                    @endif
                </div>
            </div>
        </div>

        <div id="home"></div>
  
</div>

@endsection
