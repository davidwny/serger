<?php
	require_once('../init.php');

	$returnVal = array();
	
	$wgc = $_POST['wgc'];
	$rosIP = $_POST['rosIP'];
	$sergerIP = $_POST['sergerIP'];
	
	// set values on server side
	if( !configClass::setSergerIP( $wgc, $sergerIP ) ) {
		$returnVal['status'] = AJAX_STATUS_FAIL;
		echo json_encode($returnVal);
		exit();
	}
	
	if( !configClass::setRosIP( $wgc, $rosIP ) ) {
		$returnVal['status'] = AJAX_STATUS_FAIL;
		echo json_encode($returnVal);
		exit();
	}
	
	put_ini_file( SERVER_CONFIG_FILE, configClass::$configArray );
	
	// write out rosIP?
	$fileRosIP = configClass::readIPFile();
	if( $fileRosIP != $rosIP ) {
		configClass::writeIPFile( $rosIP );
	}
	
	$returnVal['status'] = AJAX_STATUS_OK;
	echo json_encode($returnVal);
	exit();
?>