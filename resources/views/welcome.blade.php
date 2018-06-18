<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Countries!</title>
    <link href="{{mix('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>

<div class='container'>
    <h1 class='title' style="text-align: center">Countries of Planet Earth</h1>
    <div id="root"></div>
</div>


<script src="{{mix('js/app.js')}}" ></script>
</body>
