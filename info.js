var ayb = require('all-your-base');
var toBinary = require('to-binary');

var info = {

  hosts: function(cidr) {
    var subnetBits = parseInt(cidr.split('/')[1], 10);
    return Math.max(Math.pow(2, 32-subnetBits) - 2, 1);
  },

  netMask: function(cidr) {
    var subnetBits = parseInt(cidr.split('/')[1], 10);
    var i = 0;
    var octets = [];
    var octet = [];

    for (i = 0; i < 32; i++) {
      octet.push(i < subnetBits ? 1 : 0);

      if (octet.length === 8 ) {
        octets.push(ayb.binToDec(octet.join('')));
        octet = [];
      }
    }

    return octets.join('.');
  },

  startAddress: function(cidr) {
    var netAddr = this.networkAddress(cidr).split('.');
    var startIP = Math.min(parseInt(netAddr[3]) + 1, 1);
    var startAddr = [];

    startAddr[0] = netAddr[0];
    startAddr[1] = netAddr[1];
    startAddr[2] = netAddr[2];
    startAddr[3] = startIP;

    return startAddr.join('.');
  },

  endAddress: function(cidr) {

  },

  networkAddress: function(cidr) {
    var subnetBits = parseInt(cidr.split('/')[1], 10);
    var ip = cidr.split('/')[0];
    var i = 0;
    var binaryNetMask = '';
    var binaryIP = '';
    var netAddr = [];
    var octet = [];

    for (i = 0; i < 32; i++) {
      binaryNetMask += i < subnetBits ? '1' : '0';
    }

    ip = ip.split('.');
    for (i = 0; i < ip.length; i++) {
      ip[i] = toBinary(ip[i]);
    }

    binaryIP = ip.join('');

    for (i = 0; i < 32; i++) {
      if (parseInt(binaryNetMask.charAt(i)) === 1) {
        octet.push(binaryIP.charAt(i));
      } else {
        octet.push(0);
      }

      if (octet.length === 8) {
        netAddr.push(ayb.binToDec(octet.join('')));
        octet = [];
      }
    }

    return netAddr.join('.');
  },

  broadcastAddress: function(cidr) {
    var subnetBits = parseInt(cidr.split('/')[1], 10);
    var ip = cidr.split('/')[0];
    var i = 0;
    var binaryNetMask = '';
    var binaryIP = '';
    var broadcastAddr = [];
    var octet = [];

    for (i = 0; i < 32; i++) {
      binaryNetMask += i < subnetBits ? '1' : '0';
    }

    ip = ip.split('.');
    for (i = 0; i < ip.length; i++) {
      ip[i] = toBinary(ip[i]);
    }

    binaryIP = ip.join('');

    for (i = 0; i < 32; i++) {
      if (parseInt(binaryNetMask.charAt(i)) === 1) {
        octet.push(binaryIP.charAt(i));
      } else {
        octet.push(1);
      }

      if (octet.length === 8) {
        broadcastAddr.push(ayb.binToDec(octet.join('')));
        octet = [];
      }
    }

    return broadcastAddr.join('.');
  },

  details: function(cidr) {
    var info = {
      hosts: this.hosts(cidr),
      netMask: this.netMask(cidr),
      networkAddress: this.networkAddress(cidr),
      broadcastAddress: this.broadcastAddress(cidr),
      startAddress: this.startAddress(cidr)
    };

    return info;
  }

};

module.exports = info;
