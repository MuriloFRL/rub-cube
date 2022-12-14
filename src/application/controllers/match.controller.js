const matchService = require('../services/match.service')

const matches = async (req, res) => {
  const logsNormalized = matchService.getMatchesFromGamesLog()
  
  await res.json(logsNormalized)
  
  return res.end()
}

module.exports = {
  matches,
}
