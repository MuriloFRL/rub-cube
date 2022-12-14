const reportService = require('../services/report.service')
const matchService = require('../services/match.service')

const reports = async (req, res) => {
  const { params: { matchId } } = req
  
  const gamesLog = matchService.getMatchesFromGamesLog()
  const gamesReports = reportService.matchReport(gamesLog, matchId)
  
  await res.json(gamesReports)
  
  return res.end()
}

const scores = async (req, res) => {
  const gamesLog = matchService.getMatchesFromGamesLog()
  const gamesReports = reportService.matchReport(gamesLog)
  const scoreReports = reportService.scoreReport(gamesReports)
  
  await res.json(scoreReports)
  
  return res.end()
}

module.exports = {
  reports,
  scores,
}
