var SubnetInfo = require('../index');
var subnetinfo = new SubnetInfo('10.150.10.14/22');

//to get object of all available network information
console.log(subnetinfo.info());

//to get just a specific item
console.log(subnetinfo.info().startAddress);
