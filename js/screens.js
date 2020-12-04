
const OFF = 0;
const CLOCKED_IN = 1;
const SCANNED = 2;
const LOADED = 3;
const RUNNING = 4;
const ERROR = 5;
const STOPPED = 6;
const OFF_STANDARD = 7;
const SERGER_RESUME = 8;
const MAINT_LOGIN = 9;

const TWELVEHOUR = true;
const TWENTYFOURHOUR = false;

var screens = {
	
	currentStatus: OFF,
	maintCurrentStatus: OFF,
	
	init: function() {
		if( typeof sessionStorage.userID != 'undefined' ) {
			// get last screen
			this.currentStatus = sessionStorage.lastScreen;
			
			// get login name

			// get login time
			if( this.currentStatus != OFF ) {
				// set login time
				dateTime.setLoginTimeDateString( TWELVEHOUR );
			}
		} else {
			this.currentStatus = OFF;
			sessionStorage.lastScreen = OFF;			
		}

		// do we have a scanned bundle?
		if( typeof sessionStorage.bundleID != 'undefined') {
			this.submitBundleScan( sessionStorage.bundleID );
		}
		
		this.configScreen( this.currentStatus );
	},
		
	configScreen: function( currentStatus ) {
		// set banner
		if( sessionStorage.maint == 1 ) {
			$('#header-title').html('Robotic Serger Maintenance');
			$('#button-maintenance').hide();
		} else {
			$('#header-title').html('Robotic Serger Control Panel');			
			$('#button-maintenance').show();
		}
		
		if( currentStatus == MAINT_LOGIN ) {
			// reset screen
			screens.setHeader( screens.currentStatus );
			screens.resetScreen();
			
			// load buttons
			screens.setButton('1', 'IP Address', 'ip.png');
			screens.setButton('2', 'Robot Error report', 'loadbundle.png');
			screens.setButton('3', 'Serger Error Report', 'sergererror.png');
			screens.setButton('4', 'Maintenance Clock Out', 'clockinout.png');
			
			// init operator info
			screens.showOperatorInfo( sessionStorage.maint );
			
			// bind IP address
			$('.button-1').click(function() {
				modal.ipModal();
			});
			
			// bind report buttons
			$('.button-2').click(function() {
				modal.reportModal( "Robot" );
			});
			$('.button-3').click(function() {
				modal.reportModal( "Serger" );
			});

			// bind clock out
			$('.button-4').click(function() {
				// clock out from maintenance

				// update login info
				if( screens.currentStatus != OFF ) {
					$('#operator-name').val( sessionStorage.name );
					$('#login-time').val( dateTime.loginTimeDateString );
				}
				
				sessionStorage.maint = 0;
				sessionStorage.removeItem("maintLoginDateMilliSec");
				screens.configScreen( screens.currentStatus );
			});
			
		} else if( currentStatus == OFF ) {			
			// reset screen
			screens.setHeader( currentStatus );
			screens.resetScreen();
			
			screens.setButton('1', 'Clock In', 'clockinout.png');
			
			sessionStorage.clear();
			
			// bind event to button
			// show user ID input
			// focus to input...give instructions to scan barcode
			$('.button-1').click(function() {
//				modal.showModalLogin();

			$.ajax({
				url: 'ros.exe',
				dataType: 'json',
				method: 'POST',
				async: false,
				data: {commandID: '0x72', fileName: 'aaaa'},
				success: function(result) {
console.log(JSON.stringify(result));
				}
			});

			});
		} else if( currentStatus == CLOCKED_IN) {
			// show buttons 1, 3, 4 - Scan Bundle, Off Standard, Clock Out
			
			screens.setHeader( currentStatus );
			screens.resetScreen();

			// load buttons
			screens.setButton('1', 'Scan Bundle', 'scanbundle.png');
			screens.setButton('2', 'Off Standard', 'offstandard.png');
			screens.setButton('3', 'Clock Out', 'clockinout.png');
			
			// show operater status
			$('#operator-status-wrapper').show();
			
			// update operator info
			screens.showOperatorInfo();
									
			// bind event to button
			// show user ID input
			// bind event for going off standard
			$('.button-2').click(function() {
				modal.offStandard();
			});
			
			// focus to input...give instructions to scan barcode
			$('.button-3').click(function() {
				this.currentStatus = OFF;
				screens.configScreen( this.currentStatus );
			});

			// bind event to scan bundle-status
			$('.button-1').click(function() {
				modal.scanBundle();
			});
		} else if( currentStatus == SCANNED ) {
			screens.setHeader( currentStatus );
			screens.resetScreen();
			
			// show load bundle and return
			screens.setButton('1', 'Load Bundle', 'loadbundle.png');
			screens.setButton('2', 'Return', 'return.png');
			
			$('#bundle-status').show();
			$('#plies').show();
			$('#plies-status').hide();
			$('#operator-status-wrapper').show();
			
			// bind event to return
			$('.button-2').click(function() {
				screens.currentStatus = CLOCKED_IN;
				screens.configScreen( screens.currentStatus );
			});
			
			// bind event to scan bundle-status
			$('.button-1').click(function() {
				screens.currentStatus = LOADED;
				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == LOADED ) {
			screens.setHeader( currentStatus );
			screens.resetScreen();
			
			// load buttons
			screens.setButton('1', 'Start Serging', 'startserging.png');
			screens.setButton('2', 'Return', 'return.png');
			
			$('#bundle-status').show();
			$('#plies').show();
			$('#plies-status').show();
			$('#operator-status-wrapper').show();

			// bind event to start serging
			$('.button-1').click(function() {
				screens.currentStatus = RUNNING;
				screens.configScreen( screens.currentStatus );
			});
			
			// bind event to return
			$('.button-2').click(function() {
				screens.currentStatus = SCANNED;
				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == RUNNING ) {
			screens.setHeader( currentStatus );
			screens.resetScreen();

			// load buttons
			screens.setButton('1', 'Stop Serging', 'stopserging.png');
			
			$('#bundle-status').show();
			$('#plies').show();
			$('#plies-status').show();
			$('#operator-status-wrapper').show();

			// bind modal for error reporting
			$('.button-1').click(function() {
				// hooks for stopping robot and serger
								
				screens.currentStatus = STOPPED;
				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == STOPPED ) {
			screens.setHeader( currentStatus );
			screens.resetScreen();

			// load buttons
			screens.setButton('1', 'Stop Serging', 'stopserging.png');
			
			modal.reportSergerError();
		} else if( currentStatus == SERGER_RESUME ) {
			screens.setHeader( currentStatus );
			screens.resetScreen();

			// load buttons
			screens.setButton('1', 'Resume Serging', 'startserging.png');
			screens.setButton('2', 'Abort Bundle', 'abort.png');
			
			$('#bundle-status').show();
			$('#plies').show();
			$('#plies-status').show();
			$('#operator-status-wrapper').show();

			$('.button-1').click(function() {
				screens.currentStatus = RUNNING;
				screens.configScreen( screens.currentStatus );
			});
			
			$('.button-2').click(function() {
				screens.currentStatus = CLOCKED_IN;
				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == OFF_STANDARD ) {
			// set staus
			screens.setHeader( currentStatus );
			
			// load buttons
			$('.button-holder').hide();
			$('#bundle-status').hide();
			$('#plies').hide();
			
			// show button 3
			$('.button-3 h2').html('Return to Standard');
			$('.button-3').show();
			$('.button-3').click(function() {
				this.currentStatus = CLOCKED_IN;
				screens.configScreen( this.currentStatus );				
			});

		}		
		sessionStorage.lastScreen = currentStatus;
	},
	
	submitLogin: function() {
		// did we get a valid input
		if( !validate.validateTextInput($('#user-login-barcode')) ) {
			alert('Invalid');
		} else {
			// ajax routine goes here to get user infor from DB
			$.ajax({
				url: BROWSER_AJAX + 'getUserCredentials.php',
				dataType: 'json',
				type: 'post',
				async: false,
				data: {userID: $('#user-login-barcode').val()},
				success: function(result) {
					if(result.status == AJAX_STATUS_OK) {
						sessionStorage.userID = result.id;
						sessionStorage.name = result.name;
						sessionStorage.maint = result.maint;
						
						screens.currentStatus = CLOCKED_IN;
						modal.closeModal();
						screens.configScreen( screens.currentStatus );
					} else {
						sessionStorage.clear();
						modal.showErrorText("Invalid operator ID!");
					}
				}
			});
						
		}		
	},
	
	submitBundleScan: function( passedBundleID ) {
		// was there a value passed?
		var bundleID;
		if( typeof passedBundleID == 'undefined') {
			bundleID = $('#bundle-barcode').val();
		} else {
			bundleID = passedBundleID;
		}
		
		// did we get a valid input
		if( bundleID == '' ) {
			modal.showErrorText("Invalid bundle ID!");
		} else {
			// ajax routine goes here to get user infor from DB
			$.ajax({
				url: BROWSER_AJAX + 'getBundleInfo.php',
				dataType: 'json',
				type: 'post',
				async: false,
				data: {bID: $('#bundle-barcode').val()},
				success: function(result) {
					if(result.status == AJAX_STATUS_OK) {
						// place results into screen
						// Load parameters
						$('#cut-no input').val( result.orderNum);
						$('#sku input').val( result.SKU);
						$('#style input').val( result.style);
						$('#description input').val( result.desc);
						$('#bundle-no input').val( result.bundle);
						$('#plies-no input').val( result.bunqty);
						$('#plies-serged input').val( 0 );
						
						// display part images
						var imageURL = './diagrams/' + result.size;
						if( result.frontBack == 'F' ) {
							imageURL += '_front.png';
						} else {
							imageURL += '_back.png';							
						}
						$('#plies img').attr('src', imageURL);

						// save bundle info
						sessionStorage.bundleID = $('#bundle-barcode').val();
						
						screens.currentStatus = SCANNED;
						modal.closeModal();
						screens.configScreen( screens.currentStatus );
					} else {
						modal.showErrorText("Invalid bundle ID!");
					}
				}
			});
		}		
	},
	
	submitOffStandard: function() {
		// did we get a valid input
		if( typeof($('input.input-os:checked ').val()) == 'undefined' ) {
			modal.showErrorText("Please choose a reason for going Off Standard!");
		} else {
			screens.currentStatus = OFF_STANDARD;
			modal.closeModal();
			screens.configScreen( screens.currentStatus );
		}
		
	},
	
	submitSergerError: function() {
		// get serger error text
		var errorText = $('input.input-os:checked ').next('label').html();
		
		// hook to log the error to database.
		$.ajax({
			url: BROWSER_AJAX + 'writeErrorLog.php',
			dataType: 'json',
			type: 'post',
			async: false,
			data: {bID: sessionStorage.bundleID, eT: errorText, src: 'Serger', uID: sessionStorage.userID},
			success: function(result) {
				if(result.status == AJAX_STATUS_OK) {

				}
			}
		});
		
		modal.closeModal();
		screens.currentStatus = SERGER_RESUME;
		screens.configScreen( screens.currentStatus );	
	},
	
	showOperatorInfo: function( maint ) {
		if( typeof maint == 'undefined') {
			maint = 0;
		}

		// show operator status
		$('#operator-status-wrapper').show();
		
		if( maint == 0 ) {
			// update operator name
			$('#operator-name').val( sessionStorage.name );
			
			// set login time
			dateTime.setLoginTimeDateString( TWELVEHOUR );
		} else {
			// update operator name
			$('#operator-name').val( sessionStorage.maint_name );
			
			// set login time
			dateTime.setMaintLoginTimeDateString( TWELVEHOUR );
		}
	},
	
	resetScreen: function() {
		$('.button-holder').unbind().hide();
		$('.button-holder').click(function() {
			audioClick.play();
		});
		
		$('#bundle-status').hide();
		$('#plies').hide();
		$('#operator-status-wrapper').hide();
	},
	
	setButton: function( btnNum, btnLabel, btnImage) {
		$('.button-' + btnNum + ' img').attr('src', BROWSER_IMAGES + btnImage);
		$('.button-' + btnNum + ' h2').html(btnLabel);
		$('.button-' + btnNum).show();		
	},
	
	setHeader: function( currentStatus ) {
		switch( parseInt( currentStatus ) ) {
			case OFF:
				$('#header-status').html('OFF').css({
					'background-color': '#F2F2F2'
				});
				break;
				
			case CLOCKED_IN:
				$('#header-status').html('CLOCKED IN').css({
					'background-color': '#FFCC66'
				});
				break;
				
			case SCANNED:
				$('#header-status').html('BUNDLE SCANNED').css({
					'background-color': '#FFCC66'				
				});
				break;
				
			case LOADED:
				$('#header-status').html('BUNDLE LOADED').css({
					'background-color': '#FFCC66'				
				});
				break;
				
			case RUNNING:
				$('#header-status').html('SERGER RUNNING').css({
					'background-color': '#92d050'				
				});
				break;
			
			case STOPPED:
				$('#header-status').html('SERGER STOPPED').css({
					'background-color': '#ff3300'				
				});
				break;
			
			case SERGER_RESUME:
				$('#header-status').html('SERGER STOPPED').css({
					'background-color': '#ff3300'				
				});
				break;
			
			case OFF_STANDARD:
				$('#header-status').html('OFF STANDARD').css({
					'background-color': '#FFCC66'
				});
				break;		
		}
		
	}
}