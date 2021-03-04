'use strict';
/**
 * @file node_helper.js for MMM-NetworkConnection
 *
 * @author slametps
 * @license MIT
 *
 * @see https://github.com/slametps/MMM-NetworkConnection
 */

var NodeHelper = require('node_helper');
var ping = require('ping');
var linkSpeed = require('link-speed');

module.exports = NodeHelper.create({
  start: function() {
    console.log(this.name + ' helper started ...');
    this.linkSpeedAwaiter = linkSpeed.default;
  },
  
  socketNotificationReceived: function(notification, payload) {
    if(notification == 'NETCONN_TEST_START')
    {
      console.log(`${this.name}: starting network connection testing`)
      ping.promise.probe('google.com').then((res) => {
        const ping = res.time;
        console.log(`${this.name}: ping:  ${JSON.stringify(ping)}`);
        this.sendSocketNotification('NETCONN_RESULT_PING', ping);
      });
      console.log(`${this.name}: linkSpeed: [${typeof(this.linkSpeedAwaiter)}] ${JSON.stringify(this.linkSpeedAwaiter)}`);
      
		  this.linkSpeedAwaiter()
		  	.then((res) => {
					console.log(`${this.name}: linkspeed:  ${JSON.stringify(res)}`);
					this.sendSocketNotification('NETCONN_RESULT_DOWNLOAD', res.down.human);
	 		  	this.sendSocketNotification('NETCONN_RESULT_UPLOAD', res.up.human);
				});
    }
  }
});
