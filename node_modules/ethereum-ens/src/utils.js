var sha3 = require('js-sha3').keccak_256
var namehash = require('eth-ens-namehash')

module.exports = {
  fromHex: function(x) {
    if(x.startsWith("0x")) {
      x = x.slice(2);
    }

    var ret = new Uint8Array(x.length / 2);
    for(var i = 0; i < ret.length; i++) {
      ret[i] = parseInt(x.slice(i * 2, i * 2 + 2), 16);
    }

    return ret;
  },
  parentNamehash: function(name) {
    var dot = name.indexOf('.');
    if(dot == -1) {
      return ['0x' + sha3(namehash.normalize(name)), namehash.hash('')];
    } else {
      return ['0x' + sha3(namehash.normalize(name.slice(0, dot))), namehash.hash(name.slice(dot + 1))];
    }
  },
  construct: function(constructor, args) {
    function F() {
      return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
  },
  strFromUtf8Ab: function(ab) {
    // from https://stackoverflow.com/a/18722848
    return decodeURIComponent(escape(String.fromCharCode.apply(null, ab)));
  }
}
