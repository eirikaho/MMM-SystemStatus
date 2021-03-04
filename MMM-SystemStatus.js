Module.register('MMM-SystemStatus', {
	defaults: {
	  // Module misc
    name: 'MMM-SystemStatus',
    hidden: false,
    
    // User definable
    animationSpeed: 2.5 * 1000,
		initialLoadDelay: 2.5 * 1000,
		language: config.language || 'en',
 		updateInterval: 60 * 1000
	},
	
	getScripts() {
	    return ["moment.js"];
	},
	
  getStyles() {
    return ['font-awesome.css'];
  },

	start() {
		Log.info('Starting module: ' + this.name);

		moment.locale(this.config.language);

    this.firstLoad = true;

		setTimeout(() => {
      this.doRunNetworkConnectionTest();
      setInterval(() => {
        this.doRunNetworkConnectionTest();
        this.doRunCpuTempMeasurement();
      }, this.config.updateInterval);
    }, this.config.initialLoadDelay);

	},

	getDom() {
		var wrapper = document.createElement('div');

    if (this.firstLoad && this.pingDelay == -1) {
      wrapper.className = "bright small light";
      wrapper.innerHTML = this.translate("LOADING");
    }
    else {
      this.firstLoad = false;
      var connectionActive = this.checkConnection();

      if (connectionActive) {
        wrapper.className = 'small';
        let s = ''
        s += "<span class=\"fa fa-cloud\"></span> "+ (this.pingDelay && this.pingDelay + "ms" || "n/a");
        s += " ";
        s += "<span class=\"fa fa-download\"></span>"+ (this.downloadSpeed && this.downloadSpeed + "Mbps" || "n/a");
        s += " ";
        s += "<span class=\"fa fa-upload\"></span> "+ (this.uploadSpeed && this.uploadSpeed + "Mbps" || "n/a");
        s += " ";
        s += "<span class=\"fas fa-thermometer-three-quarters\"></span> "+ (this.cpuTemp && this.cpuTemp + "°C" || "n/a");
        wrapper.innerHTML = s;
      } else {
        wrapper.className = 'normal bright';
        wrapper.innerHTML = "No connection";
      }
    }

		return wrapper;
	},

	checkConnection() {
		return window.navigator.onLine;
	},

  doRunNetworkConnectionTest() {
    this.sendSocketNotification('NETCONN_TEST_START', {'config':this.config});
  },
  
  doRunCpuTempMeasurement() {
    this.sendSocketNotification('REFRESH_CPU_TEMP', {'config':this.config});
  },

  socketNotificationReceived: function(notification, payload) {
  	switch(notification) {
  		case 'NETCONN_RESULT_DOWNLOAD':
	      this.downloadSpeed = payload;
	      break;
	    case 'NETCONN_RESULT_UPLOAD':
	    	this.uploadSpeed = payload;
	      break;
	    case 'NETCONN_RESULT_PING':
	    	this.pingDelay = payload;
	      break;
	    case 'CPU_TEMP':
	    	this.cpuTemp = payload;
  	}
    this.updateDom(this.config.animationSpeed);
  }
});