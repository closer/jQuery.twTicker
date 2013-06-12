<?php

$CONSUMER = $_SERVER['CONSUMER'];
$SECRET   = $_SERVER['SECRET'];

# Oauth
$auth_url = "https://api.twitter.com/oauth2/token";
$credential = base64_encode($CONSUMER.":".$SECRET);
$headers = array(
  "Authorization: Basic {$credential}",
  "Content-Type: application/x-www-form-urlencoded;charset=UTF-8"
);
$options = array('http' => array(
  'method' => 'POST',
  'header' => implode("\r\n", $headers),
  'content' => "grant_type=client_credentials"
));

$contents = file_get_contents($auth_url, false, stream_context_create($options));

$m = array();
preg_match("/\"access_token\":\"([^\"]+)\"/", $contents, $m);
$token = $m[1];

# Search API

$query = "q=".urlencode($_GET['q'])."&"."rpp=".$_GET['rpp']."&"."callback=".$_GET['callback'];

$url = "https://api.twitter.com/1.1/search/tweets.json?".$query;
$options = array('http' => array(
  'method' => 'GET',
  'header' => "Authorization: Bearer {$token}"
));
$contents = file_get_contents($url, false, stream_context_create($options));

echo $contents;

