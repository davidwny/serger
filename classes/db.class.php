<?php

	class dbClass {		
		private static $connection;
		
		private $connection2;
		
		private static $dbParams = array(
									'ipro' => array(
											'dbHost' => 'localhost',
											'dbUser' => 'itowndes_wgc',
											'dbPswd' => 'pwd4-ipro',
											'dbName' => 'itowndes_wgc'
										)
									);
		
		function __construct() {
			
		}

		
		public static function dbConnect($dbSelect = DEFAULT_DB_SELECT) {
//FB::log(self::$dbParams);
			$dbHost = self::$dbParams[$dbSelect]['dbHost'];
			$dbUser = self::$dbParams[$dbSelect]['dbUser'];
			$dbPswd = self::$dbParams[$dbSelect]['dbPswd'];
			$dbName = self::$dbParams[$dbSelect]['dbName'];
			
			//$err_level = error_reporting(0);  
			$connection = mysqli_connect($dbHost, $dbUser, $dbPswd) or self::dbError('Logon database failed '.$dbHost.' '.$dbUser.' '.$dbName, DEBUG);
			$status = mysqli_select_db($connection, $dbName) or self::dbError('Could not find database '.$dbName, $connection, DEBUG);
			//error_reporting($err_level); 
			if($status == TRUE) {
				return $connection;
			} else {
				self::dbClose($connection);
				return FALSE;
			}
		}
		
		public static function dbClose($connection) {
			mysqli_close($connection);
		}
		
		public static function dbSelectQuery($queryString, $passedConnection = '', $dbSelect = DEFAULT_DB_SELECT) {
			if($passedConnection == '') {
				$connection = self::dbConnect($dbSelect);
			} else {
				$connection = $passedConnection;
			}
			$result = mysqli_query($connection, $queryString) or self::dbError($queryString, $connection, DEBUG);
			if($result == FALSE) {
				self::dbClose($connection);
				return FALSE;
			}
			$resultArray = array();
			while($row = self::dbGetRowAssocClean($result)) {
				$resultArray[] = $row;
			}
			if($passedConnection == '') {
				self::dbClose($connection);
			}
			return $resultArray;
		}
		
		public static function dbStartTransaction($passedConnection = '', $dbSelect = DEFAULT_DB_SELECT) {
			if($passedConnection == '') {
				$connection = self::dbConnect($dbSelect);
			} else {
				$connection = $passedConnection;
			}
			$result = mysqli_query($connection, "START TRANSACTION") or self::dbError($queryString, $connection, DEBUG);
			if($passedConnection == '') {
				self::dbClose($connection);
				}
			return $result;
		}
		
		public static function dbCommitTransaction($passedConnection = '', $dbSelect = DEFAULT_DB_SELECT) {
			if($passedConnection == '') {
				$connection = self::dbConnect($dbSelect);
			} else {
				$connection = $passedConnection;
			}
			$result = mysqli_commit($connection) or self::dbError($queryString, $connection, DEBUG);
			return $result;
		}
		
		public static function dbRollBackTransaction($passedConnection = '', $dbSelect = DEFAULT_DB_SELECT) {
			if($passedConnection == '') {
				$connection = self::dbConnect($dbSelect);
			} else {
				$connection = $passedConnection;
			}
			$result = mysqli_rollback($connection) or self::dbError($queryString, DEBUG);
			return $result;
		}
		
		public static function dbUpdateQuery($queryString, $passedConnection = '', $dbSelect = DEFAULT_DB_SELECT) {
			if($passedConnection == '') {
				$connection = self::dbConnect($dbSelect);
			} else {
				$connection = $passedConnection;
			}
			$result = mysqli_query($connection, $queryString) or self::dbError($queryString, $connection, DEBUG);
			if($result == FALSE) {
				self::dbClose($connection);
				return FALSE;
			}
			
			if($passedConnection == '') {
				self::dbClose($connection);
			}
			return $result;
		}
		
		// return TRUE for successful result
		public static function dbDeleteQuery($queryString, $passedConnection = '', $dbSelect = DEFAULT_DB_SELECT) {
			if($passedConnection == '') {
				$connection = self::dbConnect($dbSelect);
			} else {
				$connection = $passedConnection;
			}
			$result = mysqli_query($connection, $queryString) or self::dbError($queryString, $connection, DEBUG);
			if($result == FALSE) {
				self::dbClose($connection);
				return FALSE;
			}
			
			if($passedConnection == '') {
				self::dbClose($connection);
			}
			return $result;
		}

		public static function dbInsertQuery($queryString, $passedConnection = '', $dbSelect = DEFAULT_DB_SELECT) {
			if($passedConnection == '') {
				$connection = self::dbConnect($dbSelect);
			} else {
				$connection = $passedConnection;
			}
			$result = mysqli_query($connection, $queryString) or self::dbError($queryString, $connection, DEBUG);
			if($result == FALSE) {
				self::dbClose($connection);
				return FALSE;
			}
			
			$newIndex = mysqli_insert_id($connection);
			if($passedConnection == '') {
				self::dbClose($connection);
			}
			return $newIndex;
		}

		public static function dbGetRowAssocClean($result) {
			$row = mysqli_fetch_assoc($result);
            if(!$row) {
                return '';
            }
            
            // clean row for output
            $cleanRow = array();
            foreach($row as $key => $value) {
                $cleanRow[$key] = sanitize::cleanOutput($row[$key]);
            }            
			return $cleanRow;
		}
		
		public static function dbResetPointer($resource) {
			$result = mysqli_data_seek($resource, 0) or $this->dbErrorNoConnection('Error in dbResetPointer', DEBUG);
			return $result;
		}	
				
		public static function dbError($query="db error", $connection, $mode="debug") {
			if ($mode == "debug") {
				die($query.": ".mysqli_error($connection));
			} else {
				// if this happens in production mode, try not to die()... but definitely log the error:
		
				$report = "\n-------------------------------------------------------------------\n";
				$report .= date("F j, Y, g:i a")."\n";
				$report .= "Page: ".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."\n";
				$report .= "Error: ". $query .": ".mysql_error()."\n";
				$report .= "User IP: ".$_SERVER['REMOTE_ADDR']."\n";
		
				if (defined("ServerLogs")) {
					$log_file_name = ServerLogs.'database_errors.txt';
					$handle = fopen($log_file_name, "a+");
					if ($handle) {
						fwrite($handle, $report);
						fclose($handle);
					}
				}
			}
		}
		public static function dbErrorNoConnection($query="db error", $mode="debug") {
			if ($mode == "debug") {
				die($query );
			} else {
				// if this happens in production mode, try not to die()... but definitely log the error:
		
				$report = "\n-------------------------------------------------------------------\n";
				$report .= date("F j, Y, g:i a")."\n";
				$report .= "Page: ".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']."\n";
				$report .= "Error: ". $query .": ".mysql_error()."\n";
				$report .= "User IP: ".$_SERVER['REMOTE_ADDR']."\n";
		
				if (defined("ServerLogs")) {
					$log_file_name = ServerLogs.'database_errors.txt';
					$handle = fopen($log_file_name, "a+");
					if ($handle) {
						fwrite($handle, $report);
						fclose($handle);
					}
				}
			}
		} 
	}
?>