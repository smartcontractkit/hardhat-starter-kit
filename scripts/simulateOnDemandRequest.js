const { simulateRequest } = require('./onDemandRequestSimulator');

(async () => {
  const { resultLog } = await simulateRequest('../../on-demand-request-config.js')
  
  console.log(`\n${resultLog}`)
})()