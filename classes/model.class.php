<?php

	class modelClass {
				
		// define required fields from queries
		private static $audienceTableDescriptor = array(
			'audienceId' => array('', 'id'),
			'audienceName' => array('required', 'text')
		);
		
		private static $bblockTableDescriptor = array(
			'bblockId' => array('', 'id'),
			'bblockUsage' => array('optional', 'text'),
			'bblockBblockTypeId' => array('required', 'int'),
			'bblockEventTypeId' => array('required', 'int'),
			'bblockActivityTypeId' => array('required', 'int'),
			'bblockParentBblockId' => array('required', 'int'),
			'bblockActive' => array('required', 'checkbox:1:1:0'),
			'bblockTimeZone' => array('required', 'text'),
			'bblockStartDate' => array('required', 'text'),
			'bblockStartTimeStampUTC' => array('required', 'int'),
			'bblockStopDate' => array('required', 'text'),
			'bblockStopTimeStampUTC' => array('required', 'int'),
			'bblockDateInherited' => array('required', 'checkbox:1:1:0'),
			'bblockLocationInherited' => array('required', 'checkbox:1:1:0'),
			'bblockAnnounceOnCalendar' => array('required', 'checkbox:1:1:0'),
			'bblockTitle' => array('required', 'text'),
			'bblockDescription' => array('required', 'text'),
			'bblockDimacsSponsored' => array('required', 'checkbox:1:1:0'),
			'bblockCreated' => array('required', 'now'),
			'bblockModified' => array('required', 'now'),
			'bblockCreatedByUID' => array('required', 'int'),
			'bblockCreatedByName' => array('required', 'text'),
			'bblockSequencePrevBblockId' => array('required', 'int'),
			'bblockSequenceNextBblockId' => array('required', 'int'),
			'bblockSessionColor' => array('required', 'text'),			
			'bblockOpenTo' => array('required', 'text'),
			'bblockKeywords' => array('optional', 'text'),
			'bblockTravelLink' => array('optional', 'text'),			
			'bblockCallForParticipation' => array('optional', 'text'),
			'bblockGrant' => array('optional', 'text'),
			'bblockAdditionalInfo' => array('optional', 'text'),
			'bblockPresentationLink' => array('optional', 'text'),
			'bblockVideoLink' => array('optional', 'text'),
			'bblockRegistrationStatus' => array('optional', 'text'),
			'bblockRegistrationLink' => array('optional', 'text'),
			'bblockPlanning' => array('optional', 'checkbox:1:1:0'),
			'bblockDontLinkTitle' => array('optional', 'checkbox:1:1:0')
		);
		
		private static $locationTableDescriptor = array(
			'locationId' => array('', 'id'),
			'locationName' => array('required', 'text'),
			'locationInstitution' => array('optional', 'text'),
			'locationBuilding' => array('optional', 'text'),
			'locationAddress1' => array('optional', 'text'),
			'locationAddress2' => array('optional', 'text'),
			'locationAddress3' => array('optional', 'text'),
			'locationAddress4' => array('optional', 'text'),
			'locationDirections' => array('optional', 'text'),
			'locationMapURL' => array('optional', 'text'),
			'locationInactive' => array('optional', 'int' )
		);
				
		private static $presenterTableDescriptor = array(
			'presenterId' => array('', 'id'),
			'presenterName' => array('required', 'text'),
			'presenterTitle' => array('optional', 'text'),
			'presenterAffiliation' => array('optional', 'text'),
			'presenterEmail' => array('optional', 'email'),
			'presenterBio' => array('optional', 'text')
		);
		
		private static $peopleTableDescriptor = array(
			'peopleId' => array('', 'id'),
			'peopleFirstName' => array('required', 'text'),
			'peopleMiddleName' => array('optional', 'text'),
			'peopleLastName' => array('required', 'text'),
			'peopleSuffix' => array('optional', 'text'),
			'peopleTitle' => array('optional', 'text'),
			'peopleAffiliationID' => array('optional', 'int'),
			'peopleAddress1' => array('optional', 'text'),
			'peopleAddress2' => array('optional', 'text'),
			'peopleAddress3' => array('optional', 'text'),
			'peopleAddress4' => array('optional', 'text'),
			'peopleEmail' => array('optional', 'email'),
			'peoplePhone' => array('optional', 'text'),
			'peopleBio' => array('optional', 'text')
		);
		
		private static $programTableDescriptor = array(
			'programId' => array('', 'id'),
			'programName' => array('required', 'text'),
			'programURL' => array('optional', 'text'),
			'programCurrent' => array('required', 'checkbox:1:1:0')
		);
		
		private static $sponsorTableDescriptor = array(
			'sponsorId' => array('', 'id'),
			'sponsorName' => array('required', 'text'),
			'sponsorInstitution' => array('optional', 'text'),
			'sponsorAddress1' => array('optional', 'text'),
			'sponsorAddress2' => array('optional', 'text'),
			'sponsorAddress3' => array('optional', 'text'),
			'sponsorAddress4' => array('optional', 'text')
		);
		
		private static $activityTypeTableDescriptor = array(
			'activityTypeId' => array('', 'id'),
			'activityTypeName' => array('required', 'text')
		);
			
		private static $restrictionTableDescriptor = array(
			'restrictionId' => array('', 'id'),
			'restrictionName' => array('required', 'text')
		);
			
		private static $tableDescriptors = array(
			'audience' => array('audienceTableDescriptor', 'audienceId'),
			'location' => array('locationTableDescriptor', 'locationId'),
			'program' => array('programTableDescriptor', 'programId'),
			'sponsor' => array('sponsorTableDescriptor', 'sponsorId'),
			'restriction' => array('restrictionTableDescriptor', 'restrictionId'),
			'presenter' => array('presenterTableDescriptor', 'presenterId'),
			'activityType' => array('activityTypeTableDescriptor', 'activityTypeId'),
			'bblock' => array('bblockTableDescriptor', 'bblockId'),
			'people' => array('peopleTableDescriptor', 'peopleId')
		);
		
		function __construct() {

		}
		
		public static function getFieldList($tableHandle) {
			list($tableDescriptorName, $tableIndex) = self::getTableDescriptors($tableHandle);
			return self::$$tableDescriptorName;
		}
		
		// get descriptors for creating models
		private static function getTableDescriptors($tableName) {
			if(isset(self::$tableDescriptors[$tableName]) === FALSE) {
				die('Illegal table name in model class');
			}
			
			return self::$tableDescriptors[$tableName];
		}
		
		// get descriptors for fields
		static public function createUpdateQuery($tableName, $postArray) {
			list($tableDescriptorName, $tableIndex) = self::getTableDescriptors($tableName);
			$tableDescriptor = self::$$tableDescriptorName;
			$queryString = "UPDATE ".dbClass::cleanMySQLInput($tableName)." SET ";
			$queryString .= self::getQueryString($tableDescriptor, $postArray);
			$queryString .= " WHERE " . dbClass::cleanMySQLInput($tableIndex) . " = " . dbClass::cleanMySQLInput($postArray[$tableIndex]);
//FB::log($queryString);
			return $queryString;
		}
		
		// get descriptors for fields
		static public function createInsertQuery($tableName, $postArray) {
			list($tableDescriptorName, $tableIndex) = self::getTableDescriptors($tableName);
			$tableDescriptor = self::$$tableDescriptorName;
			$queryString = "INSERT INTO ".dbClass::cleanMySQLInput($tableName)." SET ";
			$queryString .= self::getQueryString($tableDescriptor, $postArray);
//FB::log($queryString);
			return $queryString;
		}	
		
		static public function createDeleteQuery($tableName, $tableId) {
			list($tableDescriptorName, $tableIndex) = self::getTableDescriptors($tableName);
			$tableDescriptor = self::$$tableDescriptorName;
			$queryString = "DELETE FROM ".dbClass::cleanMySQLInput($tableName);
			$queryString .= " WHERE " . dbClass::cleanMySQLInput($tableIndex) . " = " . dbClass::cleanMySQLInput($tableId);
//FB::log($queryString);
			return $queryString;
		}
		
		static private function getQueryString($tableDescriptor, $postArray, $update = FALSE) {
			$queryString = '';
			//FB::log($postArray );
			foreach($tableDescriptor as $fieldName => $fieldParameters) {
//FB::log($fieldName); 
				if( array_key_exists($fieldName, $postArray) === FALSE) {
//FB::log($fieldParameters);
					// checkbox not checked....insert unchecked value for DB
					if(( $update === FALSE ) && ( strpos($fieldParameters[1], 'checkbox') !== FALSE)) {
						// explode fields to get values
						$fieldType = explode(':', $fieldParameters[1]);
						$queryString .= "`".dbClass::cleanMySQLInput($fieldName)."` = " . $fieldType[3] . ", ";
					}
					continue;
				}
				if($fieldParameters[0] == 'required' || $fieldParameters[0] == 'optional') {
					$queryString .= "`".dbClass::cleanMySQLInput($fieldName)."` = ";
					switch ($fieldParameters[1]) {
						case 'id':
							$queryString .= dbClass::cleanMySQLInput($postArray[$fieldName]).', ';
							break;
						case 'int':
							$queryString .= dbClass::cleanMySQLInput($postArray[$fieldName]).', ';
							break;
						case 'email':
							$queryString .= "'" . dbClass::cleanMySQLInput($postArray[$fieldName])."', ";
							break;
						case 'text':
							$queryString .= "'".dbClass::cleanMySQLInput($postArray[$fieldName])."', ";
							break;
						case 'sha256':
							$queryString .= "'".hash("sha256", dbClass::cleanMySQLInput($postArray[$fieldName]))."', ";
							break;
						case 'now':
							$queryString .= "NOW(), ";
							break;
						default:
							$fieldType = explode(':', $fieldParameters[1]);
							if($fieldType[0] == 'const') {
								$queryString .= $fieldType[1].", ";
							} else if($fieldType[0] == 'checkbox') { // format: 'checkbox:valueIfChecked:valueIfCheckedForDB:valueIfNotCheckedForDB'
								$queryString .= (isset($postArray[$fieldName]) == true 
												&& $postArray[$fieldName] == $fieldType[1]) 
													? $fieldType[2].', ' 
													: $fieldType[3].', ';				
							} else if($fieldType[0] == 'float') { // format: 'float:x' where x = number of decimal places
								$queryString .= number_format(dbClass::cleanMySQLInput($postArray[$fieldName]), $fieldType[1], ".", "").', ';
							}
							break;
					}
				}
			}
			// last comma
			return substr($queryString, 0, -2);
		}
		
		// validate data
		// cycle through field list from table descriptor and validate data
		// This does not sanitize data...only validates server side
		static public function validateData($tableName, $dataArray, $validateDebug = FALSE) {
			$dataValid = TRUE;
			
			// get field list
			$fieldList = self::getFieldList($tableName);
			if(count($fieldList) == 0) {
				return FALSE;
			}
			
			foreach($fieldList as $fieldName => $fieldParameters) {
				// deal with required data
				if($fieldParameters[0] == 'required' || ($fieldParameters[0] == 'optional' && $dataArray[$fieldName] != '')) {
					switch ($fieldParameters[1]) {
						case 'email':
							$dataValid = (filter_var($dataArray[$fieldName], FILTER_VALIDATE_EMAIL) !== FALSE) ? $dataValid : FALSE;							
							break;
						case 'id':
							$dataValid = (filter_var($dataArray[$fieldName], FILTER_VALIDATE_INT, array('min_range' => 1)) !== FALSE) ? $dataValid : FALSE;							
							break;
						case 'int':
							$dataValid = (filter_var($dataArray[$fieldName], FILTER_VALIDATE_INT) !== FALSE) ? $dataValid : FALSE;							
							break;
						case 'text':
							$dataValid = ($dataArray[$fieldName] != '') ? $dataValid : FALSE;
							break;
						case 'sha256':
							$dataValid = ($dataArray[$fieldName] != '') ? $dataValid : FALSE;
							break;
						default:
							break;
					}

				}
				if($validateDebug == TRUE) {
					FB::log('---------');
					FB::log($fieldName);
					FB::log($dataValid);
				}
			}
			// last comma
			return $dataValid;
		}

		
	}
?>