const { simulateRequest, buildRequest } = require('./onDemandRequestSimulator');

(async () => {
  const { success, resultLog } = await simulateRequest('../../on-demand-request-config.js')
  
  console.log(resultLog)

  if (success) {
    buildRequest('../../on-demand-request-config.js')
  }
})()