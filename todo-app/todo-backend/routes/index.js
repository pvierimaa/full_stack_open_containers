const express = require('express')
const router = express.Router()

const configs = require('../util/config')
const redis = require('../redis')

/* GET index data. */
router.get('/', async (req, res) => {
  const currentVisits = parseInt(await redis.getAsync('visits')) || 0

  const updatedVisits = currentVisits + 1
  await redis.setAsync('visits', updatedVisits)

  res.send({
    ...configs,
    visits: updatedVisits,
  })
})

module.exports = router
