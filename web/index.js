var noble = require('noble');

var peripheralUuid = "6ee08d6e813743aca1f9f76e5273fba1"; //Bluno UUID

var serialCharacteristic;

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
    						//writeTocharacteristic(characteristic);
                serialCharacteristic = characteristic;
    					}
    				});
    			});
    		}
    	});
    });
  });
}

function writeTocharacteristic(characteristic,command){
	var buffer = new Buffer("#"+command+"#", "utf-8")
  if(characteristic){
	 characteristic.write(buffer);
  }
}



//COMMAND PROMPT
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Insect Bot Command> ');
rl.prompt();

rl.on('line', function(line) {
  switch(line.trim()) {
    case 'w':
      console.log('FORWARD!');
      writeTocharacteristic(serialCharacteristic,'W');
      break;
    case 'a':
      console.log('LEFT!');
      writeTocharacteristic(serialCharacteristic,'A');
      break;
    case 's':
      console.log('BACKWARD!');
      writeTocharacteristic(serialCharacteristic,'S');
      break;
    case 'd':
      console.log('RIGHT!');
      writeTocharacteristic(serialCharacteristic,'D');
      break;                  
    default:
      console.log(line.trim() + ' is an invalid command!');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Have a great day!');
  process.exit(0);
});
