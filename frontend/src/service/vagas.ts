import { FormEvent } from 'react';
import { api } from './baseURL';

export async function candidatar(
  idCandidato: string,
  token: string,
  idVaga?: string,
  indicado?: boolean
) {
  const response = await api.post(
    `/usuario/candidatar`,
    {
      idVaga,
      idCandidato,
      indicado,
    },
    {
      headers: {
        'authorization-token': token,
      },
    }
  );

  return response.data;
}

export async function atualizarStatusVaga(
  status: string,
  token: string,
  idVaga?: string,
  idCandidato?: string,
) {
  const response = await api.put(
    `/usuario/empresa/${idCandidato}/${idVaga}/status`,
    {
     status
    },
    {
      headers: {
        'authorization-token': token,
      },
    }
  );

  return response.data;
}

export async function cadastroVaga(
  token: string,
  e: FormEvent,
  titulo: string,
  periodo: string,
  descricao: string,
  salario: number,
  EmpresaId: string | null,
  setError: (error: string) => void,
  setCanNavigate: (canNavigate: boolean) => void
) {
  e.preventDefault();

  if (titulo === '' || periodo === '' || descricao === '') {
    return;
  }

  await api
    .post(
      'usuario/cadastro/vaga',
      {
        titulo,
        periodo,
        salario,
        descricao,
        EmpresaId,
      },
      {
        headers: {
          'authorization-token': token,
        },
      }
    )
    .then((res) => {
      if (res.data.erro) {
        setError(res.data.mensagem);
      } else {
        setCanNavigate(true);
      }
    });
}

export async function alteracaoVaga(
  idVaga: any,
  titulo: string,
  periodo: string,
  descricao: string,
  salario: number,
  EmpresaId: string | null,
  setError: (error: string) => void,
  token: string
) {
  let retorno = true;

  if (titulo.length < 5 || titulo.length > 255) {
    setError('O título não foi preenchido corretamente!');
    retorno = false;
  }

  if (periodo.length < 5 || periodo.length > 45) {
    setError('O período não foi preenchido corretamente');
    retorno = false;
  }

  if (descricao.length < 10 || descricao.length > 2000) {
    setError('A descrição não foi preenchida corretamente');
    retorno = false;
  }

  if (salario === 0 || salario > 100000) {
    setError('O salário não foi preenchido corretamente');
    retorno = false;
  }

  const response = await api.put(
    'usuario/alterar/vaga/' + idVaga,
    { titulo, periodo, salario, descricao, EmpresaId },
    { headers: { 'authorization-token': token } }
  );
  if (response.data.error === true) {
    setError('Opss... houve um erro :(');
    retorno = false;
  }

  return retorno;
}

export async function exibirVagaCandidato(id: string, token: string) {
  const response = await api.get('/usuario/candidato/vagas/' + id, {
    headers: {
      'authorization-token': token,
    },
  });
  return response.data.vagas;
}

export const exibirVagaEmpresa = async (id: string, token: string) => {
  const response = await api.get('usuario/empresa/exibir/vaga/' + id, {
    headers: {
      'authorization-token': token,
    },
  });
  return response.data.vagas;
};

export const listarVagasEmpresa = async (id: string, token: string) => {
  const response = await api.get('usuario/empresa/vagas/' + id, {
    headers: {
      'authorization-token': token,
    },
  });
  return response.data.vagas;
};

export const listarVagasCandidato = async (token: string) => {
  const response = await api.get('usuario/candidato/vagas', {
    headers: {
      'authorization-token': token,
    },
  });

  return response.data.vagas;
};

export const listarVagasAdmin = async (token: string) => {
    const response = await api.get('usuario/admin/empresas', {
        headers: {
            'authorization-token': token,
        },
    });

    return response.data.vagas;
};

export const listarVagasAdminSearch = async (
    token: string,
    empresa: string,
    titulo: string,
    descricao: string
    ) => {
    const response = await api.post(
        'usuario/admin/empresas/search',
        {
        token,
        empresa,
        titulo,
        descricao,
        },
        {
        headers: {
            'authorization-token': token,
        },
        }
    );

    return response.data.vagas;
    }

export const listarVagasCandidatoSearch = async (
  token: string,
  empresa: string,
  titulo: string,
  descricao: string
) => {
  const response = await api.post(
    'usuario/candidato/vagas/search',
    {
      token,
      empresa,
      titulo,
      descricao,
    },
    {
      headers: {
        'authorization-token': token,
      },
    }
  );

  return response.data.vagas;
};

export const toggleVaga = async (
  id: string,
  visualizar: number,
  token: string
) => {
  const response = await api.put(
    'usuario/empresa/vagas/toggle/' + id,
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
  return response.data;
};
