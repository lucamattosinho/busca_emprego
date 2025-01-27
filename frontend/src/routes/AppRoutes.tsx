import { Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useStore } from '../hooks/stores';

import {
  CadastroVaga,
  ListagemCurriculos,
  CadastroCurriculo,
  ListagemVagasCandidato,
  ListagemCurriculoCompleto,
} from '../screens';
import { AlterarVaga } from '../screens/Vagas/AlteraçãoVaga';
import { ExibirVaga } from '../screens/Vagas/ExibirVaga';
import { ListagemVagasEmpresa } from '../screens/Vagas/ListagemVagasEmpresa';
import {ListagemEmpresasAdmin} from "../screens/Admin/ListagemEmpresasAdmin";
import {ListagemCurriculosAdmin} from "../screens/Admin/ListagemCurriculosAdmin";

export function AppRoutes() {
  const { loginStore } = useStore();
  const navigate = useNavigate();
  return (
    <>
      <Sidebar typeUser={loginStore.typeUser} navigate={navigate} />
      <Routes>
        <Route path="candidato/:id/curriculo" element={<CadastroCurriculo />} />
        <Route path="candidato/vagas" element={<ListagemVagasCandidato />} />
        <Route path="candidato/vagas/:id" element={<ExibirVaga />} />
        <Route path="empresa/vaga/:idVaga/curriculos" element={<ListagemCurriculos />} />
        <Route path="empresa/curriculo/:idCurriculo/:idVaga" element={<ListagemCurriculoCompleto />} />
        <Route path="empresa/vagas/:id" element={<ListagemVagasEmpresa />} />
        <Route path="empresa/cadastro/vaga" element={<CadastroVaga />} />
        <Route path="empresa/alterar/vaga/:id" element={<AlterarVaga />} />
        <Route path="admin/empresas" element={<ListagemEmpresasAdmin />} />
        <Route path="admin/curriculos" element={<ListagemCurriculosAdmin />} />
      </Routes>
    </>
  );
}
