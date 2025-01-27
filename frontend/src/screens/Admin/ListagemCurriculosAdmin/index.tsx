import {FormEvent, useEffect, useState} from 'react';
import {ListaCurriculosAdmin} from "../../../components/Curriculo/ListaCurriculoAdmin";
import { useStore } from '../../../hooks/stores';
import {getCurriculo, listarTodosCurriculos} from '../../../service/curriculo';
import { Typography, ButtonBase, Box, Snackbar, Alert, Select, MenuItem, FormControl } from '@mui/material';
import {observer} from "mobx-react-lite";

export interface Idioma {
    nome: string;
    nivel: string;
}

export interface Curso {
    curso: string;
    inicio: string;
    termino: string;
    instituicao: string;
    cidade: string;
    pais: string;
}

export interface Experiencia {
    empresa: string;
    ramo: string;
    inicio: string;
    termino: string;
    cidade: string;
    pais: string;
    cargo: string;
}

export interface Curriculo {
    id: string;
    email: string;
    perfil: string;
    nome: string;
    areaAtuacao: string;
    descricao: string;
    idiomas: Idioma[];
    cursos: Curso[];
    experiencias: Experiencia[];
}

type Params = {
    idCurriculo: string, idVaga: string
}

export const ListagemCurriculosAdmin= observer(() => {
    const { curriculoStore, loginStore } = useStore();
    const { id, nome, perfil, curriculos, nomeEmpresa, setCurriculos, setId } = curriculoStore;

    const handleCurriculos = async () => {
        const newList = await listarTodosCurriculos(loginStore.token);
        setCurriculos(newList);
    };

    const handleSearchCurriculo = async (e: FormEvent) => {
        e.preventDefault();
        const newList = await curriculoStore.handleSearchCurriculos(loginStore.token, id);
        setCurriculos(newList);
    };

    useEffect(() => {
        handleCurriculos();
    }, []);


    return (
        <Box>
            <Box>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white m-3.5"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </Box>
            <Box className="container mx-auto max-w-lg mb-16">
                <h2 className="text-white text-2xl mt-3">
                    Encontramos os seguintes currículos....
                </h2>
            </Box>
            <Box bgcolor="rgb(245 245 244)">
                <Box bgcolor="rgb(245 245 244)">
                    <form className="ml-2" onSubmit={handleSearchCurriculo}>
                        <Box className="container mx-auto max-w-lg relative bottom-10 flex justify-between">
                            <Box className="w-40">
                                <label className="text-sm text-white" htmlFor="curriculo">
                                    ID do currículo
                                </label>
                                <input
                                    className="bg-white rounded border w-11/12 p-1 focus:outline-none focus:ring-2 focus:ring-background1"
                                    type="text"
                                    id="id"
                                    value={id}
                                    onChange={event => setId(event.target.value)}
                                />
                            </Box>
                            <Box className="w-40">
                                <button
                                    type="submit"
                                    className="border-solid border-2 border-zinc-100 mt-4 bg-background1 text-white py-2.5 px-6 rounded-lg text-sm"
                                >
                                    Procurar
                                </button>
                            </Box>
                        </Box>
                    </form>
                </Box>

                <Box minHeight="84.2vh" position="relative" bottom="30px">
                    <ListaCurriculosAdmin listagem={curriculos}/>

                </Box>
            </Box>
        </Box>
    );
});
