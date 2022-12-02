const { simulateRequest, buildRequest } = require('./onDemandRequestSimulator');
const { writeFileSync } = require('fs');

(async () => {
  const { success, resultLog } = await simulateRequest('../../on-demand-request-config.js')
  
  console.log(resultLog)

  if (success) {
    const builtRequest = await buildRequest('../../on-demand-request-config.js')
    writeFileSync('on-demand-request.json', JSON.stringify(builtRequest))
  }
})()