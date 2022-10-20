const ocr2drRequest = {
    default: {
        name: "hardhat",
    },
    31337: {
        name: "localhost",
        args: ["arg1", "arg2"],
        queries: [],
        secrets: { api_key: "my_super_secret_api_key" },
        source: `function run(args, queryResponses) {
            const avgPrice = (queryResponses[0].data.price + queryResponses[1].data.price) / 2;
            return Math.round(avgPrice * args[0]);
        }`,
    },
    1: {
        name: "mainnet",
    },
    5: {
        name: "goerli",
    },
    137: {
        name: "polygon",
    },
}

module.exports = {
    ocr2drRequest,
}
