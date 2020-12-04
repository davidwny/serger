<?php
	require_once('../init.php');

	$returnVal = array();
	
	$bundleID = sanitize::valuesFromPost('bID');

	// parse the response
	$bundleArray = explode('.', $bundleID);
	
	if( count($bundleArray) != 3 ) {
		$returnVal['status'] = AJAX_STATUS_FAIL;
		echo json_encode($returnVal);
		exit();		
	}
	
	$factory = $bundleArray[0];
	$orderNum = $bundleArray[1];
	$bundleNum = $bundleArray[2];
	
	if( !(ctype_digit( $factory ) && ctype_digit( $orderNum ) && ctype_digit( $bundleNum )) ) {
		$returnVal['status'] = AJAX_STATUS_INVALID_PARAMS_BUNDLE;
	} else {
		$bundleRows = dbClass::dbSelectQuery("
			SELECT OP.*, ORD.bunqty FROM bunoper AS OP, ordbun AS ORD
			WHERE ORD.factory = '$factory' 
				AND ORD.ORDNUM = '$orderNum' 
				AND ORD.BUNNUM = '$bundleNum'
				AND OP.factory = '$factory' 
				AND OP.ORDNUM = '$orderNum' 
				AND OP.BUNNUM = '$bundleNum'
		");
		
		if( count($bundleRows) != 1 ) {
			$returnVal['status'] = AJAX_STATUS_FAIL;
		} else {
			$bundleRow = $bundleRows[0];
			$returnVal['status'] = AJAX_STATUS_OK;
//			$returnVal['result'] = $bundleRows[0];

			// parse size and front or back
			$sizeArray = explode('.', $bundleRow['ITMID4']);
			$returnVal['size'] = $sizeArray[0];
			$returnVal['frontBack'] = $sizeArray[1];
			
			$returnVal['orderNum'] = $bundleRow['ORDNUM'];
			$returnVal['SKU'] = $factory . $bundleRow['ORDNUM'] . $returnVal['size'] . $returnVal['frontBack'];
			$returnVal['style'] = $bundleRow['ITMID1'];
			$returnVal['desc'] = $bundleRow['ITMDATA1'];
			$returnVal['bundle'] = $bundleRow['BUNNUM'];
			$returnVal['bunqty'] = $bundleRow['bunqty'];
		}
		
	}

	echo json_encode($returnVal);
	exit();
?>