const models = require('../models')

const vaga = models.Vaga
const empresa = models.Empresa

//controller de Vaga

const vagaController = {
  cadastroVaga: async (req, res) => {
    await vaga
      .create(req.body)
      .then(() => {
        return res.json({
          error: false,
          message: 'Vaga criada com sucesso!'
        })
      })
      .catch(erro => {
        return res.status(400).json({
          error: true,
          message: 'Ops... houve um erro :('
        })
      })
  },

  listarVagas: async (req, res) => {
    if (req.params.idEmpresa) {
      const usuario = await empresa.findOne({
        where: {
          id: req.params.idEmpresa
        }
      })

      if (!usuario)
        return res.json({ erro: true, mensagem: 'Ops... houve um erro!' })

      await vaga
        .findAll({
          where: { EmpresaId: usuario.id },
          include: [
            {
              model: empresa,
              required: true,
              attributes: ['nome', 'logo']
            }
          ]
        })
        .then(vagas => res.json({ vagas }))
        .catch(erro => {
          return res.status(400).json({
            error: true,
            message: 'Ops... houve um erro :('
          })
        })
    }
  },

  toggleVaga: async (req, res) => {
    const newVisualizar = req.body.visualizar === true ? 0 : 1

    await vaga
      .update(
        { visualizar: newVisualizar },
        {
          where: {
            id: req.params.idVaga
          }
        }
      )
      .then(() =>
        res.json({
          error: false,
          message: 'Alterado com sucesso :)',
          newVisualizar: newVisualizar
        })
      )
      .catch(error => {
        return res.status(400).json({
          error: true,
          message: 'Ops... houve um erro :('
        })
      })
  },

  alterarVaga: async (req, res) => {
    vaga
      .update(req.body, {
        where: {
          id: req.params.idVaga
        }
      })
      .then(() =>
        res.json({
          error: false,
          message: 'Alterado com sucesso :)'
        })
      )
      .catch(error => {
        return res.status(400).json({
          error: true,
          message: 'Ops... houve um erro :('
        })
      })
  },

  listarVagasAdmin: async (req, res) => {
    await vaga
      .findAll({
        include: [
          {
            model: empresa,
            required: true,
            attributes: ['nome', 'logo']
          }
        ]
      })
      .then(vagas => res.json({ vagas }))
      .catch(erro => {
        return res.status(400).json({
          error: true,
          message: erro
        })
      })
  },

  listarVagasSearchAdmin: async (req, res) => {
    const Sequelize = require('sequelize')
    const { Op } = Sequelize

    const queryTitulo = `%${req.body.titulo}%`
    const queryDescricao = `%${req.body.descricao}%`
    const queryEmpresa = `%${req.body.empresa}%`

    await vaga
      .findAll({
        where: {
          titulo: { [Op.like]: queryTitulo },
          descricao: { [Op.like]: queryDescricao },
          '$empresa.nome$': { [Op.like]: queryEmpresa }
        },
        include: [
          {
            model: empresa,
            required: true,
            attributes: ['nome', 'logo']
          }
        ]
      })
      .then(vagas => res.json({ vagas }))
      .catch(erro => {
        return res.status(400).json({
          error: true,
          message: erro
        })
      })
  },

  exibirDadosVaga: async (req, res) => {
    await vaga
      .findOne({
        where: { id: req.params.idVaga },
        include: [
          {
            model: empresa,
            required: true,
            attributes: ['nome', 'logo']
          }
        ]
      })
      .then(vagas => res.json({ vagas }))
      .catch(erro => {
        return res.status(400).json({
          error: true,
          message: 'Ops... houve um erro :('
        })
      })
  }
}

module.exports = vagaController
