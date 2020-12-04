<?php
	class errorClass {
	
		static public function logTransactionError($errorMessage, $errorData) {
			FB::log($errorMessage);
			error_log(date('[Y-m-d H:i e] '). ": " . $errorMessage . PHP_EOL, 3, TRANSACTION_ERROR_LOG_FILE);
			error_log(date('[Y-m-d H:i e] '). ": " . $errorData . PHP_EOL, 3, TRANSACTION_ERROR_LOG_FILE);
			error_log("------------------------" . PHP_EOL, 3, TRANSACTION_ERROR_LOG_FILE);
		}
	}
?>
