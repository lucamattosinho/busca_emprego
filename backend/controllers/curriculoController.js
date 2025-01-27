const models = require('../models');
const { campos, getJSON } = require('../utils/curriculos');
const sendNotification = require('../utils/curriculos/sendNotification');

const vaga = models.Vaga;
const curriculoVaga = models.CurriculosVagas;
const candidatoModel = models.Curriculo;

const createItensModels = async (req, valueBody, model, value, candidato) => {
  const getModel = models[`${model}`];

  const promises = await Promise.all(
    req.body[`${valueBody}`].map((itemModel) =>
      getModel.create(getJSON(value, itemModel, candidato))
    )
  );

  return promises;
};

const curriculo = {
  createCurriculo: async (req, res) => {
    const { idCandidato } = req.params;
    const curriculos = models.Curriculo;
    let candidato = await curriculos.findOne({
      where: {
        id: idCandidato,
      },
    });

    try {
      const itemsModels = await Promise.all(
        campos.map(async (item) => {
          return await createItensModels(
            req,
            item.valueBody,
            item.model,
            item.value,
            candidato
          );
        })
      );
      const findEmptyItem = itemsModels.find((item) => item.length === 0);
      if (findEmptyItem) {
        return res.json({
          message: 'Há campos vazios!',
          ok: false,
        });
      }
      return res.json({
        message: 'Currículo salvo com sucesso!',
        ok: true,
      });
    } catch (e) {
      console.log('ERRP', e);
      return res.json({
        message: 'Que pena, algo deu errado :(',
        ok: false,
      });
    }
  },

  listarCurriculos: async (req, res) => {
    const curriculovaga = models.CurriculosVagas;

    await curriculovaga
      .findAll({
        where: { VagaId: req.params.idVaga },
        include: [
          {
            model: models.Curriculo,
            required: true,
          },
        ],
        order: [['indicacao', 'DESC']],
      })
      .then((curriculos) => res.json({ curriculos }))
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          message: erro,
        });
      });
  },

  listarTodosCurriculos: async (req, res) => {
    const curriculo = models.Curriculo;

    await curriculo
      .findAll()
      .then((curriculos) => res.json({ curriculos }))
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          message: erro,
        });
      });
  },

  listarCurriculosSearch: async (req, res) => {
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;

    const queryId = `%${req.body.id}%`;

    const curriculo = models.Curriculo;

    await curriculo
        .findAll({
            where: {
                id: { [Op.like]: queryId },
            },
            include: [
                {
                    model: curriculo,
                    required: true,
                },
            ],
            })
        .then((curriculos) => res.json({ curriculos }))
        .catch((erro) => {
            return res.status(400).json({
            error: true,
            message: erro,
            });
        });

  },

  listarVagas: async (req, res) => {
    const curriculovaga = models.CurriculosVagas;

    await curriculovaga
      .findAll({
        where: { CurriculoId: req.params.idCurriculo },
        include: [
          {
            model: models.Vaga,
            required: true,
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


  listarCurriculo: async (req, res) => {
    console.log(req.params.idCurriculo);
    const curriculo = models.Curriculo;
    const cursos = models.Cursos;
    const experiencias = models.Experiencias;
    const idiomas = models.Idiomas;
    const idiomasCurriculo = models.CurriculosIdiomas;
    const cursosCurriculo = models.CurriculosCursos;
    const experienciasCurriculo = models.CurriculosExperiencias;
    const instituicao = models.Instituicao;
    const cursosInstituicoes = models.CursosInstituicoes;

    await curriculo
      .findOne({
        where: { id: req.params.idCurriculo },
        include: [
          {
            model: idiomas,
            attributes: ['idioma'],
            through: {
              model: idiomasCurriculo,
              attributes: ['nivel'],
            },
          },
          {
            model: cursos,
            attributes: ['curso'],
            through: {
              model: cursosCurriculo,
              attributes: ['inicio', 'termino'],
            },
            include: [
              {
                model: instituicao,
                attributes: ['nome', 'cidade', 'pais'],
                tableName: 'Instituicoes',
                through: {
                  attributes: [],
                  model: cursosInstituicoes,
                },
              },
            ],
          },
          {
            model: experiencias,
            attributes: ['empresa', 'endereco', 'ramo'],
            through: {
              model: experienciasCurriculo,
              attributes: [
                'inicio',
                'termino',
                'cidade',
                'pais',
                'salario',
                'cargo',
              ],
            },
          },
        ],
      })
      .then((curriculo) => res.json({ curriculo }))
      .catch((erro) => {
        return res.status(400).json({
          error: true,
          message: erro,
        });
      });
  },

  candidatar: async (req, res) => {
    const { idVaga, idCandidato, indicado } = req.body;

    let vagaExists = await vaga.findOne({
      where: {
        id: idVaga,
      },
    });

    let candidatoExists = await candidatoModel.findOne({
      where: {
        id: idCandidato,
      },
    });

    if (!vagaExists) {
      return res.json({ ok: false, data: 'Vaga não existe no banco' });
    }

    if (!candidatoExists) {
      return res.json({ ok: false, data: 'Candidato(a) não existe no banco' });
    }

    let alreadyCandidato = await curriculoVaga.findOne({
      where: {
        VagaId: idVaga,
        CurriculoId: idCandidato,
      },
    });

    if (alreadyCandidato) {
      return res.json({
        ok: false,
        data: 'Candidato(a) já se candidatou à vaga',
      });
    }

    try {
      const response = await curriculoVaga.create({
        VagaId: idVaga,
        CurriculoId: idCandidato,
        indicacao: indicado
      });

      res.json({ ok: true, data: 'Parabéns! Você se candidatou à vaga' });
    } catch (e) {
      res.status(500);
      return res.json({
        data: e,
        ok: false,
      });
    }
  },

  atualizarStatusVaga: async(req, res) => {
    const { curriculoId, vagaId } = req.params;
    const { status } = req.body;
  
    try {
      const processoSeletivo = await curriculoVaga.findOne({
        where: { CurriculoId: curriculoId, VagaId: vagaId }
      });


      const curriculo = await candidatoModel.findOne({
        where: {id: curriculoId}
      })


      const vagaModel = await vaga.findOne({
        where: {id: vagaId}
      })
  

      if (!processoSeletivo) {
        return res.status(404).json({ error: 'Candidatura não encontrada' });
      }

  
      // Atualizando o status e dataAtualizacao
      processoSeletivo.status = status;
      processoSeletivo.dataAtualizacao = new Date();
      await processoSeletivo.save();

  
      const emailDestinatario = "maria20fernanda@gmail.com"; // Supondo que o e-mail esteja no modelo de currículo
      const assunto = `Atualização sobre sua candidatura: ${processoSeletivo.status}`;
      const mensagem = `Olá, sua candidatura para a vaga "${vagaModel.titulo}" foi atualizada para o status: ${processoSeletivo.status}.`;
      
      
      await sendNotification(emailDestinatario, assunto, mensagem)

  
      return res.json({ success: true, processoSeletivo });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar o status do processo seletivo' });
    }

  },

  toggleCurriculo: async (req, res) => {
    const {idCurriculo} = req.params;
    const newVisualizar = req.body.visualizar === true ? 0 : 1;
    const curriculos = models.Curriculo;
    console.log('newVisualizar', newVisualizar);
    await curriculos.update(
        {visualizar: req.body.visualizar},
        {
          where: {
            idCurriculo: idCurriculo,
          },
        }
    )
        .then(() => {
          return res.json({
            error: false,
            message: 'Visibilidade do currículo atualizada com sucesso!',
            newVisualizar: newVisualizar,
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error: true,
            message: 'Ops... houve um erro :(',
          })
        })
  }

};


module.exports = curriculo;
