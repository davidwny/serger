


var maint = {
	
	currentStatus: OFF,
	
	// button 1 - Scan Bundle
	// button 2 - ERROR
	// button 3 - Off Standard
	// button 4 - Clock In Out
	// button 5 - Return
	// button 6 - Load Bundle
	// button 7 - Start Seging
	// button 8 - Stop Serging
	// button 9 - Abort Bundle
	
	configScreen: function( currentStatus ) {
		if( currentStatus == OFF ) {
			// show button 4 - Clock In
			
			screens.setHeader( currentStatus );
			$('.button-holder').hide();
			$('#bundle-status').hide();
			$('#plies').hide();
			$('#operator-status-wrapper').hide();
			
			$('.button-4 h2').html('Clock In');
			$('.button-4').show();
			
			sessionStorage.clear();
			
			// bind event to button
			// show user ID input
			// focus to input...give instructions to scan barcode
			$('.button-4').unbind().click(function() {
				modal.showModalLogin();
			});
		} else if( currentStatus == CLOCKED_IN) {
			// show buttons 1, 3, 4 - Scan Bundle, Off Standard, Clock Out
			
			screens.setHeader( currentStatus );
			$('.button-holder').hide();
			$('#bundle-status').hide();
			$('#plies').hide();

			// load buttons
			$('.button-4 h2').html('Clock Out');
			$('.button-3 h2').html('Off Standard');

			$('.button-1, .button-3, .button-4').show();
			$('#operator-status-wrapper').show();
			
			// update operator info
			screens.showOperatorInfo();
									
			// bind event to button
			// show user ID input
			// bind event for going off standard
			$('.button-3').unbind().click(function() {
				modal.offStandard();
			});
			
			// focus to input...give instructions to scan barcode
			$('.button-4').unbind().click(function() {
				this.currentStatus = OFF;
				screens.configScreen( this.currentStatus );
			});

			// bind event to scan bundle-status
			$('.button-1').unbind().click(function() {
				modal.scanBundle();
			});
		} else if( currentStatus == SCANNED ) {
			screens.setHeader( currentStatus );

			// load buttons
			$('.button-holder').hide();
			
			// show load bundle and return
			$('.button-6').show();
			$('.button-5').show();
			
			$('#bundle-status').show();
			$('#plies').show();
			$('#plies-status').hide();
			$('#operator-status-wrapper').show();
			
			// bind event to return
			$('.button-5').unbind().click(function() {
				screens.currentStatus = CLOCKED_IN;
				screens.configScreen( screens.currentStatus );
			});
			
			// bind event to scan bundle-status
			$('.button-6').unbind().click(function() {
				screens.currentStatus = LOADED;
				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == LOADED ) {
			screens.setHeader( currentStatus );
			
			// load buttons
			$('.button-holder').hide();
			$('.button-7').show();
			$('.button-7 h2').html('Start Serging');
			$('.button-5').show();
			
			$('#plies-status').show();

			// bind event to start serging
			$('.button-7').unbind().click(function() {
				screens.currentStatus = RUNNING;
				screens.configScreen( screens.currentStatus );
			});
			
			// bind event to return
			$('.button-5').unbind().click(function() {
				screens.currentStatus = SCANNED;
				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == RUNNING ) {
			screens.setHeader( currentStatus );

			// load buttons
			$('.button-holder').hide();
			$('.button-8').show();
			
			// bind modal for error reporting
			$('.button-8').unbind().click(function() {
				// hooks for stopping robot and serger
								
				screens.currentStatus = STOPPED;
				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == STOPPED ) {
			screens.setHeader( currentStatus );

			// load buttons
			$('.button-holder').hide();
			$('.button-8').show();
			
			modal.reportSergerError();

			// bind modal for error reporting
			$('.button-8').unbind().click(function() {
				// hooks for stopping robot and serger
				
				$('#header-status').html('SERGER STOPPED').css({
					'background-color': '#ff3300'				
				});
				
//				screens.currentStatus = STOPPED;
//				screens.configScreen( screens.currentStatus );
			});
		} else if( currentStatus == SERGER_RESUME ) {
			screens.setHeader( currentStatus );

			// load buttons
			$('.button-holder').hide();
			$('.button-7').show();
			$('.button-7 h2').html('Resume Serging');
			$('.button-9').show();
			
			$('.button-7').click(function() {
				screens.currentStatus = RUNNING;
				screens.configScreen( screens.currentStatus );
			});
			
			$('.button-9').click(function() {
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
			$('.button-3').unbind().click(function() {
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
						sessionStorage.maint_userID = result.id;
						sessionStorage.maint_name = result.name;
						sessionStorage.maint = result.maint;
						
						if( sessionStorage.maint != 1 ) {
							modal.showErrorText("Invalid operator ID!");							
						} else {
							modal.closeModal();
							screens.maintCurrentStatus = MAINT_LOGIN;
							screens.configScreen( screens.maintCurrentStatus );	
						}
					} else {
						modal.showErrorText("Invalid operator ID!");
					}
				}
			});
						
		}		
	},
	
	

		
}