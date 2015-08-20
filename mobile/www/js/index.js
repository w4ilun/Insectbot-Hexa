var bluetoothle;
var blunoAddress;
var blunoServices;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
  bluetoothle.initialize(initializeSuccess, initializeError, {request:true});
}

function initializeSuccess(obj){
  if (obj.status == "enabled"){
    scan();
  }else{
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
    $('.name').html(obj.name);
    $('.address').html(obj.address);
    if(obj.name == "Bluno"){
      blunoAddress = obj.address;
      bluetoothle.connect(connectSuccess, connectError, {address:blunoAddress});
    }
  }
  else if (obj.status == "scanStarted"){
    console.log("Scan Started");
  }
  else{
    console.log("Unexpected Start Scan Status");
  }
}

function connectSuccess(obj){
  if(obj.status == "connected"){
    $(".status").html("Connected");
    bluetoothle.discover(discoverSuccess, discoverError, {address:blunoAddress});
    //command("forward");
  }
}

function command(direction){
  switch(direction){
    case "forward":
      writeCharacteristicValue("#W#");
      break;
    case "backward":
      writeCharacteristicValue("#S#");
      break;
    case "left":
      writeCharacteristicValue("#S#");
      break;
    case "right":
      writeCharacteristicValue("#D#");
      break;                  
    default:
      console.log("Command Not Supported");
  }
}

function writeCharacteristicValue(value){
  var bytes = bluetoothle.stringToBytes(value);
  var encodedString = bluetoothle.bytesToEncodedString(bytes);

  var params = {
    address:blunoAddress,
    value:encodedString,
    serviceUuid:"dfb0",
    characteristicUuid:"dfb1",
    type:"noResponse"
  };

  bluetoothle.write(writeSuccess, writeError,params);
}

function writeSuccess(){
}

function discoverSuccess(obj){
  if(obj.status == "discovered"){
    // var $services = $(".services");
    // obj.services.forEach(function(service){
    //   var $service = $("<li>"+service.serviceUuid+"<ul></ul></li>");
    //   $services.append($service);
    //   service.characteristics.forEach(function(characteristic){
    //     var $characteristic = $("<li>"+characteristic.characteristicUuid+"</li>");
    //     $service.find("ul").append($characteristic);
    //   });
    // });
    // command("forward");
    $(".discovery").html("Discovery Complete");
    $(".joystick").on('touchstart',function(e){
      var direction = $(e.target).attr('id');
      command(direction);
    });
  }
}

function writeError(obj){
  console.log("Write Error");
}

function discoverError(obj){
  console.log("Discover Error");
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

function connectError(){
  console.log("Connect Error"); 
}