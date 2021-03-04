# MMM-SystemStatus [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)]

System Status (ping, download speed, upload speed, cpu temp ++) Module for MagicMirror<sup>2</sup>.
Inspired by  [MMM-NetworkConnection](https://github.com/slametps/MMM-NetworkConnection) and [MMM-SystemStats](https://github.com/BenRoe/MMM-SystemStats)

## Example
![](others/MMM-SystemStatus.png)

## Installatoion
1. `cd ~/MagicMirror/modules`
1. `git clone https://github.com/eirikaho/MMM-SystemStatus.git`
1. `cd MMM-SystemStatus`
1. `npm install`
1. Configure `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-SystemStatus',
        position: 'bottom_bar',
        config: {
        }
    }
    ```
## Config Options

| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `updateInterval` | `600000 ms` (10 minutes) | how often should the devices states refreshed |
| `maxTime` | `5000` milliseconds | how long to do speedtest |
| `initialLoadDelay` | `2500` milliseconds | how long to delay to load the module |
| `decimal` | `1` | how many decimals for the round |
| `displayTextStatus` | `true` | display connection text status or not |
| `animationSpeed` | `2500` milliseconds | speed of the update animation |
