const arguments = ["arg1", "arg2"]

const secrets = { key: "justin's_super_secret_api_key" }

const sourceCode = `function run(args, queryResponses) {
    const avgPrice = (queryResponses[0].data.price + queryResponses[1].data.price) / 2
    secrets[key]
    return Math.round(avgPrice * args[0])
}`

module.exports = {
    arguments,
    secrets,
    sourceCode,
}
