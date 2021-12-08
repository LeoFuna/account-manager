const getByCpf = async (_req, res) => {
  res.status(200).json({ messsage: 'Contas recebida' })
}

module.exports = {
  getByCpf
}