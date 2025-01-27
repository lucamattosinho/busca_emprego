import {Box, Button, ButtonBase, IconButton, rgbToHex, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import perfilIcon from '../../assets/icons/perfil.png'
import { useState } from 'react'
import { toggleCurriculo } from '../../service/curriculo'
import {useStore} from "../../hooks/stores";
import {useEffect} from "react";

interface CartaoProps {
    listagem: {
        id: string
        perfil: string
        nome: string
        nomeEmpresa: string
        visibilidade: number
    }[],
    idVaga?: string
}

export function ListaCurriculosAdmin(props: CartaoProps) {
    const { listagem, idVaga } = props
    const navigate = useNavigate()
    const { loginStore } = useStore()
    const [visibilidade, setVisibilidade] = useState<{ [key: string]: boolean }>({})

    useEffect(() => {
        const initialVisibilidade = listagem.reduce((acc, item) => {
            acc[item.id] = item.visibilidade === 1;
            return acc;
        }, {} as { [key: string]: boolean });
        setVisibilidade(initialVisibilidade);
    }, [listagem]);

    const handleToggleCurriculo = async (id: string) => {
        const newVisibility = visibilidade[id] ? 0 : 1;
        await toggleCurriculo(id, loginStore.token, newVisibility);
        setVisibilidade((prev) => ({
            ...prev,
            [id]: newVisibility === 1,
        }));
    };

    return (
        <Box>
            {listagem.map(element => (
                <div key={element.id} className="container mx-auto max-w-lg bg-white rounded border mt-4">
                    <div className="flex px-5 pt-5">
                        {element.perfil == null ? (
                            <img className="w-16" src={perfilIcon} style={{marginTop: '-10px', marginLeft: '-10px', marginBottom: '7px'}}/>
                        ) : (
                            <img className="w-16" src={element.perfil} style={{marginTop: '-10px', marginLeft: '-10px', marginBottom: '10px'}}/>
                        )}
                        <span className="pt-2 ml-4">
                            <h3 className="font-bold cursor-pointer" onClick={() => navigate('/empresas/curriculos/' + element.id)}>
                                {element.nome}
                            </h3>
                            <h4 className="text-sm">{element.nomeEmpresa}</h4>
                        </span>
                        <button
                            onClick={() => handleToggleCurriculo(element.id)}
                            className={`py-2.5 px-7 rounded text-sm flex items-center text-white ml-auto ${
                                visibilidade[element.id] ? 'bg-blue-400' : 'bg-gray-300'
                            }`}
                            style={{ marginBottom: '10px' }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-4"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.036 12.322a1.012 1.012 1 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            {visibilidade[element.id] ? 'Visível' : 'Invisível'}
                        </button>
                    </div>
                    <hr/>
                </div>
            ))}
        </Box>
    )
}