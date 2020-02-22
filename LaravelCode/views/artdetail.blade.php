@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Art's Details:</div>

                <div class="card-body" style="padding:0">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif


 
                    <div id="detail"></div>

                
                </div>
            </div>
        </div>
    </div>


</div>

@endsection
