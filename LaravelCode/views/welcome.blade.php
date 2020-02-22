@extends('layouts.app')

@section('content')
<div class="hero-img-welcome">
<div class="hero-text">
    <h1>Welcom to<span style="color:#ff886e "> Art Store</span></h1>
    <p>Here you can see, buy and order arts </p>
    
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
        <div id="AllCards"></div>
</div>

@endsection

