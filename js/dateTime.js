var dateTime = {

	current: '',
	
	loginTimeDate: {},
	loginTimeDateString: '',

	maintLoginTimeDate: {},
	maintLoginTimeDateString: '',
	duration: 0,

	init: function() {
		setInterval(function() {
			this.current = dayjs().format('h:mm:ss A');
			$('#current-time').val( this.current );
			
			// calculate duration
			
			if( typeof sessionStorage.maint != 'undefined' && sessionStorage.maint == 1 ) {
				dateTime.duration = ( new Date().getTime() - dateTime.maintLoginTimeDate.getTime() );					
				$('#duration').val( dateTime.msToTime( dateTime.duration ) );
			} else if( screens.currentStatus != OFF ) {
				dateTime.duration = ( new Date().getTime() - dateTime.loginTimeDate.getTime() );
				$('#duration').val( dateTime.msToTime( dateTime.duration ) );
			}
		}, 1000);
	},
	
	msToTime: function(duration) {
		var milliseconds = parseInt((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds;
	},
	
	setLoginTimeDateString: function( twelveHour ) {
		if( typeof sessionStorage.loginDateMilliSec != 'undefined') {
			this.loginTimeDate = new Date( parseInt( sessionStorage.loginDateMilliSec ) );
		} else {
			this.loginTimeDate = new Date();
			sessionStorage.loginDateMilliSec = this.loginTimeDate.getTime();
		}
		
		if( twelveHour == true) {
			this.loginTimeDateString = dayjs(this.loginTimeDate.getTime()).format( 'hh:mm:ss A' )
		} else {
			this.loginTimeDateString = dayjs(this.loginTimeDate.getTime()).format( 'HH:mm:ss' )
		}
		
		$('#login-time').val( this.loginTimeDateString );
	},

	setMaintLoginTimeDateString: function( twelveHour ) {
		if( typeof sessionStorage.maintLoginDateMilliSec != 'undefined') {
			this.maintLoginTimeDate = new Date( parseInt( sessionStorage.maintLoginDateMilliSec ) );
		} else {
			this.maintLoginTimeDate = new Date();
			sessionStorage.maintLoginDateMilliSec = this.maintLoginTimeDate.getTime();
		}
		
		if( twelveHour == true) {
			this.maintLoginTimeDateString = dayjs(this.maintLoginTimeDate.getTime()).format( 'hh:mm:ss A' )
		} else {
			this.maintLoginTimeDateString = dayjs(this.maintLoginTimeDate.getTime()).format( 'HH:mm:ss' )
		}
		
		$('#login-time').val( this.maintLoginTimeDateString );
	}

}