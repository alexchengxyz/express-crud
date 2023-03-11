const notFound = (req, res) => res.status(404).json({ result: 'error', msg: 'Not Found' })

export default notFound;