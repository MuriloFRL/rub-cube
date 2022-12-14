const gamelogs = 'data/games.log'
const fs = require('fs');

const getMatchesFromGamesLog = () => {
  try {
    const gamesLog = fs.readFileSync(gamelogs, 'utf-8')
    const gamesLogNormalized = gamesLog.replaceAll('\r', '').split('\n')
    const matchIndexes = getMatchesIndexesFromGamesLog(gamesLogNormalized)
    const gameMatches = getMatchesFromIndexes(matchIndexes, gamesLogNormalized)
    
    return gameMatches
  } catch (e) {
    console.log(e)
  }
}

const getMatchesIndexesFromGamesLog = (gameslog) => {
  const matchesIndexes = []
  
  gameslog.filter((line, index) => {
    if(line.includes('InitGame')) {
      matchesIndexes.push(index)
    }
  })
  
  return matchesIndexes
}

const getMatchesFromIndexes = (indexes, gameslog) => {
  const limit = indexes.length - 1
  const matches = []
  
  for (let i = 0; i < limit; i += 2) {
    matches.push(getIndexesInBetween(indexes[i], indexes[i+1], gameslog))
  }
  
  return matches
}

const getIndexesInBetween = (firstIndex, lastIndex, gameslog) => {
  const indexesBetween = [...Array(lastIndex - firstIndex + 1).keys()].map(x => x + firstIndex)
  
  return indexesBetween.map((line) => {
    return gameslog[line]
  })
}

module.exports = {
  normalizer: getMatchesFromGamesLog,
}

module.exports = {
  getMatchesFromGamesLog,
}
