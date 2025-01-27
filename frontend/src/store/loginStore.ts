import { makeAutoObservable } from 'mobx';
import {
  autenticacaoLoginCandidato,
  autenticacaoLoginEmpresa,
  autenticacaoLoginAdmin,
} from '../service/login';
import { makePersistable, getPersistedStore } from 'mobx-persist-store';
export interface LoginStoreType {
  typeUser: string;
  setTypeUser: (typeUser: string) => void;
  email: string;
  setEmail: (email: string) => void;
  senha: string;
  setSenha: (senha: string) => void;
  authCandidato: () => void;
  authEmpresa: () => void;
  error: string;
  setError: (error: string) => void;
  token: string;
  setToken: (token: string) => void;
  user: { nome: string; id: string };
  setUser: (nome: string, id: string) => void;
  logout: () => void;
  cnpj: string;
  setCnpj: (cnpj: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export class LoginStore implements LoginStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    makePersistable(this, {
      name: 'LoginStore',
      properties: ['token', 'user', 'typeUser'],
      //storage: window.localStorage,
    });
  }

  typeUser: string = '';
  setTypeUser = (typeUser: string) => {
    this.typeUser = typeUser;
  };

  email: string = '';
  setEmail = (email: string) => {
    this.email = email;
  };

  cnpj: string = '';
  setCnpj = (cnpj: string) => {
    this.cnpj = cnpj;
  };

  senha: string = '';
  setSenha = (senha: string) => {
    this.senha = senha;
  };

  error: string = '';
  setError = (error: string) => {
    this.error = error;
  };

  token: string = '';
  setToken = (token: string) => {
    this.token = token;
  };

  loading: boolean = false;
  setLoading(loading: boolean) {
    console.log('LOADING', loading);
    this.loading = loading;
  }

  user: { nome: string; id: string } = { nome: '', id: '' };
  setUser = (nome: string, id: string) => {
    this.user = { nome, id };
  };

  authCandidato = async () => {
    const response = await autenticacaoLoginCandidato(this.email, this.senha);

    if (response?.data.erro) {
      this.setError(response.data.mensagem);
      return { ok: false };
    } else {
      this.setUser(response?.data.nome, response?.data.id);
      this.setToken(response?.data.token);
      this.setTypeUser('candidato');
      return { ok: true };
    }
  };

  authAdmin = async () => {
    const response = await autenticacaoLoginAdmin(this.email, this.senha);

    if (response?.data.erro) {
      this.setError(response.data.mensagem);
      return {ok: false};
    } else {
      this.setUser(response?.data.nome, response?.data.id);
      this.setToken(response?.data.token);
      this.setTypeUser('admin');
      return {ok: true};
    }
  };

  authEmpresa = async () => {
    const response = await autenticacaoLoginEmpresa(this.cnpj, this.senha);

    if (response?.data.erro) {
      this.setError(response.data.mensagem);
      return { ok: false };
    } else {
      this.setUser(response?.data.nome, response?.data.id);
      this.setToken(response?.data.token);
      this.setTypeUser('empresa');
      return { ok: true, id: this.user.id };
    }
  };

  logout = () => {
    this.setToken('');
    this.setUser('', '');
    this.setSenha('');
    this.setCnpj('');
    this.setEmail('');
    this.setTypeUser('');
  };

  getPersistedStore = () => {
    return getPersistedStore(this);
  };
}
