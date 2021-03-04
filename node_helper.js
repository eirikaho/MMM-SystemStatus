var NodeHelper = require('node_helper');
var exec = require('child_process').exec;

module.exports = NodeHelper.create({
  start: function() {
    console.log(this.name + ' helper started ...');
  },
  
  socketNotificationReceived: function(notification, payload) {
  	switch(notification) {
  		case 'NETCONN_TEST_START':
  			this.testNetcon();
  			break;
			case 'REFRESH_CPU_TEMP':
				this.cpuTemp();
				break;
  	}
  },
  
  testNetcon: function() {
		console.log(`${this.name}: starting network connection testing`)
		
		exec("./modules/MMM-SystemStatus/scripts/speedtest.sh", (error, stdout, stderr) => {
			if (error) {
				console.log(error);
				return;
			}
			console.log(`${this.name}: speedtest result: ${stdout}`);
			var resArr = stdout.split(", ");
		  this.sendSocketNotification('NETCONN_RESULT_PING', parseFloat(resArr[2]).toFixed(0));
		  this.sendSocketNotification('NETCONN_RESULT_DOWNLOAD', parseFloat(resArr[3]).toFixed(0));
		  this.sendSocketNotification('NETCONN_RESULT_UPLOAD', parseFloat(resArr[4]).toFixed(0));
		});
		
  },
  
  cpuTemp: function() {
		exec("/opt/vc/bin/vcgencmd measure_temp", (error, stdout, stderr) => {
			if (error) {
				console.log(error);
				return;
			}
			this.sendSocketNotification('CPU_TEMP', parseFloat(stdout.replace('temp=','')));
		});
	},
});
