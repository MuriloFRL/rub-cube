const health = async (req, res) => {
  await res.json({ message: 'ready to accept requests' })
  
  return res.end()
}

module.exports = {
  health,
}
