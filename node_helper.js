var NodeHelper = require('node_helper');
var ping = require('ping');
var linkSpeed = require('link-speed');
var exec = require('child_process').exec;

module.exports = NodeHelper.create({
  start: function() {
    console.log(this.name + ' helper started ...');
    this.linkSpeedAwaiter = linkSpeed.default;
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
		ping.promise.probe('google.com').then((res) => {
		  const ping = res.time;
		  console.log(`${this.name}: ping:  ${JSON.stringify(ping)}`);
		  this.sendSocketNotification('NETCONN_RESULT_PING', ping);
		});
		/*
		console.log(`${this.name}: linkSpeed: [${typeof(this.linkSpeedAwaiter)}] ${JSON.stringify(this.linkSpeedAwaiter)}`);
		
		this.linkSpeedAwaiter()
			.then((res) => {
				console.log(`${this.name}: linkspeed:  ${JSON.stringify(res)}`);
				this.sendSocketNotification('NETCONN_RESULT_DOWNLOAD', res.down.human);
				this.sendSocketNotification('NETCONN_RESULT_UPLOAD', res.up.human);
			});
		*/
		this.sendSocketNotification('NETCONN_RESULT_DOWNLOAD', 102.3);
		this.sendSocketNotification('NETCONN_RESULT_UPLOAD', 98.8);
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
