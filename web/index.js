var noble = require('noble');

var peripheralUuid = "6ee08d6e813743aca1f9f76e5273fba1"; //Bluno UUID

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  if (peripheral.uuid === peripheralUuid) {
    noble.stopScanning();
    console.log('peripheral with UUID ' + peripheralUuid + ' found');
    explore(peripheral);
  }
});

function explore(peripheral) {
  console.log('services and characteristics:');

  peripheral.on('disconnect', function() {
    process.exit(0);
  });

  peripheral.connect(function(error) {
    peripheral.discoverServices([], function(error, services) {
    	services.forEach(function(service){
    		if(service.uuid == 'dfb0'){ //Bluno's Service UUID on OS X
    			service.discoverCharacteristics([], function(error, characteristics){
    				characteristics.forEach(function(characteristic){
    					if(characteristic.uuid == 'dfb1'){ //Bluno's Characteristic UUID on OS X
    						writeTocharacteristic(characteristic);
    					}
    				});
    			});
    		}
    	});
    });
  });
}

function writeTocharacteristic(characteristic){
	var buffer = new Buffer("#test#", "utf-8")
	characteristic.write(buffer);
	//setTimeout(function(){ writeTocharacteristic(characteristic) },1000);
}
