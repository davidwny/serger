<?php
ini_set('display_errors', 1);

//require_once('defines.php');

echo "<pre>";
echo print_r($_SERVER)."</pre><br />";
echo phpinfo();

//dump($_SERVER);
//echo phpinfo();

//dump(ini_get('open_basedir'));

//ini_set('open_basedir', '/');
//dump(ini_get('open_basedir'));

//require_once ('Mail.php');
//require_once ('Mail/mime.php');
//$message = new Mail_mime("\n");

//print_r($_SERVER);

echo print_r(gd_info());



?>