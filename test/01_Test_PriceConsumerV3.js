
const { expect } = require("chai");
//import {ethers, deployments, getUnnamedAccounts} from 'hardhat';
/*
describe("Price Consumer", async function() {

    //Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    //Default one below is ETH/USD contract on Kovan
    const PRICE_FEED_CONTRACT="0x9326BFA02ADD2366b30bacB125260Af641031331";

  it("Price Feed should return a positive value", async function() {
    this.timeout(0)
    const PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3");
    const priceConsumerV3 = await PriceConsumerV3.deploy(PRICE_FEED_CONTRACT);
    await priceConsumerV3.deployed();

    //console.log("Price Feed Value: ",await web3.utils.hexToNumber(priceConsumerV3.getLatestPrice()._hex)
    let result=await priceConsumerV3.getLatestPrice();
    console.log("Price Feed Value: ", web3.utils.hexToNumber(result._hex));
    expect(web3.utils.hexToNumber(result._hex)).to.be.greaterThan(0)
   

  });
});
*/