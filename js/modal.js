	var modal = {
		imgTop: '50px',
		imgPadding: '0px',
		
		textTop: '150px',
		textPadding: '20px',
		textWidth: 300,
		
		fadeDelay: 200,
		
		defaultControlWidth: 400,
		
		showText: function(content, text_align) {
			if(typeof text_align == 'undefined') {
				text_align = 'center';
			} else {
				switch(text_align) {
					case 'left':
					case 'center':
						break;
					default:
						text_align = 'center';
						break;
				}
			}
			$('#modal #modal-content').html(content);
			$('#modal .container').width(modal.textWidth);
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': text_align,
										'top': modal.textTop
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			modal.bindCloseModal();
		},
		
		showErrorText: function(content, text_align) {
			if(typeof text_align == 'undefined') {
				text_align = 'center';
			} else {
				switch(text_align) {
					case 'left':
					case 'center':
						break;
					default:
						text_align = 'center';
						break;
				}
			}
			$('#modal #modal-content').html('<img src="' + BROWSER_IMAGES + 'modal_error.png" width="50"><p>' + content + '</p>');
			$('#modal .container').width(modal.textWidth);
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': text_align,
										'top': modal.textTop
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			modal.bindCloseModal();
		},
		
		showModalLogin: function() {
			// set up content for user bar code login
			var content = '<input id="user-login-barcode" class="barcode-input">' + 
							'<h2>Please use barcode reader to login or manually enter your login ID.</h2>' + 
							'<button id="modal-enter" type="button" onclick="return false;">Enter</button><button id="modal-cancel">Cancel</button>';
			
			$('#modal #modal-content').html(content);
			$('#modal .container').width( 500 );
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': 'center',
										'top': modal.textTop
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			$('#user-login-barcode').focus();
			modal.bindCloseModal();
			
			// submit user login valie
			$('#user-login-barcode').change(function(evt) {
// console.log('change');
				evt.stopPropagation();
				screens.submitLogin();				
			});
			
			$('#modal-enter').unbind().click( function( evt ) {
// console.log('click');
				evt.stopPropagation();
				screens.submitLogin();
			});
		},
		
		showMaintModalLogin: function() {
			// set up content for user bar code login
			var content = '<input id="user-login-barcode" class="barcode-input">' + 
							'<h2>Please use barcode reader to login or manually enter your maintenance login ID.</h2>' + 
							'<button id="modal-enter" type="button" onclick="return false;">Enter</button><button id="modal-cancel">Cancel</button>';
			
			$('#modal #modal-content').html(content);
			$('#modal .container').width( 500 );
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': 'center',
										'top': modal.textTop
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			$('#user-login-barcode').focus();
			modal.bindCloseModal();
			
			// submit user login valie
			$('#user-login-barcode').change(function(evt) {
// console.log('change');
				evt.stopPropagation();
				maint.submitLogin();			
			});
			
			$('#modal-enter').unbind().click( function( evt ) {
// console.log('click');
				evt.stopPropagation();
				maint.submitLogin();
			});
		},

		scanBundle: function() {
			// set up content for user bar code login
			var content = '<input id="bundle-barcode" class="barcode-input">' + 
							'<h2>Please use barcode reader to scan bundle barcode or manually enter barcode.</h2>' + 
							'<button id="modal-enter" type="button" onclick="return false;">Enter</button><button id="modal-cancel">Cancel</button>';
			
			$('#modal #modal-content').html(content);
			$('#modal .container').width( 500 );
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': 'center',
										'top': modal.textTop
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			$('#bundle-barcode').focus();
			modal.bindCloseModal();
			
			// submit user login valie
			$('#bundle-barcode').change(function(evt) {
// console.log('change');
				evt.stopPropagation();
				screens.submitBundleScan();
			});
			
			$('#modal-enter').unbind().click( function( evt ) {
// console.log('click');
				evt.stopPropagation();
				screens.submitBundleScan();
			});
		},
		
		offStandard: function() {
			// set up content for user bar code login
			var content = '<h2>Please choose reason for going Off Standard:</h2>' +
							'<p id="wrapper-os"><input class="input-os" type="radio" name="os-type" id="lunch" value="lunch"><label class="label-os">Lunch</label><br />' +
							'<input class="input-os" type="radio" name="os-type" id="break" value="break"><label class="label-os">Break</label><br />' +
							'<input class="input-os last" type="radio" name="os-type" id="idle" value="idle"><label class="label-os">Machine Idle</label></p><div class="clearer"></div>' +
							'<button id="modal-enter" type="button" onclick="return false;">Enter</button><button id="modal-cancel">Cancel</button>';
			
			$('#modal #modal-content').html(content);
			$('#modal .container').width( 500 );
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': 'center',
										'top': modal.textTop
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			modal.bindCloseModal();
			
			// bind click of label
			$('.label-os').click(function() {
				$(this).prev('input').trigger("click");
			});
						
			$('#modal-enter').unbind().click( function( evt ) {
				evt.stopPropagation();
				screens.submitOffStandard();
			});
		},
		
		reportSergerError: function() {
			// set up content for user bar code login
			var content = '<h2>Please Choose Error Condition:</h2>' +
							'<p id="wrapper-os">' + 
							'<input class="input-os" type="radio" name="os-type" id="thread-break" value="thread-break">' + 
							'<label class="label-os">Thread Break</label><br />' +
							'<input class="input-os" type="radio" name="os-type" id="needle-break" value="needle-break">' + 
							'<label class="label-os">Needle Break</label><br />' +
							'<input class="input-os last" type="radio" name="os-type" id="panel-jam" value="panel-jam">' + 
							'<label class="label-os">Panel Jam</label><br />' + 
							'<input class="input-os" type="radio" name="os-type" id="robot" value="robot">' + 
							'<label class="label-os">Robot Malfunction</label><br />' + 
							'<input class="input-os last" type="radio" name="os-type" id="no-error" value="no-error">' + 
							'<label class="label-os">No Error</label>' + 
							'</p><div class="clearer"></div>' +
							'<button id="modal-enter" type="button" onclick="return false;">Enter</button>';
			
			$('#modal #modal-content').html(content);
			$('#modal .container').width( 500 );
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': 'center',
										'top': modal.textTop
			});
			
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			$('a.close_modal').hide();

			
			// bind click of label
			$('.label-os').click(function() {
				$(this).prev('input').trigger("click");
			});
						
			$('#modal-enter').unbind().click( function( evt ) {
				evt.stopPropagation();

				// did we get a valid input
				if( typeof($('input.input-os:checked ').val()) == 'undefined' ) {
					$('#modal #modal-content h2').css('border', '1px solid red');
				} else {
					screens.submitSergerError();
				}
			});
		},
		
		reportModal: function( errorSource ) {
			var content = '';

			$.ajax({
				url: BROWSER_AJAX + 'getErrorReport.php',
				dataType: 'json',
				type: 'post',
				async: false,
				data: {eS: errorSource},
				success: function(result) {
					if(result.status == AJAX_STATUS_OK) {
						content = result.content;
					}
				}
			});
			
			$('#modal #modal-content').html(content);
			$('#modal .container').width( 600 );
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': 'left',
										'top': 50,
										'width': '1000px'
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			modal.bindCloseModal();		
		},
		
		ipModal: function() {
			// set up content for user bar code login
			var content = '<p class="maint-label">Serger Keyboard Interface IP Address:</p>' +
							'<input maxlength="15" placeholder="xxx.xxx.xxx.xxx" type="text" class="maint-input IP" id="WGC_0_sergerIP" value=' + localStorage.WGC_0_sergerIP + '>' + 
							'<p class="maint-label">ROS Controller IP Address:</p>' + 
							'<input type="text" placeholder="xxx.xxx.xxx.xxx" class="maint-input IP" id="WGC_0_rosIP" type="text" maxlength="15" value=' + localStorage.WGC_0_rosIP + '><div class="clearer"></div>' + 
							'<button id="modal-enter" class="maint-enter" type="button" onclick="return false;">Enter</button><button id="modal-cancel">Cancel</button>';
			
			$('#modal #modal-content').html(content);
			$('#modal .container').width( 600 );
			$('#modal .container').css({
										'height': 'auto',
										'padding': modal.textPadding,
										'text-align': 'left',
										'top': modal.textTop
			});
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			$('#serger-IP').focus();
			modal.bindCloseModal();
						
			$('#modal-enter').unbind().click( function( evt ) {
				if( validate.validateIPAddresses() ) {
					localStorage.WGC_0_sergerIP = $('#WGC_0_sergerIP').val();
					localStorage.WGC_0_rosIP = $('#WGC_0_rosIP').val();
					config.writeConfigToFile();
					modal.closeModal();
				}
			});
			$('input.maint-input.IP').change(function() {
				var inputObj = '#' + $(this).attr('id');
				if( validate.validateIPAddress( inputObj ) ) {
					validate.clearErrorInput( inputObj );
				} else {
					validate.setErrorInput( inputObj );
					alert("Please correct invalid IP syntax.");
				}
			});
			
		},

		/********************* Utils for modals *******************/		
		bindCloseModal: function() {
			$('a.close_modal, button#modal-cancel').unbind().click(modal.closeModal);
		},
		
		showModal: function(response) {
			$('#modal-content').html(response.html);
			$('#modal').css('position', 'fixed').fadeIn(modal.fadeDelay);
			$('#modal .container').css('height', 'auto');
		},
		
		ajaxWait: function() {
			$('#modal .close_modal').hide();
			$('#modal #modal-content').append('<img class="image_modal modal_content image-ajax" src="' + BROWSER_IMAGES + 'ajax_loader.gif" alt="Product Image">');
			$('#modal .container').width(modal.textWidth);
			$('#modal .container').css({
										'height': '150px',
										'padding': modal.textPadding,
										'text-align': 'center',
										'top': modal.textTop,
										'background-color': '#FFFFFF' 
			});
			$('#modal-content').css('margin-top', '30px');
			$('#modal img.image-ajax').css({'margin': 'auto', 'height': '100px'});
			$('#modal').css('position', 'fixed').show();					
		},

		closeModal: function() {
			$('#modal').fadeOut(modal.fadeDelay,
				function() {
					$('#modal-content').empty();
					$('#modal .close_modal').show();
					$('#modal .container').css('width', '400px');
					$('#modal .container .control-modal-div').css('width', '345px');					
				}
			);
		},
		closeModalFast: function() {
			$('#modal').hide();
			$('#modal-content').empty();
			$('#modal .close_modal').show();
		},
		
		bindCloseStyleSelect: function() {
			$('#shop-style-select-close').unbind().click(function() {
				$('#shop-style-selector-content').html('');
				$('#shop-style-selector').hide();
			});		
		}
	}
