
const { expect } = require("chai");

describe("API Consumer", async function() {

  //LINK Token address set to Kovan address. Can get other values at https://docs.chain.link/docs/link-token-contracts
  const LINK_TOKEN_ADDR="0xa36085F69e2889c224210F603D836748e7dC0088";

  it("APIConsumer Should successfully make an external data request", async function() {
    //deploy the contract
    this.timeout(0)
    const APIConsumer = await ethers.getContractFactory("APIConsumer");
    const apiConsumer = await APIConsumer.deploy(LINK_TOKEN_ADDR);
    await apiConsumer.deployed();
    
    //fund the contract
    await hre.run("fund-link",{contract: apiConsumer.address})

    //Now that contract is funded, we can cal the function to do the data request
    await hre.run("request-data",{contract: apiConsumer.address})

    //Read contract to see result of external data request
    let result = await hre.run("read-data",{contract: apiConsumer.address});
    console.log("Data: ",result)
    expect(result).to.be.greaterThan(0)
   

  });
});