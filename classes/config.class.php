<?php

	class configClass {
				
		private static $defaultWGC = 'WGC_0';
		
		public static $currentWGC = '';
		
		private static $wgcArray = array('WGC_0', 'WGC_1', 'WGC_2', 'WGC_3');
		
		public static $configArray = array(
			'WGC_0' => array(
				'rosIP' => '',
				'sergerIP' => ''
			),
			'WGC_1' => array(
				'rosIP' => '',
				'sergerIP' => ''
			),
			'WGC_2' => array(
				'rosIP' => '',
				'sergerIP' => ''
			),
			'WGC_3' => array(
				'rosIP' => '',
				'sergerIP' => ''
			)
		);
		
		// getters
		public static function getCurrentWGC() {
			if( self::$currentWGC == '' ) {
				self::$currentWGC = self::$defaultWGC;
			}
			return self::$currentWGC;
		}
		
		public static function getRosIP( $wgc ) {
			return self::$configArray[ $wgc ][ 'rosIP' ];
		} 
		
		public static function getSergerIP( $wgc ) {
			return self::$configArray[ $wgc ][ 'sergerIP' ];
		}
		
		public static function getConfigFromFile() {
			// does config file exists?
			if( !file_exists( SERVER_CONFIG_FILE ) ) {
				return FALSE;
			}
			
			// parse ini file into associative array
			$configArray = parse_ini_file( SERVER_CONFIG . 'config.ini', true);
			
			// get current work group controller setup and set values
			foreach( self::$wgcArray as $key => $wgc) {
				if( isset($configArray[$wgc]) ) {
					if( isset($configArray[$wgc]['rosIP']) ) {
						self::setRosIP( $wgc, $configArray[$wgc]['rosIP'] );
					}					

					if( isset($configArray[$wgc]['sergerIP']) ) {
						self::setSergerIP( $wgc, $configArray[$wgc]['sergerIP'] );
					}
				}
			}
			return $configArray;
		}
		
		// setters
		public static function setCurrentWGC( $newWGC = '' ) {
			if( $newWGC == '' ) {
				$newWGC = self::$defaultWGC;
			}
			self::$currentWGC = $newWGC;
			return;
		}
		
		public static function setRosIP( $wgc, $ipAddress ) {
			if( filter_var( $ipAddress, FILTER_VALIDATE_IP ) ) {
				self::$configArray[ $wgc ][ 'rosIP' ] = $ipAddress;
				return TRUE;
			} else {
				return FALSE;
			}
		}

		public static function setSergerIP( $wgc, $ipAddress ) {
			if( filter_var( $ipAddress, FILTER_VALIDATE_IP ) ) {
				self::$configArray[ $wgc ][ 'sergerIP' ] = $ipAddress;
				return TRUE;
			} else {
				return FALSE;
			}
		}
	}
	
	function put_ini_file( $file, $configArray, $i = 0 ){
		$i = 0;
		$str = "";
		foreach ($configArray as $k => $v){
			if (is_array($v)){
				$str .= str_repeat(" ",$i*2)."[$k]".PHP_EOL;
				$str .= put_ini_file("",$v, $i+1);
			} else
				$str.=str_repeat(" ",$i*2)."$k = $v".PHP_EOL;
		}
		if( $file )
			return file_put_contents( $file , $str);
		else
			return $str;
	}

?>