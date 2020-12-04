	// validation object
	var validate = {
	
		setErrorInput: function(inputObj) {
			$(inputObj).addClass('error');
			return;
		},

		clearErrorInput: function(inputObj) {
			$(inputObj).removeClass('error');
			return;
		},
		
		validateTextInput: function(inputObj) {
			// if field has less than 3 chars flag error
			if($(inputObj).val().length == 0) {
				validate.setErrorInput(inputObj);
				return false;
			} else {
				validate.clearErrorInput(inputObj);
				return true;		
			}
		},
		
		validateIPAddress: function(inputObj) {
//			$(inputID).on("focusout", function() {
			var validate_status;
			var entered_ip = $(inputObj).val();
			if (entered_ip) {
				/*
				split the resulted string by "." character
				through the jquery split method and
				save the splited values into an array
				*/
				var ip_fields_array = entered_ip.split(".");
				/* ... */
				/* store the length of the array */
				var array_length = ip_fields_array.length;
				
				// if length != 4 then fail
				if( array_length != 4 ) {
					validate_status = false;
				}
				
				// is syntax correct?
				validate_status = /\b(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\b/.test(entered_ip);
			} else {
				validate_status = false;
			}
			
			if( validate_status ) {
				validate.clearErrorInput(inputObj);
			} else {
				validate.setErrorInput(inputObj);
			}
			
			return validate_status;
		},
		
		validateIPAddresses: function() {
			var validSergerIP = validate.validateIPAddress('#WGC_0_sergerIP');
			var validROSIP = validate.validateIPAddress('#WGC_0_rosIP')
			if ( !validSergerIP || !validROSIP ) {
				alert("Please correct invalid IP syntax.");
				return false;
			} else {
				return true;
			}
		},
		
		validateContactTextInput: function(inputObj) {
			// if field has less than 3 chars flag error
			if($(inputObj).val().length <= 2) {
				validate.setErrorInput(inputObj);
				return false;
			} else {
				validate.clearErrorInput(inputObj);
				return true;		
			}
		},
		
		validateIntegerInput: function(textObj) {
			var er = /^-?[0-9]+$/;
			if($(textObj).val() <= 0) {
				validate.setErrorInput(textObj);
				return false;
			} else if(er.test($(textObj).val()) === true) {
				validate.clearErrorInput(textObj);
				return true;
			} else {
				validate.setErrorInput(textObj);
				return false;		
			}
		},

		validatePasswordInput: function(passwordObj, passwordVerifyObj, recordID) {
			if($(passwordObj).val() == '' && $(passwordVerifyObj).val() == '' && recordID == 1) {
				validate.setErrorInput(passwordObj);
				validate.setErrorInput(passwordVerifyObj);
				return false;				
			} else if($(passwordObj).val() == '' && $(passwordVerifyObj).val() == '') {
				validate.clearErrorInput(passwordObj);
				validate.clearErrorInput(passwordVerifyObj);
				return true;		
			}
			if($(passwordObj).val() != '' && ($(passwordVerifyObj).val() == $(passwordObj).val())) {
				// verify length
				if($(passwordObj).val().length >= 6) {
					validate.clearErrorInput(passwordObj);
					validate.clearErrorInput(passwordVerifyObj);
					return true;		
				} 
			} else {
				validate.setErrorInput(passwordObj);
				validate.setErrorInput(passwordVerifyObj);
				return false;		
			}
		},
		
		validateDecInput: function(textObj) {
			var testNum = parseFloat($(textObj).val()).toFixed(2);
			if(testNum == 'NaN' || testNum <= 0.0) {
				validate.setTextErrorInput(textObj);
				return false;
			} else if(testNum != $(textObj).val()) {
				validate.setTextErrorInput(textObj);
				return false;
			} else {
				validate.clearTextErrorInput(textObj);
				return true;
			}
		},
		
		validateTextAreaInput: function(inputObj) {
			// if field still has default and is required then flag error
			if($(inputObj).val() == '') {
				validate.setErrorInput(inputObj);
				return false;
			} else {
				validate.clearErrorInput(inputObj);
				return true;		
			}
		},
		
		validateEmailInput: function(emailObj){
			var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;  
			if(!emailPattern.test($(emailObj).val())) {
				validate.setErrorInput(emailObj);
				return false;
			} else {
				validate.clearErrorInput(emailObj);
				return true;
			} 
		},
		
		validateSelect: function(selectObj) {
			if($(selectObj).children('option:selected').val() == '1') {
				validate.setErrorInput(selectObj);
				return false;
			} else {				
				validate.clearErrorInput(selectObj);
				return true;
			}
		},
		
		serializeForm: function(formObj) {
			// serialize form and send in JSON
			var $this = $(formObj)
				, viewArr = $this.serializeArray()
				, view = {};

			for (var i in viewArr) {
				view[viewArr[i].name] = viewArr[i].value;
			}
			return JSON.stringify(view);
		}
	
	}
	

	

