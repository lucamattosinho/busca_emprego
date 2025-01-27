const express = require('express');
const router = express.Router();
const candidatoController = require('../controllers/candidatoController');
const empresaController = require('../controllers/empresaController');
const authCandidato = require('../middleware/authCandidatoController'); //controller de autenticação de candidato
const authEmpresa = require('../middleware/authEmpresaController'); //controller de autenticação de empresa
const curriculoController = require('../controllers/curriculoController');
const vagaController = require('../controllers/vagaController');
//arquivo para colocar as rotas

//rota de cadastro
router.post('/cadastro/empresas', empresaController.cadastroEmpresa);
router.post('/cadastro/candidatos', candidatoController.cadastroCandidato);

//rota de login
router.post('/login/candidato', candidatoController.loginCandidato);
router.post('/login/empresa', empresaController.loginEmpresa);
router.post('/login/admin', candidatoController.loginAdmin);

//router.use(authCandidato);
//router.use(authEmpresa);

//criar currículo
router.post(
  '/curriculo/:idCandidato',
  authCandidato,
  curriculoController.createCurriculo
);
router.post('/candidatar', authCandidato, curriculoController.candidatar);

//rota de funcionalidades candidato:
//lista todas as vagas que tem no site para o candidato
router.get('/candidato/vagas', authCandidato, candidatoController.listarVagas);

router.get('/candidato/candidaturas', authCandidato, candidatoController.listarCandidaturas);

//lista todas as vagas que tem no site para o candidato
router.post(
  '/candidato/vagas/search',
  authCandidato,
  candidatoController.listarVagasSearch
);
//pega uma vaga especifica da listagem de vagas para o candidato
router.get(
  '/candidato/vagas/:id',
  authCandidato,
  candidatoController.exibirDadosVaga
);

//pega listar todas as vagas que o currículo se candidatou
router.get(
  '/candidato/vagas/:idCurriculo',
  authCandidato,
  curriculoController.listarVagas
);

//rota de funcionalidades empresa

//rota de listagem de currículos de uma vaga de determinada empresa
router.get(
  '/empresa/vaga/curriculos/:idVaga',
  authEmpresa,
  curriculoController.listarCurriculos
);
// rota de listagem de um currículo
router.get(
  '/empresa/curriculo/:idCurriculo',
  authEmpresa,
  curriculoController.listarCurriculo
);
//rota de cadastro de vaga
router.post('/cadastro/vaga', authEmpresa, vagaController.cadastroVaga);
//rota para alterar uma vaga
router.put('/alterar/vaga/:idVaga', authEmpresa, vagaController.alterarVaga);
//rota para listar as vagas da empresa
router.get(
  '/empresa/vagas/:idEmpresa',
  authEmpresa,
  vagaController.listarVagas
);
//rota para deixar uma vaga visível ou não
router.put(
  '/empresa/vagas/toggle/:idVaga',
  authEmpresa,
  vagaController.toggleVaga
);

//rota que exibe dados de uma vaga (essa rota servirá para a alteração da vaga e somente ela)
router.get(
  '/empresa/exibir/vaga/:idVaga',
  authEmpresa,
  vagaController.exibirDadosVaga
);

router.put(
  '/empresa/:vagaId/:curriculoId/status',
  authEmpresa,
  curriculoController.atualizarStatusVaga
);

//rota de funcionalidades admin
router.get('/admin/empresas', vagaController.listarVagasAdmin);
router.get('/admin/curriculos', curriculoController.listarTodosCurriculos);
router.post('/admin/curriculos/search', authCandidato, curriculoController.listarCurriculosSearch);

router.put('/admin/curriculos/:idCurriculo', authCandidato, curriculoController.toggleCurriculo);


module.exports = router;
