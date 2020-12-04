<?php
	require_once('../init.php');

	$returnVal = array();
	
	$errorSource = sanitize::valuesFromPost('eS');

	$errorRows = errorLogClass::getErrorRecordsWithName( $errorSource, $dir="DESC" );
	
	if( count($errorRows) == 0 ) {
		$content = '
			<p>No records found!</p>
		';
	} else {
		$content = '
			<p class="maint-label" style="width: 100%;">WGC Error Report for ' . $errorSource . ' ' . date("Y-M-d h:i:s A") . '</p>
			<table style="width: 100%;">
				<tr>
					<th>Name</th>
					<th class="center">Factory</th>
					<th class="center">Order #</th>
					<th class="center">Bundle</th>
					<th class="center">Error Source</th>
					<th>Error Message</th>
					<th>Time</th>
				</tr>
		';
		
		// iterate over rows
		foreach( $errorRows as $errorIndex => $errorRow ) {
			$content .= '
				<tr>
					<td>' . $errorRow["fname"] . ' ' . $errorRow["lname"] . '</td>
					<td class="center">' . $errorRow["ErrorLogFactoryID"] . '</td>
					<td class="center">' . $errorRow["ErrorLogOrderNum"] . '</td>
					<td class="center">' . $errorRow["ErrorLogBundleNum"] . '</td>
					<td class="center">' . $errorRow["ErrorLogErrorSource"] . '</td>
					<td>' . $errorRow["ErrorLogMessage"] . '</td>
					<td>' . $errorRow["ErrorLogTimeStamp"] . '</td>
				</tr>
			';
			if( $errorIndex >= 9 ) {
				break;
			}
		}
		
		$content .= '
			</table>
			<button id="modal-cancel" style="margin: 20px 0 0 0;">Cancel</button>
		';
	}
		
	$returnVal['status'] = AJAX_STATUS_OK;
	$returnVal['content'] = $content;

	echo json_encode($returnVal);
	exit();
?>