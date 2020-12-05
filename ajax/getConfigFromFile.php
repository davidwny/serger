<?php
	require_once('../init.php');

	$returnVal = array();
	
	$returnVal['config'] = configClass::getConfigFromFile();
	$returnVal['rosIP'] = configClass::readIPFile();
	
	$returnVal['status'] = AJAX_STATUS_OK;
	echo json_encode($returnVal);
	exit();
?>