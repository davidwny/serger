var config = {
		
	config: {
		WGC_0: {
			rosIP: '',
			sergerIP: ''
		}
	}, 
	
	getConfigFromFile: function() {
		$.ajax({
			url: BROWSER_AJAX + 'getConfigFromFile.php',
			type: 'post',
			dataType: 'json',
			async: false,
			success: function(response) {
				if( response.status == AJAX_STATUS_OK) {
					// WGC_0 only at this time
					localStorage.WGC_0_rosIP = response.config.WGC_0.rosIP;
					localStorage.WGC_0_sergerIP = response.config.WGC_0.sergerIP;
				}
			}
		});
	},
	
	writeConfigToFile: function() {
		$.ajax({
			url: BROWSER_AJAX + 'writeConfigToFile.php',
			type: 'post',
			dataType: 'json',
			data: { wgc: 'WGC_0', sergerIP: $('#WGC_0_sergerIP').val(), rosIP: $('#WGC_0_rosIP').val() },
			async: false,
			success: function(response) {
				if( response.status == AJAX_STATUS_OK) {
					// WGC_0 only at this time
					localStorage.WGC_0_rosIP = response.config.WGC_0.rosIP;
					localStorage.WGC_0_sergerIP = response.config.WGC_0.sergerIP;
				}
			}
		});
	}	
}