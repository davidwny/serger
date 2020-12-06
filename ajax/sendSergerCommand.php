<?php
	require_once('../init.php');

	$returnVal = array();
	
	$params = $_GET['p'];
	$ip = $_GET['ip'];


	// create curl resource
	$ch = curl_init();

	// set url
	curl_setopt($ch, CURLOPT_URL, "$ip/?params=$params");
	curl_setopt($ch, CURLOPT_HEADER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5); 
	curl_setopt($ch, CURLOPT_TIMEOUT, 5); //timeout in seconds	
	
	// $output contains the output string
	$output = curl_exec($ch);

	// close curl resource to free up system resources
	curl_close($ch); 

	echo json_encode($returnVal);
	exit();
?>