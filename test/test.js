var assert = require('assert');
var SubnetInfo = require('../index');
var chai = require('chai');
var expect = chai.expect;

var subnetinfo = new SubnetInfo('192.168.10.50/24');

describe('SubnetInfo', function() {

  describe('info', function() {
    it('should be an object', function() {
      expect(subnetinfo.info()).to.be.an('object');
    });
  });

  describe('_size', function() {
    it('should be a number', function() {
      expect(subnetinfo._size()).to.be.a('number');
    });
  });

  describe('_netmask', function() {
    it('should be a string', function() {
      expect(subnetinfo._netmask()).to.be.a('string');
    });
  });

  describe('_startAddress', function() {
    it('should be a string', function() {
      expect(subnetinfo._startAddress()).to.be.a('string');
    });
  });

  describe('_endAddress', function() {
    it('should be a string', function() {
      expect(subnetinfo._endAddress()).to.be.a('string');
    });
  });

  describe('_networkAddress', function() {
    it('should be a string', function() {
      expect(subnetinfo._networkAddress()).to.be.a('string');
    });
  });

  describe('_broadcastAddress', function() {
    it('should be a string', function() {
      expect(subnetinfo._broadcastAddress()).to.be.a('string');
    });
  });

});
