import { makeAutoObservable } from "mobx";
import { FormEvent } from "react";
import {
  alteracaoVaga,
  cadastroVaga,
  exibirVagaCandidato,
  exibirVagaEmpresa,
  listarVagasCandidatoSearch,
  listarVagasEmpresa,
  toggleVaga,
  atualizarStatusVaga,
  listarVagasAdminSearch,
  listarVagasAdmin
} from "../service/vagas";

export interface VagaStoreType {
  id: string,
  setId: (
    id: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  titulo: string;
  setTitulo: (
    titulo: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  empresa: string;
  setEmpresa: (
    empresa: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  descricao: string;
  setDescricao: (
    descricao: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  periodo: string;
  setPeriodo: (periodo: string) => void | React.Dispatch<React.SetStateAction<string>>;

  salario: number;
  setSalario: (
    salario: number
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  visualizar: number;
  setVisualizar: (
    visualizar: number
  ) => void | React.Dispatch<React.SetStateAction<number>>;

  erro: string;
  setErro: (
    erro: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  canNavigate: boolean;
  setCanNavigate: (
    canNavigate: boolean
  ) => void | React.Dispatch<React.SetStateAction<string>>;

  empresaId: string;
  setEmpresaId: (
    empresaId: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  
  vaga: ItensList;
  setVaga: (vaga: ItensList) => void;

  vagas: Array<ItensList>;
  setVagas: (vagas: Array<ItensList>) => void;

  clearStatesVaga: () => void;

  handleCreateVaga: (
    token: string,
    e: FormEvent,
    titulo: string,
    periodo: string,
    descricao: string,
    salario: number,
    EmpresaId: string | null,
    setErro: any,
    setCanNavigate: any
  ) => void;

  handleUpdateStatus: (token: string, idCandidato: string,idVaga: string,status: string ) => void
  statusCandidatura: string;
  setStatusCandidatura: (statusCandidatura: string) => void
}

export type ItensList = {
    id: string
    titulo: string
    descricao: string
    periodo: string
    salario: number 
    visualizar: number
    EmpresaId: string
    Empresa: {
      logo: string,
      nome: string
    }
};

export class VagaStore implements VagaStoreType{
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  titulo: string = '';
  setTitulo(titulo: string){
    this.titulo = titulo
  }

  empresa: string = '';
  setEmpresa(empresa: string){
    this.empresa = empresa
  }

  descricao: string = '';
  setDescricao(descricao: string){
    this.descricao = descricao
  }

  periodo: string = '';
  setPeriodo(periodo: string){
    this.periodo = periodo
  }

  salario: number = 0;
  setSalario(salario: number){
    this.salario = salario
  }

  visualizar: number = 0;
  setVisualizar(visualizar: number){
    this.visualizar = visualizar
  }

  erro: string = '';
  setErro(erro: string){
    this.erro = erro
  }

  canNavigate: boolean = false;
  setCanNavigate(canNavigate: boolean){
    this.canNavigate = canNavigate
  }

  empresaId: string = '';
  setEmpresaId(empresaId: string){
    this.empresaId = empresaId
  }

  id: string = '';
  setId(id: string){
    this.id = id
  }

  vaga: ItensList = {
    id: "",
    titulo: "",
    descricao: "",
    periodo: "",
    salario: 0,
    visualizar: 0,
    EmpresaId: "",
    Empresa: {
      logo: "",
      nome: ""
    }
  };
  setVaga(vaga: ItensList) {
    this.vaga = vaga;
  }

  vagas: Array<ItensList> = [];
  setVagas(vagas: Array<ItensList>) {
    this.vagas = vagas;
  }

  clearStatesVaga = () => {
    this.setTitulo('')
    this.setEmpresa('')
    this.setDescricao('')
    this.setPeriodo('')
    this.setSalario(0)
    this.setEmpresaId('')
    this.setErro('')
    this.setVisualizar(0)
    this.setId('')
    this.setCanNavigate(false)
  }

  handleCreateVaga = async (
    token: string,
    e: FormEvent,
    titulo: string,
    periodo: string,
    descricao: string,
    salario: number,
    EmpresaId: string | null,
    setErro: any,
    setCanNavigate: any) => {
      
    const response = await cadastroVaga(token,
      e,
      titulo,
      periodo,
      descricao,
      salario,
      EmpresaId,
      setErro,
      setCanNavigate)

      return response 
  }

  handleShowVagaCandidato = async (id: string, token: string) => {
    const response = await exibirVagaCandidato(id, token)
    return response
  }

  handleShowVagaEmpresa = async (id: string, token: string) => {
    const response = await exibirVagaEmpresa(id, token)
    return response
  }

  handleEditVaga = async (
    id: string,
    token: string,
    e: FormEvent,
    titulo: string,
    periodo: string,
    descricao: string,
    salario: number,
    EmpresaId: string | null,
    setErro: any) => {
      
    const response = await alteracaoVaga(id,
      titulo,
      periodo,
      descricao,
      salario,
      EmpresaId,
      setErro,
      token)

    return response;
  }
 
  handleListarVagasEmpresa = async (id: string, token: string) => {
    const response = await listarVagasEmpresa(id, token)
    return response 
  }

  handleToggleIcon = async (id: string, visualizar: number, token: string) => {
    const response = await toggleVaga(id, visualizar, token)
    return response
  }

  handleSearchVagas = async (token: string, empresa: string, titulo: string, descricao: string) => {
    const response = await listarVagasCandidatoSearch(token, empresa, titulo, descricao)
    return response
  }

  handleSearchVagasAdmin = async (token: string, empresa: string, titulo: string, descricao: string) => {
    const response = await listarVagasAdminSearch(token, empresa, titulo, descricao)
    return response
  }

  handleUpdateStatus = async(token: string,status: string, idCandidato?: string,idVaga?: string,) => {
    const response = await atualizarStatusVaga(  status, token, idVaga, idCandidato,);
    return response
  }
  statusCandidatura: string = '';
  setStatusCandidatura(statusCandidatura: string){
    this.statusCandidatura = statusCandidatura
  }
}