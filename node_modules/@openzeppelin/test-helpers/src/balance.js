const { web3, BN } = require('./setup');
const { fromWei } = require('web3-utils');

class Tracker {
  constructor (acc, unit) {
    this.account = acc;
    this.unit = unit;
  }
  async delta (unit = this.unit) {
    const current = await balanceCurrent(this.account);
    const delta = current.sub(this.prev);
    this.prev = current;

    return new BN(fromWei(delta, unit));
  }
  async get (unit = this.unit) {
    this.prev = await balanceCurrent(this.account);

    return new BN(fromWei(this.prev, unit));
  }
}

async function balanceTracker (owner, unit = 'wei') {
  const tracker = new Tracker(owner, unit);
  await tracker.get();
  return tracker;
}

async function balanceCurrent (account, unit = 'wei') {
  return new BN(fromWei(await web3.eth.getBalance(account), unit));
}

module.exports = {
  current: balanceCurrent,
  tracker: balanceTracker,
};
