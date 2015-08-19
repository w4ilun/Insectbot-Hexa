var bluetoothle;

angular.module('yeomanApp')
.controller('MainCtrl', function ($scope) {

	navigator.notification.alert(
	    'You are the winner!',  // message
	    function(){},         // callback
	    'Game Over',            // title
	    'Done'                  // buttonName
	);

	$scope.device = {
		address: "Unknown address",
		name: "Unknown name"
	}

	/* BLE Init */
	document.addEventListener("deviceready", onDeviceReady, false);

	function onDeviceReady(){
		bluetoothle.initialize(initializeSuccess, initializeError, {request:true});
	}

	function initializeSuccess(obj){
		if (obj.status == "enabled"){
			bluetoothle.enable(enableSuccess, enableError);
		}
	}

	function enableSuccess(){
		if (obj.status == "enabled"){
			scan();
		}
	}

	function scan(){
		bluetoothle.startScan(startScanSuccess, startScanError,{serviceUuids:[]});
	}

	function startScanSuccess(obj){
		if (obj.status == "scanResult"){
			console.log("Scan Result");
			$scope.device = {
				address: obj.address,
				name: obj.name
			}
		}
		else if (obj.status == "scanStarted"){
			console.log("Scan Started");
		}
		else{
			console.log("Unexpected Start Scan Status");
		}
	}

	function initializeError(obj){
		console.log("Initialize Error");
	}
	
	function enableError(){
		console.log("Enable Error");
	}

	function startScanError(){
		console.log("Scan Error");
	}	

	/* Controller */
	$scope.move = move;

	function move(direction){
		console.log(direction);
	}
  
});
