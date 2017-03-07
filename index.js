const ayb = require('all-your-base');
const toBinary = require('to-binary');

class SubnetInfo {
  constructor(cidr) {
    this.ip = cidr.split('/')[0];
    this.subnetBits = parseInt(cidr.split('/')[1], 10);
    this.octets = this.ip.split('.');
  };

  _size() {
    return Math.pow(2, 32 - this.subnetBits);
  };

  _netmask() {
    var i = 0;
    var octets = [];
    var octet = [];

    for (i = 0; i < 32; i++) {
      octet.push(i < this.subnetBits ? 1 : 0);

      if (octet.length === 8 ) {
        octets.push(ayb.binToDec(octet.join('')));
        octet = [];
      }
    }

    return octets.join('.');
  };

  _startAddress() {
    var netAddr = this._networkAddress().split('.');
    var startAddr = [];

    startAddr[0] = netAddr[0];
    startAddr[1] = netAddr[1];
    startAddr[2] = netAddr[2];
    startAddr[3] = parseInt(netAddr[3], 10) + 1;

    return startAddr.join('.');
  };

  _endAddress() {
    var broadcastAddr = this._broadcastAddress().split('.');
    var endAddr = [];

    endAddr[0] = broadcastAddr[0];
    endAddr[1] = broadcastAddr[1];
    endAddr[2] = broadcastAddr[2];
    endAddr[3] = parseInt(broadcastAddr[3], 10) - 1;

    return endAddr.join('.');
  };

  _networkAddress() {
    var i = 0;
    var binaryNetMask = '';
    var binaryIP = '';
    var netAddr = [];
    var octet = [];

    for (i = 0; i < 32; i++) {
      binaryNetMask += i < this.subnetBits ? '1' : '0';
    }

    var ip = this.ip.split('.');
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
  };

  _broadcastAddress() {
    var i = 0;
    var binaryNetMask = '';
    var binaryIP = '';
    var broadcastAddr = [];
    var octet = [];

    for (i = 0; i < 32; i++) {
      binaryNetMask += i < this.subnetBits ? '1' : '0';
    }

    var ip = this.ip.split('.');
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
  };

  info() {
    return {
      size: this._size(),
      netmask: this._netmask(),
      startAddress: this._startAddress(),
      endAddress: this._endAddress(),
      netAddress: this._networkAddress(),
      broadcastAddress: this._broadcastAddress()
    };
  };

};

module.exports = SubnetInfo;
