<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('bootstrap/css/bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('font/css/fontawesome.min.css') }}">
    <title>Document</title>
</head>
<body>
    <div id="example"></div>
</body>
<script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
<script type="text/javascript" src="{{ asset('bootstrap/js/bootstrap.min.js') }}"></script>
</html>