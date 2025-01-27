import { makeAutoObservable, toJS } from 'mobx';
import { ItensList } from '../types/curriculo';
import {createCurriculo, getCurriculo, listarCurriculosSearch} from '../service';
import { SnackbarStore } from './snackbar';
export interface CurriculoStoreType {
  id: string;
  setId: (id: string) => void | React.Dispatch<React.SetStateAction<string>>;

  nome: string;
  setNome: (nome: string) => void | React.Dispatch<React.SetStateAction<string>>;

  perfil: string;
  setPerfil: (
      perfil: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  nomeEmpresa: string;
  setNomeEmpresa: (
    nomeEmpresa: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  inicio: string;
  setInicio: (
    inicio: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  fim: string;
  setFim: (fim: string) => void | React.Dispatch<React.SetStateAction<string>>;

  cargo: string;
  setCargo: (
    fim: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  experiencias: Array<ItensList>;
  setExperiencias: (experiencias: Array<ItensList>) => void;

  visibilidade: number;
  setVisibilidade: (visibilidade: number) => void | React.Dispatch<React.SetStateAction<number>>;

  curriculos: Array<ItensList2>;
  setCurriculos: (curriculos: Array<ItensList2>) => void;

  clearStatesCurriculo: () => void;
  handleSaveExperience: () => void;
  createExperience: () => void;

  handleCreateCurriculo: (
    token: string,
    id: string,
    createExperiencias: any,
    createIdiomas: any,
    createCursos: any
  ) => void;
}

export type ItensList2 = {
  id: string,
  perfil: string,
  nome: string,
  nomeEmpresa: string,
  visibilidade: number,
}

export class CurriculoStore implements CurriculoStoreType {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  id: string = '';
  setId(id: string) {
      this.id = id;
  }

  nome: string = '';
  setNome(nome: string) {
      this.nome = nome;
  }

  perfil: string = '';
  setPerfil(perfil: string) {
      this.perfil = perfil;
  }

  nomeEmpresa: string = '';
  setNomeEmpresa(nomeEmpresa: string) {
    this.nomeEmpresa = nomeEmpresa;
  }

  inicio: string = '';
  setInicio(inicio: string) {
    this.inicio = inicio;
  }

  fim: string = '';
  setFim(fim: string) {
    this.fim = fim;
  }

  cargo: string = '';
  setCargo(cargo: string) {
    this.cargo = cargo;
  }

  experiencias: Array<ItensList> = [];
  setExperiencias(experiencias: Array<ItensList>) {
    this.experiencias = experiencias;
  }

  loading: boolean = false;
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  visibilidade: number = 0;
  setVisibilidade(visibilidade: number) {
      this.visibilidade = visibilidade;
  }

  curriculo: ItensList2 = {
    id: '',
    perfil: '',
    nome: '',
    nomeEmpresa: '',
    visibilidade: 0,
  }

  curriculos: Array<ItensList2> = [];
  setCurriculos(curriculos: Array<ItensList2>) {
      this.curriculos = curriculos;
  }

  clearStatesCurriculo = () => {
    this.setCargo('');
    this.setInicio('');
    this.setFim('');
    this.setNomeEmpresa('');
  };

  handleSaveExperience = () => {
    if (this.cargo && this.fim && this.nomeEmpresa && this.inicio) {
      const item = {
        firstItem: this.nomeEmpresa,
        secondItem: this.cargo,
        thirdItem: this.inicio,
        fourItem: this.fim,
      };
      this.setExperiencias([item, ...this.experiencias]);
      this.clearStatesCurriculo();
    }
  };

  createNewExperience() {
    if (!this.experiencias.length) {
      const experienceItem = {
        firstItem: this.cargo,
        secondItem: this.fim,
        thirdItem: this.inicio,
        fourItem: this.nomeEmpresa,
      };

      this.setExperiencias([experienceItem, ...this.experiencias]);
    }
  }

  createExperience() {
    const newId = Math.floor(Math.random() * 100);

    const experiencias = this.experiencias
      .filter((i) => i.firstItem !== '')
      .map((i, index) => {
        return {
          id: newId,
          empresa: i.firstItem,
          cargo: i.secondItem,
          inicio: i.thirdItem,
          termino: i.fourItem,
          endereco: 'Rua Palmital',
          ramo: 'algum',
        };
      });

    return experiencias;
  }

  handleSearchCurriculos = async (token: string, id: string) => {
    const response = await listarCurriculosSearch(id, token);
    return response;
  }

  async handleCreateCurriculo(
    token: string,
    id: string,
    createExperiencias: any,
    createIdiomas: any,
    createCursos: any
  ) {
    const experiencias = createExperiencias();
    const idiomas = createIdiomas();
    const cursos = createCursos();

    const response = await createCurriculo(
      token,
      id as any,
      experiencias,
      idiomas,
      cursos
    );

    return response;
  }
}
