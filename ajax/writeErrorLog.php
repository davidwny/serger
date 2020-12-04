<?php
	require_once('../init.php');

	$returnVal = array();
	
	// values are sanitized in called routine
	$bundleID = $_POST['bID'];
	$errorText = $_POST['eT'];
	$userID = intval( $_POST['uID'] );
	$errorSrc = $_POST['src'];
	

	// parse the response
	$bundleArray = explode('.', $bundleID);
	
	$factory = $bundleArray[0];
	$orderNum = $bundleArray[1];
	$bundleNum = $bundleArray[2];
	
	$returnVal['index'] = errorLogClass::insertErrorRecord( $factory, $bundleNum, $orderNum, $userID, $errorSrc, $errorText );
	$returnVal['status'] = AJAX_STATUS_OK;
	
	echo json_encode($returnVal);
	exit();
?>