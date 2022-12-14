const matchReport = (gameMatches, matchId) => {
  let matchCount = 1
  const matchesReports = []
  
  gameMatches.forEach((match) => {
    const matchPlayers = players(match)
    const matchKills = kills(match)
    const { causaMortis, worldKills } = killsBy(matchKills)
    
    matchesReports.push({
      matchId: matchCount,
      players: matchPlayers,
      kills: matchKills,
      totalDeaths: matchKills.length,
      killsByWorld: worldKills,
      killsBy: causaMortis,
    })
    
    ++matchCount
  })
  
  if (matchId) return matchesReports[matchId-1]
  
  return matchesReports
}

const scoreReport = (matchesReports) => {
  let matchCount = 1
  const scores = []
  
  matchesReports.forEach((match) => {
    const matchScore = calculateScore(match)
    scores.push({
      matchId: matchCount,
      score: matchScore,
    })
    
    ++matchCount
  })
  
  return scores
}

const calculateScore = (match) => {
  const { kills } = match
  const score = {}
  
  kills.forEach((kill) => {
    const { killer, killed } = kill
  
    if (killer === '<world>') {
      score[killed] = score[killed] ? --score[killed] : -1
    } else {
      score[killer] = score[killer] ? ++score[killer] : 1
    }
  })
  
  return score
}

const players = (match) => {
  const players = []
  
  match.forEach((line) => {
    if (line.includes('ClientUserinfoChanged')) {
      const player = line.split('n\\')[1].split('\\t')[0]
      
      players.push(player.trim())
    }
  })
  
  return [...new Set(players)]
}

const kills = (match) => {
  const kills = []
   match.forEach((line) => {
    if (line.includes('Kill')) {
      const killLog = line.split('Kill: ')[1].split(': ')[1]
      const killer = killLog.split(' killed')[0].trim()
      const killed = killLog.split(' killed')[1].split(' by ')[0].trim()
      const weapon = killLog.split(' killed')[1].split('by ')[1].trim()
  
      kills.push({
        killer,
        killed,
        weapon,
      })
    }
  })
  
  return kills
}

const killsBy = (kills) => {
  const causaMortis = {}
  let worldKills = 0
  
  kills.forEach((kill) => {
    const { killer, weapon } = kill
    causaMortis[weapon] = causaMortis[weapon] ? ++causaMortis[weapon] : 1
    
    if (killer === '<world>') ++worldKills
  })
  
  return {
    causaMortis,
    worldKills,
  }
}

module.exports = {
  matchReport,
  scoreReport,
}
