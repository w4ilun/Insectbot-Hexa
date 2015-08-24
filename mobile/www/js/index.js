var controller = (function(){
  
  var blunoAddress; //mac address of Bluno
  var blunoServiceUUID = 'dfb0'; //serial service as reported on Android
  var blunoCharacteristicUUID = 'dfb1'; //serial characteristic as reported on Android

  function init(){
    document.addEventListener('deviceready', onDeviceReady, false);
  }  

  function onDeviceReady(){
    //bind DOM to events
    var joystickElements = document.getElementsByClassName('joystick');
    Array.prototype.forEach.call(joystickElements,function(joystickElement){
      joystickElement.addEventListener('click',function(event){
        var direction = event.target.id;
        command(direction);
      },false);
    });
    //init bluetooth
    bluetoothle.initialize(initializeSuccess, errorHandler, {request:true});
  }

  function initializeSuccess(obj){
    if (obj.status == "enabled"){
      scanDevices();
    }else{
      bluetoothle.enable(function(obj){
        if(obj.status == "enabled"){
          scanDevices();
        }
      }, errorHandler);
    }
  }

  function scanDevices(){
    bluetoothle.startScan(startScanSuccess, errorHandler,{serviceUuids:[]});
  }

  function startScanSuccess(obj){
    if(obj.status == "scanResult" && obj.name == "Bluno"){
      bluetoothle.stopScan(); //stop scan after device is found
      blunoAddress = obj.address;
      bluetoothle.connect(connectSuccess, errorHandler, {address:blunoAddress});
    }
    else if(obj.status == "scanStarted"){
      console.log("Scan Started");
    }
    else{
      errorHandler();
    }  
  }

  function connectSuccess(obj){
    if(obj.status == "connected"){
      document.getElementsByClassName('connection-status')[0].innerHTML = "Connected";
      bluetoothle.discover(discoverSuccess, errorHandler, {address:blunoAddress});
    }
  }

  function discoverSuccess(obj){
    if(obj.status == "discovered"){
      document.getElementsByClassName('discovery-status')[0].innerHTML = "Discovered";
    }     
  }

  function command(direction){
    //commands to Bluno based on direction
    switch(direction){
      case 'forward':
        writeToBlunoSerial("#W#");
        break;
      case 'backward':
        writeToBlunoSerial("#S#");
        break;
      case 'left':
        writeToBlunoSerial("#A#");
        break;
      case 'right':
        writeToBlunoSerial("#D#");
        break;
      default:
        errorHandler();
    }
  }

  function writeToBlunoSerial(value){
    var encodedString = bluetoothle.bytesToEncodedString(bluetoothle.stringToBytes(value));
    var params = {
      address: blunoAddress,
      value: encodedString,
      serviceUuid: blunoServiceUUID,
      characteristicUuid: blunoCharacteristicUUID,
      type: "noResponse"
    };
    bluetoothle.write(function(){}, errorHandler, params); //write command to characteristic
  }

  function errorHandler(){
    //alert on error
    navigator.notification.alert(
      'An Error Has Occured',
      null,
      'Error',
      'OK'
    );    
  }  

  return {
    init : init
  }

})();

controller.init();
