const router = require('express').Router()
const { health } = require('../application/controllers/health')
const { matches } = require('../application/controllers/match.controller')
const { reports, scores } = require('../application/controllers/report.controller')

router.get('/health', health)
router.get('/matches', matches)
router.get('/reports/scores', scores)
router.get('/reports/:matchId?', reports)

module.exports = router
