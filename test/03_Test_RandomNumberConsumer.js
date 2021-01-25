
const { expect } = require("chai");

describe("Random Number Consumer", async function() {

    //LINK Token address set to Kovan address. Can get other values at https://docs.chain.link/docs/link-token-contracts
    const LINK_TOKEN_ADDR="0xa36085F69e2889c224210F603D836748e7dC0088";
    //VRF Details set for Kovan environment, can get other values at https://docs.chain.link/docs/vrf-contracts#config
    const VRF_COORDINATOR="0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9"
    const VRF_FEE="100000000000000000"
    const VRF_KEYHASH="0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4"


  it("Random Number Should successfully make an external random number request", async function() {
    //deploy the contract
    this.timeout(0)
    const RandomNumberConsumer = await ethers.getContractFactory("RandomNumberConsumer");
    const randomNumberConsumer = await RandomNumberConsumer.deploy(VRF_COORDINATOR,LINK_TOKEN_ADDR,VRF_KEYHASH,VRF_FEE);
    await randomNumberConsumer.deployed();

    //Before we can do an API request, we need to fund it with LINK
    await hre.run("fund-link",{contract: randomNumberConsumer.address})

    //Now that contract is funded, we can cal the function to do the data request
    await hre.run("request-random-number",{contract: randomNumberConsumer.address,
                                               seed: "7777"})

    //Test the result of the random number request
    let result = await hre.run("read-random-number",{contract: randomNumberConsumer.address});
    console.log("Random Number: ",result)
    expect(result).to.be.greaterThan(0)
   

  });
});