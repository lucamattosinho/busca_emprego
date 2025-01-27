import { api } from './baseURL';

export const createCurriculo = async (
  token: string,
  idCandidato: string,
  experiences: Array<any>,
  idiomas: Array<any>,
  cursos: Array<any>
) => {
  const response = await api.post(
    `/usuario/curriculo/${idCandidato}`,
    {
      experiencias: experiences,
      idiomas: idiomas,
      cursos: cursos,
    },
    {
      headers: {
        'authorization-token': token,
      },
    }
  );

  console.log('RESPONSE ----->', response);

  return { ok: response.data.ok, message: response.data.message };
};

export const getCurriculosVaga = async (idVaga: string, token: string) => {
  const response = await api.get(
    `usuario/empresa/vaga/curriculos/${idVaga}`,
    {
      headers: {
        'authorization-token': token,
      },
    }
    );
  return response.data.curriculos;
};

export const listarTodosCurriculos = async (token: string) => {
    const response = await api.get(
        'usuario/admin/curriculos',
        {
            headers: {
                'authorization-token': token,
            },
        }
    );
    return response.data.curriculos;
}

export const listarCurriculosSearch = async (
    token: string,
    id: string
    ) => {
    const response = await api.post(
        'usuario/admin/curriculos/search',
        {
            token,
            id,
        },
        {
        headers: {
            'authorization-token': token,
        },
        }
    );

    return response.data.curriculos;
    }

export const getCurriculo = async(idCurriculo: string, token: string) => {
  const response = await api.get(
    `usuario/empresa/curriculo/${idCurriculo}`,
    {
      headers: {
        'authorization-token': token,
      },
    }
    );
  return response.data.curriculo;
}

export const toggleCurriculo = async (id: string, token: string, visualizar: number) => {
    const response = await api.put(
        `usuario/admin/curriculos/${id}`,
        {
            id,
            visualizar,
        },
        {
        headers: {
            'authorization-token': token,
        },
        }
    );
}
