const models = require('../models');
const jwt = require('jsonwebtoken');

const candidato = models.Curriculo;
const empresa = models.Empresa;
const vaga = models.Vaga;
const candidatura = models.CurriculosVagas;

const candidatoController = {
  cadastroCandidato: async (req, res) => {
    await candidato
      .create(req.body)
      .then(() => {
        return res.json({
          error: false,
          message: 'Candidato(a) criado(a) com sucesso.',
        });
      })
      .catch((erro) => {
        console.log(erro);
        return res.status(400).json({
          error: true,
          message: 'Falha na criação do(a) candidato(a).',
        });
      });
  },

  loginAdmin: async (req, res) => {
    const admin = models.Administradores;

    let usuario = await admin.findOne({
      where: {
        email: req.body.email,
        senha: req.body.senha,
      },
    });

    if (!usuario)
      return res.json({ erro: true, mensagem: 'Email ou senha inválido' });

    const token = jwt.sign(
        { _id: usuario._id, _cpf: usuario._cpf },
        `${process.env.SECRET}`
    );

    res.json({
      id: usuario.id,
      nome: usuario.nome,
      token: token,
    });
  },

  loginCandidato: async (req, res) => {
    const candidato = models.Curriculo;

    try {
      let usuario = await candidato.findOne({
        where: {
          email: req.body.email,
          senha: req.body.senha,
        },
      });

      if (!usuario)
        return res.json({ erro: true, mensagem: 'Email ou senha inválido' });

      const token = jwt.sign(
        { _id: usuario._id, _cpf: usuario._cpf },
        `${process.env.SECRET}`
      );

      res.json({
        id: usuario.id,
        nome: usuario.nome,
        token: token,
      });
    } catch (e) {
      res.json(e);
    }
  },
  listarVagas: async (req, res) => {
    await vaga
      .findAll({
        where: { visualizar: true },
        include: [
          {
            model: empresa,
            required: true,
            attributes: ['nome', 'logo'],
          },
        ],
      })
      .then((vagas) => res.json({ vagas }))
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          message: erro,
        });
      });
  },

  listarVagasSearch: async (req, res) => {
    const Sequelize = require('sequelize');
    const { Op } = Sequelize;

    const queryTitulo = `%${req.body.titulo}%`;
    const queryDescricao = `%${req.body.descricao}%`;
    const queryEmpresa = `%${req.body.empresa}%`;

    await vaga
      .findAll({
        where: {
          titulo: { [Op.like]: queryTitulo },
          descricao: { [Op.like]: queryDescricao },
          '$empresa.nome$': { [Op.like]: queryEmpresa },
          visualizar: true,
        },
        include: [
          {
            model: empresa,
            required: true,
            attributes: ['nome', 'logo'],
          },
        ],
      })
      .then((vagas) => res.json({ vagas }))
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          message: erro,
        });
      });
  },

  exibirDadosVaga: async (req, res) => {
    await vaga
      .findOne({
        where: { id: req.params.id },
        include: [
          {
            model: empresa,
            required: true,
            attributes: ['nome', 'logo'],
          },
        ],
      })
      .then((vagas) => res.json({ vagas }))
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          message: erro,
        });
      });
  },

  listarCandidaturas: async (req, res) => {
    await candidato
        .findAll({
          where: { id: req.body.id },
          include: [
            {
              model: candidatura,
              required: true,
              include: [
                {
                  model: vaga,
                  required: true,
                  attributes: ['titulo', 'descricao'],
                },
              ],
            },
          ],
        })
  }

};

module.exports = candidatoController;
