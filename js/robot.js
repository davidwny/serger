	// robot and serger routines
	
	// robot functions
	const ROBOT_STATUS = '0x72';
	const ROBOT_JOB_START = '0x86';
	const ROBOT_JOB_SELECT = '0x87';
		
	var robot = {
	
		sendSergerCommand: function( params ) {

			// setup serger
			$.ajax({
				url: BROWSER_AJAX + 'sendSergerCommand.php',
				method: 'GET',
				async: false,
				data: {ip: localStorage.WGC_0_sergerIP + ":" + SERGER_PORT, p: result.sewprog},
				success: function(result) {
				}
			});
		},
		
		sendRobotCommand: function( command, action ) {
			// command is ROBOT_STATUS, ROBOT_JOB_START or ROBOT_JOB_SELECT
			
			if( typeof action == 'undefined' ) {
				action = '';
			}
			
			// setup serger
			$.ajax({
				url: 'ros.cgi',
				method: 'POST',
				async: false,
				data: { commandID: command, fileName: action },
				success: function(result) {
				}
			});
		}
	
	}
	

	

