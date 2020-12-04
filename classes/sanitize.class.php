<?php

	class sanitize {
	
		// sanitize functions
		public static function valuesFromPost($varName) {
			$connection = dbClass::dbConnect(DEFAULT_DB_SELECT);
			$tempString = "";

			if(isset($_POST[$varName])){
				$tempString = mysqli_real_escape_string($connection, $_POST[$varName]);
			} else {
				$tempString = "";
			}
			dbClass::dbClose($connection);
			return $tempString;
		}
		
		public static function valuesFromGet($varName) {
			$connection = dbClass::dbConnect(DEFAULT_DB_SELECT);
			$tempString = "";

			if(isset($_GET[$varName])){
				$tempString = mysqli_real_escape_string($connection, $_GET[$varName]);
			} else {
				$tempString = "";
			}
			dbClass::dbClose($connection);
			return $tempString;
		}
		
		public static function valuesFromSession($varName) {
			$connection = dbClass::dbConnect(DEFAULT_DB_SELECT);
			$tempString = "";

			if(isset($_SESSION[$varName])){
				$tempString = mysqli_real_escape_string($connection, $_SESSION[$varName]);
			} else {
				$tempString = "";
			}
			dbClass::dbClose($connection);
			return $tempString;
		}		
		
		public static function cleanMySQLInput($instring) {
			$connection = dbClass::dbConnect(DEFAULT_DB_SELECT);
			$outstring = str_replace('`', '\`', $instring);
			$returnString =  mysqli_real_escape_string($connection, $outstring);
			dbClass::dbClose($connection);			
			return $returnString;
		}
		
		public static function cleanOutput($instring, $mode="normal") {
			switch ($mode)
			{
				case "html":
					return html_entity_decode(stripslashes($instring));
					break;

				case "java":
					// javascript chokes on certain characters:
					$out = htmlentities(stripslashes($instring));
					$out = str_replace("\\","\\\\", $out);
					$out = str_replace("'","\'", $out);
					$out = str_replace("\n","\\n", $out);
					$out = str_replace("\r","\\r", $out);

					return $out;
					break;

				default:
				{
					$out = htmlentities(stripslashes($instring));
					//$out = str_replace("'","&apos;",$out);
					return $out;
				}
			}
		}
		
		public static function isIndex($input) {
			$options = array("options"=>array("min_range" => 1));
			if(filter_var($input, FILTER_VALIDATE_INT, $options) === FALSE) {
				return FALSE;
			} else {
				return TRUE;
			}
		} 
		
		public static function isInt($input) {
			if(filter_var($input, FILTER_VALIDATE_INT) === FALSE) {
				return FALSE;
			} else {
				return TRUE;
			}
		}
		
		public static function isDigits($input) {
			if(filter_var($input, FILTER_SANITIZE_NUMBER_INT) === FALSE) {
				return FALSE;
			} else {
				return TRUE;
			}
		}
	}
?>