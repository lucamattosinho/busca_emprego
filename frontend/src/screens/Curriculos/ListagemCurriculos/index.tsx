import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurriculosVaga } from '../../../service/curriculo';
import { ListarCurriculos } from '../../../components/Curriculo/ListaCurriculo';
import { Pagination, Box } from '@mui/material';
import { useStore } from '../../../hooks/stores';
import { Header } from '../../../components';

const pageSize = 3;

export function ListagemCurriculos() {
  const { idVaga } = useParams();
  console.log('VAGA ID', idVaga)
  const { loginStore } = useStore();

  const [lista, setLista] = useState<
    {
      id: string;
      perfil: string;
      nome: string;
      areaAtuacao: string;
      descricao: string;
      indicado: boolean;
    }[]
  >([]);

  const [pagination, setPagination] = useState<{
    count: number;
    from: number;
    to: number;
  }>({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const handlePageChange = (event: any, page: any) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
  };

  useEffect(() => {
    async function handleCurriculos() {
      const newList = await getCurriculosVaga(idVaga as any, loginStore.token);

      const curriculos = newList.map((item: { Curriculo: any }) => {
        const curriculo = item.Curriculo;
        return {
          id: curriculo.id,
          nome: curriculo.nome || '',
          perfil: curriculo.perfil || '',
          descricao: curriculo.descricao || 'nsei',
          areaAtuacao: curriculo.areaAtuacao || 'Teste',
        };
      });
      setLista(curriculos);
    }
    handleCurriculos();
  }, []);

  return (
    <Box bgcolor="rgb(245 245 244)">
      <Header titleHeader="Estas são os currículos da vaga..." />

      <Box minHeight="84.2vh" position="relative" bottom="30px">
        <ListarCurriculos listagem={lista} idVaga={idVaga} />
        <Box
          display="flex"
          justifyContent="center"
          position="relative"
          bottom="-30px"
        >
          <Pagination
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handlePageChange}
          />
        </Box>
      </Box>
    </Box>
  );
}
