<?php

	class errorLogClass {
		
		function __construct() {
			
		}
		
		public static function insertErrorRecord( $factoryID, $bundleNum, $orderNum, $operatorID, $errorSource, $errorMessage ) {
			// sanitize the operator ID which is an index
			if( !sanitize::isIndex( $operatorID ) ) {
				return FALSE;
			}
			
			$index = dbClass::dbInsertQuery("
				INSERT INTO ErrorLog
					SET ErrorLogFactoryID = '" . sanitize::cleanMySQLInput( $factoryID ) . "',
						ErrorLogOperatorID = $operatorID,
						ErrorLogBundleNum = '" . sanitize::cleanMySQLInput( $bundleNum ) . "',
						ErrorLogOrderNum = '" . sanitize::cleanMySQLInput( $orderNum ) . "',
						ErrorLogErrorSource = '" . sanitize::cleanMySQLInput( $errorSource ) . "',
						ErrorLogMessage = '" . sanitize::cleanMySQLInput( $errorMessage ) . "'
			");
			
			return $index;
		}

		public static function getErrorRecords( $errorSource, $dir="DESC" ) {
			$errorRows = dbClass::dbSelectQuery("
				SELECT * FROM ErrorLog
				WHERE ErrorLogErrorSource = '" . sanitize::cleanMySQLInput( $errorSource ) . "'
				ORDER BY ErrorLogTimeStamp " . sanitize::cleanMySQLInput( $dir )
			);
			
			return $errorRows;
		}
		
		public static function getErrorRecordsWithName( $errorSource, $dir="DESC" ) {
			$errorRows = dbClass::dbSelectQuery("
				SELECT EL.*, usermaster.fname, usermaster.lname FROM `ErrorLog` AS EL 
				JOIN usermaster ON EL.ErrorLogOperatorID = usermaster.id AND 
				EL.ErrorLogErrorSource = '" . sanitize::cleanMySQLInput( $errorSource ) . "'
				ORDER BY EL.ErrorLogTimeStamp " . sanitize::cleanMySQLInput( $dir )
			);
			return $errorRows;
		}
	}
	
//SELECT EL.*, usermaster.fname, usermaster.lname FROM `ErrorLog` AS EL JOIN usermaster ON EL.ErrorLogOperatorID = usermaster.id 
?>