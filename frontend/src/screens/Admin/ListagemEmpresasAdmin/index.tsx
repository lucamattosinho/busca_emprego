import { FormEvent, useEffect, useState } from 'react';
import { ListaAdmin } from '../../../components/ListaVagas/Admin/ListaEmpresasAdmin';
import { useStore } from '../../../hooks/stores';
import { listarVagasAdmin} from "../../../service/vagas";
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const ListagemEmpresasAdmin = observer(() => {
    const { loginStore, vagaStore } = useStore();
    const { vagas, setVagas } = vagaStore;
    const [visibilidade, setVisibilidade] = useState<{ [key: string]: boolean }>({});
    const { empresa, titulo, descricao, setEmpresa, setTitulo } = vagaStore;

    const handleVagasAdmin = async () => {
        const newList = await listarVagasAdmin(loginStore.token);
        setVagas(newList);
    };

    const handleSearchVaga = async (e: FormEvent) => {
        e.preventDefault();
        const newList = await vagaStore.handleSearchVagasAdmin(loginStore.token, empresa, titulo, descricao);
        setVagas(newList);
    };

    useEffect(() => {
        handleVagasAdmin();
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
                    Encontramos as seguintes vagas....
                </h2>
            </Box>
            <Box className="max-w-full" bgcolor="rgb(245 245 244)">
                <Box bgcolor="rgb(245 245 244)">
                    <form className="ml-2" onSubmit={handleSearchVaga}>
                        <Box className="container mx-auto max-w-lg relative bottom-10 flex justify-between">
                            <Box className="w-40">
                                <label className="text-sm text-white" htmlFor="empresa">
                                    Empresa
                                </label>
                                <input
                                    className="bg-white rounded border w-11/12 p-1 focus:outline-none focus:ring-2 focus:ring-background1"
                                    type="text"
                                    id="empresa"
                                    value={empresa}
                                    onChange={event => setEmpresa(event.target.value)}
                                />
                            </Box>
                            <Box className="w-40">
                                <label className="text-sm text-white" htmlFor="titulo">
                                    Título
                                </label>
                                <input
                                    className="bg-white rounded border w-11/12 p-1 focus:outline-none focus:ring-2 focus:ring-background1"
                                    type="text"
                                    id="titulo"
                                    value={titulo}
                                    onChange={event => setTitulo(event.target.value)}
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
                <ListaAdmin listagem={vagas}/>
            </Box>
        </Box>
    );
});