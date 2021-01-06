var ENS = require('../index.js');
var web3Utils = require('web3-utils');
var assert = require('assert');
var fs = require('fs');
var solc = require('solc');
var TestRPC = require('ganache-cli');

var niv = require('npm-install-version');
niv.install('web3@1.0.0-beta.34');
niv.install('web3@0.20.6');

var Web3_0 = niv.require('web3@0.20.6');
var Web3_1 = niv.require('web3@1.0.0-beta.34');

var ens = null;
var ensRoot = null;
var accounts = null;
var deployens = null;
var deployensAddress = null;
var web3 = null;

var registryInterface = [{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"resolver","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"node","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"label","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setSubnodeOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"node","type":"bytes32"},{"name":"owner","type":"address"}],"name":"setOwner","outputs":[],"type":"function"}];


// suppressing MaxEventListeners error as we are adding many listeners
// to the same web3 provider's "data" event for multiple ENS instances
// https://github.com/ethereum/web3.js/blob/1.0/packages/web3-core-requestmanager/src/index.js#L98
require('events').EventEmitter.prototype._maxListeners = 100;

// Reuse tests
var testSuiteGenerator = function(beforeHook, afterHook) {
	return function() {
		if (typeof beforeHook === 'function') before(beforeHook);
		if (typeof afterHook === 'function') after(afterHook);
		describe('#resolve()', function() {
			it('should get resolver addresses', function(done) {
				ens.resolver('foo.eth').resolverAddress().then(function(addr) {
					assert.notEqual(addr, '0x0000000000000000000000000000000000000000');
					done();
				}).catch(assert.ifError);
			});

			it('should resolve names', function(done) {
				ens.resolver('foo.eth').addr()
				.then(function(result) {
					assert.equal(result, deployensAddress);
					done();
				}).catch(assert.ifError);
			});

			it('should implement has()', function(done) {
				var resolver = ens.resolver('foo.eth');
				Promise.all([
					resolver.has(web3Utils.asciiToHex('addr'))
					.then(function(result) {
						assert.equal(result, true);
					}),
					resolver.has(web3Utils.asciiToHex('blah'))
					.then(function(result) {
						assert.equal(result, false);
					})
				]).catch(assert.ifError).then(function(result) {done()});
			});

			it('should error when the name record does not exist', function(done) {
				ens.resolver('bar.eth').addr()
				.catch(function(err) {
					assert.ok(err.toString().indexOf('invalid JUMP') != -1, err);
					done();
				});
			});

			it('should error when the name does not exist', function(done) {
				ens.resolver('quux.eth').addr()
				.catch(function(err) {
					assert.equal(err, ENS.NameNotFound);
					done();
				});
			});

			it('should permit name updates', function(done) {
				var resolver = ens.resolver('bar.eth')
				resolver.setAddr('0x0000000000000000000000000000000000012345', {from: accounts[0]})
				.then(function(result) {
					return resolver.addr()
					.then(function(result) {
						assert.equal(result, '0x0000000000000000000000000000000000012345');
						done();
					});
				});
			});

			it('should do reverse resolution', function(done) {
				var resolver = ens.resolver('foo.eth');
				resolver.reverseAddr().then(function(reverse) {
					return reverse.name().then(function(result) {
						assert.equal(result, "deployer.eth");
						done();
					});
				}).catch(assert.isError);
			});

			it('should fetch ABIs from names', function(done) {
				ens.resolver('foo.eth').abi()
				.then(function(abi) {
					assert.equal(abi.length, 2);
					assert.equal(abi[0].name, "test2");
					done();
				}).catch(assert.isError);
			});

			it('should fetch ABIs from reverse records', function(done) {
				ens.resolver('baz.eth').abi().then(function(abi) {
					assert.equal(abi.length, 2);
					assert.equal(abi[0].name, "test");
					done();
				}).catch(assert.isError);
			});

			it('should fetch contract instances', function(done) {
				ens.resolver('baz.eth').contract().then(function(contract) {
					assert.ok(contract.test != undefined || contract.methods.test != undefined);
					done();
				}).catch(assert.isError);
			});
		});

		describe('#owner()', function() {
			it('should return owner values', function(done) {
				ens.owner('bar.eth').then(function(result) {
					assert.equal(result, accounts[0]);
					done();
				}).catch(assert.isError);
			});
		});

		describe("#setSubnodeOwner", function() {
			it('should permit setting subnode owners', function(done) {
				ens.setSubnodeOwner('BAZ.bar.eth', accounts[0], {from: accounts[0]}).then(function(txid) {
					return ens.owner('baz.bar.eth').then(function(owner) {
						assert.equal(owner, accounts[0]);
						done();
					});
				}).catch(assert.isError);
			});
		});

		describe("#setResolver", function() {
			it('should permit resolver updates', function(done) {
				var addr = '0x2341234123412341234123412341234123412341';
				ens.setResolver('baz.bar.eth', addr, {from: accounts[0]}).then(function(txid) {
					return ens.resolver('baz.bar.eth').resolverAddress().then(function(address) {
						assert.equal(address, addr);
						done();
					});
				}).catch(assert.isError);
			});
		});

		describe("#setOwner", function() {
			it('should permit owner updates', function(done) {
				var addr = '0x3412341234123412341234123412341234123412';
				ens.setOwner('baz.bar.eth', addr, {from: accounts[0]})
				.then(function(txid) {
					return ens.owner('baz.bar.eth').then(function(owner) {
						assert.equal(owner, addr);
						done();
					});
				}).catch(assert.isError);
			});
		});

		describe("#reverse", function() {
			it('should look up reverse DNS records', function(done) {
				ens.reverse(deployensAddress).name()
				.then(function(result) {
					assert.equal(result, 'deployer.eth');
					done();
				}).catch(assert.isError);
			});
		});
	}
}

describe('ENS (Web3 1.x)', testSuiteGenerator(
	function(done) {
		if (web3 === null) {
			web3 = new Web3_1();
		}
		this.timeout(20000);
		web3.setProvider(TestRPC.provider());
		//web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
		web3.eth.getAccounts(function(err, acct) {
			if (acct) accounts = acct;
			var source = fs.readFileSync('test/ens.sol').toString();
			var compiled = solc.compile(source, 1);
			assert.equal(compiled.errors, undefined);
			var deployer = compiled.contracts[':DeployENS'];
			var deployensContract = new web3.eth.Contract(JSON.parse(deployer.interface));

			// Deploy the contract
			deployensContract.deploy({
				data: deployer.bytecode
			})
			.send({
				from: accounts[0],
				gas: 4700000
			})
			.on('error', function(err) { assert.ifError(err); })
			.then(function(newContractInstance) {
				deployens = newContractInstance;
				if (deployens.options.address != undefined) {
					deployens.methods.ens().call().then(function(value) {
						ensRoot = value;
						if (ens && ens.web3) {
							ens.web3.reset();
						}
						ens = new ENS(web3.currentProvider, ensRoot, Web3_1);
						deployensAddress = deployens.address || deployens._address;
						done();
					}).catch(function(err) {
						assert.ifError(err);
					})
				} else {
					assert.ifError("Contract address is null", contract);
				}
			})
			.catch(function(err) { assert.ifError(err); });
		});
	},
	function() {
		ens = null;
		ensRoot = null;
		accounts = null;
		deployens = null;
		deployensAddress = null;
		web3 = null;
	}
));


describe('ENS (Web3 0.x)', testSuiteGenerator(function(done) {
	this.timeout(20000);
	if (web3 === null) {
		web3 = new Web3_0();
	}
	web3.setProvider(TestRPC.provider());
	//web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
	web3.eth.getAccounts(function(err, acct) {
		accounts = acct
		var source = fs.readFileSync('test/ens.sol').toString();
		var compiled = solc.compile(source, 1);
		assert.equal(compiled.errors, undefined);
		var deployer = compiled.contracts[':DeployENS'];
		var deployensContract = web3.eth.contract(JSON.parse(deployer.interface));

		// Deploy the contract
		deployens = deployensContract.new(
		   {
		     from: accounts[0],
		     data: deployer.bytecode,
		     gas: 4700000
		   }, function(err, contract) {
		   	    assert.equal(err, null, err);
		   	    if(contract.address != undefined) {
		   	    	// Fetch the address of the ENS registry
		   	 		contract.ens.call(function(err, value) {
		   	 			assert.equal(err, null, err);
		   	 			ensRoot = value;
							ens = new ENS(web3.currentProvider, ensRoot, Web3_0);
							deployensAddress = deployens.address || deployens._address;
		   	 			done();
		   	 		});
			   	 }
		   });
	});
}));
