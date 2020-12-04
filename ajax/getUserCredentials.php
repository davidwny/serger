<?php
	require_once('../init.php');

	$returnVal = array();
	
	$userID = sanitize::valuesFromPost('userID');
	
	if( !ctype_digit( $userID ) ) {
		$returnVal['status'] = AJAX_STATUS_FAIL;		
	} else {
		$userRows = dbClass::dbSelectQuery("
			SELECT UM.*, UA.wgc, UA.serger_maint FROM `useraccess` AS UA, `usermaster` AS UM WHERE UM.id = $userID AND UA.accessID = UM.accessID
		");
		
		if( count( $userRows ) != 1 ){
			$returnVal['status'] = AJAX_STATUS_FAIL;		
		} else {
			$userRow = $userRows[0];
			$returnVal['status'] = AJAX_STATUS_OK;
			$returnVal['name'] = $userRow['fname'] . ' ' . $userRow['lname'];
			$returnVal['id'] = $userRow['id'];
			$returnVal['maint'] = ( $userRow['serger_maint'] == 'Y' ) ? 1 : 0;
		}
	}
	
	echo json_encode($returnVal);
	exit();
?>