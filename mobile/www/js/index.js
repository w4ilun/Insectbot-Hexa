var controller = (function(){
  
  var blunoAddress;
  var blunoServiceUUID = 'dfb0';
  var blunoCharacteristicUUID = 'dfb1';

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
      bluetoothle.stopScan();
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
    bluetoothle.write(function(){}, errorHandler, params);    
  }

  function errorHandler(){
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
