# subnet-info

## Installation
`npm install subnet-info`

## Usage
``` javascript
var subnetInfo = require('subnet-info');
var details = subnetInfo.details('192.168.10.50/24');
```

## Methods

* hosts() - returns the number of IPs available for devices on the network
* netMask() - returns the subnet mask in dotted-decimal format
* startAddress() - returns the first IP address available to network hosts
* endAddress() - returns the last IP address available to network hosts
* networkAddress() - returns the network address for the specified network
* broadcastAddress() - returns the broadcast address for the specified network
* details() - returns an object that contains all of the above information

IP address and subnet mask must be provided in [CIDR Notation](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation) for all methods. Currently only supports IPv4 addresses.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
