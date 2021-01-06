/*
    This file is part of ethereum-ens.
    ethereum-ens is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    ethereum-ens is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with ethereum-ens.  If not, see <http://www.gnu.org/licenses/>.
*/

var namehash = require('eth-ens-namehash')
var pako = require('pako');
var Promise = require('bluebird');
var _ = require('underscore');
var Web3 = require('web3');
var utils = require('./src/utils.js');
var abi = require('./src/abi.js');

var registryInterface = abi.registryInterface;
var resolverInterface = abi.resolverInterface;

var registryAddresses = {
  // Mainnet
  "1": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  // Ropsten
  "3": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  // Rinkeby
  "4": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  // Goerli
  "5": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
};

var abiDecoders = {
  1: function(data) {
    data  = utils.strFromUtf8Ab(data);
    return JSON.parse(data);
  },
  2: function(data) {
    data = pako.inflate(data, {to: 'string'});
    return JSON.parse(data);
  }
};

var supportedDecoders = _.reduce(_.keys(abiDecoders), function(memo, val) { return memo | val; });

/**
 * Wrapper function that returns a version of ENS that is compatible
 * with the provided version of Web3
 */
function ENS (provider, address, Web3js) {
  if (Web3js !== undefined) {
    Web3 = Web3js;
  }
  if (!!/^0\./.exec(Web3.version || (new Web3(provider)).version.api)) {
    return utils.construct(ENS_0, [provider, address]);
  } else {
    return utils.construct(ENS_1, [provider, address]);
  }
}

ENS.NameNotFound = Error("ENS name not found");

/**
 * @class
 */
function Resolver_1(ens, node, contract) {
    this.ens = ens;
    this.node = node;
    this.instancePromise = ens.registryPromise.then(function(registry) {
      return registry.methods.resolver(node).call().then(function(address) {
        if(address == "0x0000000000000000000000000000000000000000") {
          return Promise.reject(ENS.NameNotFound);
        }

        contract.options.address = address;
        return contract;
      });
    });


    _.each(contract.methods, function(method, signature) {

        this[signature] = function() {
          var args = Array.prototype.slice.call(arguments);
          var params;
          return this.instancePromise.then(function(instance) {
            // Check abi interface for constant methods
            var asyncObj = instance._jsonInterface.reduce(function(acc, curr) {
              if (acc) {
                return acc;
              } else {
                return curr.name === signature && !curr.constant ? curr : null;
              }
            }, null)

            // Call if it's a constant method, send (with params) if it's not
            if (asyncObj === null) {
              return _.partial(instance.methods[signature], node).apply(instance.methods, args).call();
            } else {
              if (asyncObj.inputs.length < args.length + 1) {
                params = args.splice(args.length - 1)[0];
              }
              return ens.web3.eth.getAccounts().then(function(accounts) {
                return _.partial(instance.methods[signature], node).apply(instance.methods, args).send(params ? params : {from: accounts[0]});
              })
            }
          }).bind(this);
        }.bind(this);
    }.bind(this));
}

/**
 * resolverAddress returns the address of the resolver.
 * @returns A promise for the address of the resolver.
 */
Resolver_1.prototype.resolverAddress = function() {
  return this.instancePromise.then(function(instance) {
    return instance._address;
  });
}

/**
 * reverseAddr looks up the reverse record for the address returned by the resolver's addr()
 * @returns A promise for the Resolver for the reverse record.
 */
Resolver_1.prototype.reverseAddr = function() {
    return this.addr().then(function(addr) {
      return this.ens.reverse(addr);
    }).bind(this);
}

/**
 * abi returns the ABI associated with the name. Automatically looks for an ABI on the
 *     reverse record if none is found on the name itself.
 * @param {bool} Optional. If false, do not look up the ABI on the reverse entry.
 * @returns {object} A promise for the contract ABI.
 */
Resolver_1.prototype.abi = function(reverse) {
  return this.instancePromise.then(function(instance) {
    return instance.methods.ABI(this.node, supportedDecoders).call().then(function(result) {;
      if(result[0] == 0) {
        if(reverse == false) return null;
        return this.reverseAddr().then(function(reverse) {
          return reverse.abi(false);
        });
      } else {
        return abiDecoders[result[0]](utils.fromHex(result[1]));
      }
    }.bind(this));
  }.bind(this));
};

/**
 * contract returns a web3 contract object. The address is that returned by this resolver's
 * `addr()`, and the ABI is loaded from this resolver's `ABI()` method, or the ABI on the
 * reverse record if that's not found. Returns null if no address is specified or no ABI
 * was found. The returned contract object will not be promisifed or otherwise modified.
 * @returns {object} A promise for the contract instance.
 */
Resolver_1.prototype.contract = function() {
  return Promise.join(this.abi(), this.addr(), function(abi, addr) {
    return new this.ens.web3.eth.Contract(abi, addr);
  }.bind(this));
};

/**
 * @class
 *
 * @description Provides an easy-to-use interface to the Ethereum Name Service.
 *
 * Example usage:
 *
 *     var ENS = require('ethereum-ens');
 *     var Web3 = require('web3');
 *
 *     var web3 = new Web3();
 *     var ens = new ENS(web3);
 *
 *     var address = ens.resolver('foo.eth').addr().then(function(addr) { ... });
 *
 * Functions that require communicating with the node return promises, rather than
 * using callbacks. A promise has a `then` function, which takes a callback and will
 * call it when the promise is fulfilled; `then` returns another promise, so you can
 * chain callbacks. For more details, see http://bluebirdjs.com/.
 *
 * Notably, the `resolver` method returns a resolver instance immediately; lookup of
 * the resolver address is done in the background or when you first call an asynchronous
 * method on the resolver.
 *
 * Functions that create transactions also take an optional 'options' argument;
 * this has the same parameters as web3.
 *
 * @author Nick Johnson <nick@ethereum.org>
 * @date 2016
 * @license LGPL
 *
 * @param {object} provider A web3 provider to use to communicate with the blockchain.
 * @param {address} address Optional. The address of the ENS registry. Defaults to the public ENS registry.
 */
function ENS_1(provider, address) {
    // Ensures backwards compatibility
    if (provider.currentProvider) {
        provider = provider.currentProvider;
    }

    this.web3 = new Web3(provider);
    var registryContract = new this.web3.eth.Contract(registryInterface);
    if (address != undefined) {
      registryContract.options.address = address;
      this.registryPromise = Promise.resolve(registryContract);
    } else {
      this.registryPromise = new Promise((resolve) => {
        this.web3.eth.net.getId().then(function(version) {
            registryContract.options.address = registryAddresses[version];
            resolve(registryContract);
        });
      })
    }
}

ENS_1.NameNotFound = Error("ENS name not found");

/**
 * resolver returns a resolver object for the specified name, throwing
 * ENS.NameNotFound if the name does not exist in ENS.
 * Resolver objects are wrappers around web3 contract objects, with the
 * first argument - always the node ID in an ENS resolver - automatically
 * supplied. So, to call the `addr(node)` function on a standard resolver,
 * you only have to call `addr()`. Returned objects are also 'promisified' - they
 * return a Bluebird Promise object instead of taking a callback.
 * @param {string} name The name to look up.
 * @param {list} abi Optional. The JSON ABI definition to use for the resolver.
 *        if none is supplied, a default definition implementing `has`, `addr`, `name`,
 *        `setName` and `setAddr` is supplied.
 * @returns The resolver object.
 */
ENS_1.prototype.resolver = function(name, abi) {
    abi = abi || resolverInterface;
    var node = namehash.hash(name);
    return new Resolver_1(this, node, new this.web3.eth.Contract(abi));
};

/**
 * reverse returns a resolver object for the reverse resolution of the specified address,
 * throwing ENS.NameNotFound if the reverse record does not exist in ENS.
 * Resolver objects are wrappers around web3 contract objects, with the
 * first argument - always the node ID in an ENS resolver - automatically
 * supplied. So, to call the `addr(node)` function on a standard resolver,
 * you only have to call `addr()`. Returned objects are also 'promisified' - they
 * return a Bluebird Promise object instead of taking a callback.
 * @param {string} address The address to look up.
 * @param {list} abi Optional. The JSON ABI definition to use for the resolver.
 *        if none is supplied, a default definition implementing `has`, `addr`, `name`,
 *        `setName` and `setAddr` is supplied.
 * @returns The resolver object.
 */
ENS_1.prototype.reverse = function(address, abi) {
    if(address.startsWith("0x"))
      address = address.slice(2);
    return this.resolver(address.toLowerCase() + ".addr.reverse", abi);
};

/**
 * setResolver sets the address of the resolver contract for the specified name.
 * The calling account must be the owner of the name in order for this call to
 * succeed.
 * @param {string} name The name to update
 * @param {address} address The address of the resolver
 * @param {object} options An optional dict of parameters to pass to web3.
 * @returns A promise that returns the transaction ID when the transaction is mined.
 */
ENS_1.prototype.setResolver = function(name, addr, params) {
    var node = namehash.hash(name);

    return this.registryPromise.then(function(registry) {
      return this.web3.eth.getAccounts().then(function(accounts) {
        return registry.methods.setResolver(node, addr).send(params ? params : {from: accounts[0]});
      });
    }.bind(this));
}

/**
 * owner returns the address of the owner of the specified name.
 * @param {string} name The name to look up.
 * @returns A promise returning the owner address of the specified name.
 */
ENS_1.prototype.owner = function(name, callback) {
    var node = namehash.hash(name);

    return this.registryPromise.then(function(registry) {
      return registry.methods.owner(node).call();
    });
}

/**
 * setOwner sets the owner of the specified name. Only the owner may call
 * setResolver or setSubnodeOwner. The calling account must be the current
 * owner of the name in order for this call to succeed.
 * @param {string} name The name to update
 * @param {address} address The address of the new owner
 * @param {object} options An optional dict of parameters to pass to web3.
 * @returns A promise returning the transaction ID of the transaction, once mined.
 */
ENS_1.prototype.setOwner = function(name, addr, params) {
    var node = namehash.hash(name);
    return this.registryPromise.then(function(registry) {
      return this.web3.eth.getAccounts().then(function(accounts) {
        return registry.methods.setOwner(node, addr).send(params ? params : {from: accounts[0]});
      });
    }.bind(this));
}

/**
 * setSubnodeOwner sets the owner of the specified name. The calling account
 * must be the owner of the parent name in order for this call to succeed -
 * for example, to call setSubnodeOwner on 'foo.bar.eth', the caller must be
 * the owner of 'bar.eth'.
 * @param {string} name The name to update
 * @param {address} address The address of the new owner
 * @param {object} options An optional dict of parameters to pass to web3.
 * @returns A promise returning the transaction ID of the transaction, once mined.
 */
ENS_1.prototype.setSubnodeOwner = function(name, addr, params) {
    var node = utils.parentNamehash(name);

    return this.registryPromise.then(function(registry) {
      return this.web3.eth.getAccounts().then(function(accounts) {
        return registry.methods.setSubnodeOwner(node[1], node[0], addr).send(params ? params : {from: accounts[0]});
      });
    }.bind(this));
}


// TODO: ADD A BOUNDARY


/**
 * @class
 */
function Resolver_0(ens, node, contract) {
    this.ens = ens;
    this.node = node;
    this.instancePromise = ens.registryPromise.then(function(registry) {
      return registry.resolverAsync(node).then(function(address) {
        if(address == "0x0000000000000000000000000000000000000000") {
          return Promise.reject(ENS.NameNotFound);
        }
        return Promise.promisifyAll(contract.at(address));
      });
    });

    _.each(contract.abi, function(signature) {
        this[signature.name] = function() {
          var args = arguments;
          return this.instancePromise.then(function(instance) {
            return _.partial(instance[signature.name + 'Async'], node).apply(instance, args);
          }).bind(this);
        }.bind(this);
    }.bind(this));
}

/**
 * resolverAddress returns the address of the resolver.
 * @returns A promise for the address of the resolver.
 */
Resolver_0.prototype.resolverAddress = function() {
  return this.instancePromise.then(function(instance) {
    return instance.address;
  });
}

/**
 * reverseAddr looks up the reverse record for the address returned by the resolver's addr()
 * @returns A promise for the Resolver for the reverse record.
 */
Resolver_0.prototype.reverseAddr = function() {
    return this.addr().then(function(addr) {
      return this.ens.reverse(addr);
    }).bind(this);
}

/**
 * abi returns the ABI associated with the name. Automatically looks for an ABI on the
 *     reverse record if none is found on the name itself.
 * @param {bool} Optional. If false, do not look up the ABI on the reverse entry.
 * @returns {object} A promise for the contract ABI.
 */
Resolver_0.prototype.abi = function(reverse) {
  return this.instancePromise.then(function(instance) {
    return instance.ABIAsync(this.node, supportedDecoders).then(function(result) {
      if(result[0] == 0) {
        if(reverse == false) return null;
        return this.reverseAddr().then(function(reverse) {
          return reverse.abi(false);
        });
      } else {
        return abiDecoders[result[0]](utils.fromHex(result[1]));
      }
    }.bind(this));
  }.bind(this));
};

/**
 * contract returns a web3 contract object. The address is that returned by this resolver's
 * `addr()`, and the ABI is loaded from this resolver's `ABI()` method, or the ABI on the
 * reverse record if that's not found. Returns null if no address is specified or no ABI
 * was found. The returned contract object will not be promisifed or otherwise modified.
 * @returns {object} A promise for the contract instance.
 */
Resolver_0.prototype.contract = function() {
  return Promise.join(this.abi(), this.addr(), function(abi, addr) {
    return this.ens.web3.eth.contract(abi).at(addr);
  }.bind(this));
};

/**
 * @class
 *
 * @description Provides an easy-to-use interface to the Ethereum Name Service.
 *
 * Example usage:
 *
 *     var ENS = require('ethereum-ens');
 *     var Web3 = require('web3');
 *
 *     var web3 = new Web3();
 *     var ens = new ENS(web3);
 *
 *     var address = ens.resolver('foo.eth').addr().then(function(addr) { ... });
 *
 * Functions that require communicating with the node return promises, rather than
 * using callbacks. A promise has a `then` function, which takes a callback and will
 * call it when the promise is fulfilled; `then` returns another promise, so you can
 * chain callbacks. For more details, see http://bluebirdjs.com/.
 *
 * Notably, the `resolver` method returns a resolver instance immediately; lookup of
 * the resolver address is done in the background or when you first call an asynchronous
 * method on the resolver.
 *
 * Functions that create transactions also take an optional 'options' argument;
 * this has the same parameters as web3.
 *
 * @author Nick Johnson <nick@ethereum.org>
 * @date 2016
 * @license LGPL
 *
 * @param {object} provider A web3 provider to use to communicate with the blockchain.
 * @param {address} address Optional. The address of the ENS registry. Defaults to the public ENS registry.
 */
function ENS_0(provider, address) {
    // Ensures backwards compatibility
    if (provider.currentProvider) {
        provider = provider.currentProvider;
    }

    this.web3 = new Web3(provider);
    var registryContract = this.web3.eth.contract(registryInterface);
    if(address != undefined) {
      this.registryPromise = Promise.resolve(Promise.promisifyAll(registryContract.at(address)));
    } else {
      this.registryPromise = Promise.promisify(this.web3.version.getNetwork)().then(function(version) {
        return Promise.promisifyAll(registryContract.at(registryAddresses[version]));
      });
    }
}

ENS_0.NameNotFound = Error("ENS name not found");

/**
 * resolver returns a resolver object for the specified name, throwing
 * ENS.NameNotFound if the name does not exist in ENS.
 * Resolver objects are wrappers around web3 contract objects, with the
 * first argument - always the node ID in an ENS resolver - automatically
 * supplied. So, to call the `addr(node)` function on a standard resolver,
 * you only have to call `addr()`. Returned objects are also 'promisified' - they
 * return a Bluebird Promise object instead of taking a callback.
 * @param {string} name The name to look up.
 * @param {list} abi Optional. The JSON ABI definition to use for the resolver.
 *        if none is supplied, a default definition implementing `has`, `addr`, `name`,
 *        `setName` and `setAddr` is supplied.
 * @returns The resolver object.
 */
ENS_0.prototype.resolver = function(name, abi) {
    abi = abi || resolverInterface;
    var node = namehash.hash(name);
    return new Resolver_0(this, node, this.web3.eth.contract(abi));
};

/**
 * reverse returns a resolver object for the reverse resolution of the specified address,
 * throwing ENS.NameNotFound if the reverse record does not exist in ENS.
 * Resolver objects are wrappers around web3 contract objects, with the
 * first argument - always the node ID in an ENS resolver - automatically
 * supplied. So, to call the `addr(node)` function on a standard resolver,
 * you only have to call `addr()`. Returned objects are also 'promisified' - they
 * return a Bluebird Promise object instead of taking a callback.
 * @param {string} address The address to look up.
 * @param {list} abi Optional. The JSON ABI definition to use for the resolver.
 *        if none is supplied, a default definition implementing `has`, `addr`, `name`,
 *        `setName` and `setAddr` is supplied.
 * @returns The resolver object.
 */
ENS_0.prototype.reverse = function(address, abi) {
    if(address.startsWith("0x"))
      address = address.slice(2);
    return this.resolver(address.toLowerCase() + ".addr.reverse", abi);
};

/**
 * setResolver sets the address of the resolver contract for the specified name.
 * The calling account must be the owner of the name in order for this call to
 * succeed.
 * @param {string} name The name to update
 * @param {address} address The address of the resolver
 * @param {object} options An optional dict of parameters to pass to web3.
 * @returns A promise that returns the transaction ID when the transaction is mined.
 */
ENS_0.prototype.setResolver = function(name, addr, params) {
    var node = namehash.hash(name);

    return this.registryPromise.then(function(registry) {
      return registry.setResolverAsync(node, addr, params);
    });
}

/**
 * owner returns the address of the owner of the specified name.
 * @param {string} name The name to look up.
 * @returns A promise returning the owner address of the specified name.
 */
ENS_0.prototype.owner = function(name, callback) {
    var node = namehash.hash(name);

    return this.registryPromise.then(function(registry) {
      return registry.ownerAsync(node);
    });
}

/**
 * setOwner sets the owner of the specified name. Only the owner may call
 * setResolver or setSubnodeOwner. The calling account must be the current
 * owner of the name in order for this call to succeed.
 * @param {string} name The name to update
 * @param {address} address The address of the new owner
 * @param {object} options An optional dict of parameters to pass to web3.
 * @returns A promise returning the transaction ID of the transaction, once mined.
 */
ENS_0.prototype.setOwner = function(name, addr, params) {
    var node = namehash.hash(name);

    return this.registryPromise.then(function(registry) {
      return registry.setOwnerAsync(node, addr, params);
    });
}

/**
 * setSubnodeOwner sets the owner of the specified name. The calling account
 * must be the owner of the parent name in order for this call to succeed -
 * for example, to call setSubnodeOwner on 'foo.bar.eth', the caller must be
 * the owner of 'bar.eth'.
 * @param {string} name The name to update
 * @param {address} address The address of the new owner
 * @param {object} options An optional dict of parameters to pass to web3.
 * @returns A promise returning the transaction ID of the transaction, once mined.
 */
ENS_0.prototype.setSubnodeOwner = function(name, addr, params) {
    var node = utils.parentNamehash(name);

    return this.registryPromise.then(function(registry) {
      return registry.setSubnodeOwnerAsync(node[1], node[0], addr, params);
    });
}

module.exports = ENS;
