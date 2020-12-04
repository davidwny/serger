<?php
	require_once('init.php');
	
//	echo errorLogClass::insertErrorRecord( '91', '12345', '1234', 1, "Serger", "This is a test" );
//	echo "<pre>";
//	echo print_r(errorLogClass::getErrorRecords( "Serger", "ASC" )) . "</pre>";

?>
<!DOCTYPE html>
<html>
	<head>
		<title>Serger Control Panel</title>
		
		<link rel="stylesheet" href="<?= BROWSER_CSS; ?>common.css">
		<link rel="stylesheet" href="<?= BROWSER_CSS; ?>modal.css">

		<?php require_once( SERVER_INCLUDES . 'defineToJS.php' ); ?>
		<script src="<?= BROWSER_JS; ?>jQuery.js"></script>
		<script src="<?= BROWSER_JS; ?>dayjs.min.js"></script>
		<script src="<?= BROWSER_JS; ?>dateTime.js"></script>
		<script src="<?= BROWSER_JS; ?>screens.js"></script>
		<script src="<?= BROWSER_JS; ?>modal.js"></script>
		<script src="<?= BROWSER_JS; ?>validation.js"></script>
		<script src="<?= BROWSER_JS; ?>config.js"></script>
		<script src="<?= BROWSER_JS; ?>maint.js"></script>

		<script>
			var audioClick = {}; 
			
			$(document).ready(function() {
				dateTime.init();
				screens.init();
				
				
				
				// init config array
				config.getConfigFromFile();
				
				audioClick = document.getElementById("button-sound"); 
console.dir(sessionStorage);
			});
		</script>
	</head>

	<body>
		<div id="site-wrapper">
			<div id="header">
				<p id="header-title">Robotic Serger Control Panel</p>
				<p id="header-status-title">Status:</p>
				<p id="header-status">Bundle Scanned</p>
				<img id="button-maintenance" src="<?= BROWSER_IMAGES; ?>maintenance.png" onclick="modal.showMaintModalLogin()">
			</div>
			<div id="button-row">
				<div class="button-holder button-1">
					<img class="button" src="<?= BROWSER_IMAGES; ?>scanbundle.png">
					<h2>Scan Bundle</h2>
				</div>
				<div class="button-holder button-2">
					<img class="button" src="<?= BROWSER_IMAGES; ?>error.png">
					<h2>Error</h2>
				</div>
				<div class="button-holder button-3">
					<img class="button" src="<?= BROWSER_IMAGES; ?>offstandard.png">
					<h2>Off Standard</h2>
				</div>
				<div class="button-holder button-4">
					<img class="button" src="<?= BROWSER_IMAGES; ?>clockinout.png">
					<h2>Clock Out</h2>
				</div>
			</div>
			<div id="bundle-status">
				<div class="bundle-status-wrapper" id="cut-no">
					<p>Cut #:</p>
					<input value="Cut #" readonly>
				</div>
				<div class="bundle-status-wrapper" id="sku">
					<p>SKU:</p>
					<input value="Size/Color/Fabric" readonly>
				</div>
				<div class="bundle-status-wrapper" id="style">
					<p>Style:</p>
					<input value="Lot #" readonly>
				</div>
				<div class="bundle-status-wrapper" id="description">
					<input value="Lot Description" readonly>
				</div>
				<div class="bundle-status-wrapper" id="bundle-no">
					<p>Bundle #:</p>
					<input value="#" readonly>
				</div>
			</div>
			<div id="plies">
				<img src="./diagrams/34_back.png">
				<div id="plies-status">
					<div id="plies-status-left">
						<div class="plies-status-wrapper" id="plies-no">
							<p>Total Plies:</p>
							<input value="#" readonly>
						</div>
						<div class="plies-status-wrapper" id="seams">
							<p>Seams:</p>
							<input value="Seams to serge" readonly>
						</div>
						<div class="plies-status-wrapper" id="pay-rate">
							<p>Pay Rate ($):</p>
							<input value="100.00" readonly>
						</div>
					</div>
					<div id="plies-status-right">
						<div class="plies-status-wrapper" id="plies-serged">
							<p>Plies Serged:</p>
							<input value="#" readonly>
						</div>
						<div class="plies-status-wrapper" id="current-seam">
							<p>Current:</p>
							<input value="Seam" readonly>
						</div>
						<div class="plies-status-wrapper" id="efficiency">
							<p>Efficiency (%):</p>
							<input value="100.00" readonly>
						</div>
					</div>
				</div>

			</div>
			<div id="operator-status-wrapper">
				<div id="operator-status">
					<div class="operator-status-field operator-name">
						<p>Operator Name</p>
						<input id="operator-name" value="Operator Name" readonly>
					</div>
					<div class="operator-status-field operator-time">
						<p>Login Time</p>
						<input id="login-time" value="12:01:00 PM" readonly>
					</div>
					<div class="operator-status-field operator-time">
						<p>Login Duration</p>
						<input id="duration" value="00:00:00" readonly>
					</div>
					<div class="operator-status-field operator-time">
						<p>Current Time</p>
						<input id="current-time" value="1:00:01 PM" readonly>
					</div>
					<div class="clearer"></div>
				</div>
			</div>
		</div>
		<div class="clearer"></div>
		
		<div id="modal">
			<div class="container">
				<div id="modal-content">
				</div>
				<a class="close_modal" href="javascript: void(2);">
					<img src="<?= BROWSER_IMAGES; ?>x.png" alt="Close Modal">
				</a>
			</div>
		</div>
		<audio id="button-sound"><source src="<?= BROWSER_IMAGES; ?>buttonClickShort.mp3" type="audio/mp3"></audio>
	</body>
</html> 