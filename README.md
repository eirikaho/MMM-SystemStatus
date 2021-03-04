# MMM-SystemStatus [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)]

System Status (ping, download speed, upload speed, cpu temp ++) Module for MagicMirror<sup>2</sup>.
Inspired by  [MMM-NetworkConnection](https://github.com/slametps/MMM-NetworkConnection) and [MMM-SystemStats](https://github.com/BenRoe/MMM-SystemStats).
Using (speedtest-linux)[https://github.com/rsvp/speedtest-linux] as a script instead of the speedtest-net package because some modules causes websocket issues when used in combination with speedtest-net

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