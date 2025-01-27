import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../hooks/stores';
import { observer } from 'mobx-react-lite';
import { toggleVaga } from '../../../service/vagas';
import { useState, useEffect } from 'react';

interface ListaProps {
    listagem: {
        id: string;
        titulo: string;
        descricao: string;
        periodo: string;
        salario: number;
        visualizar: number;
        EmpresaId: string;
        Empresa: {
            logo: string;
            nome: string;
        };
    }[];
}

export const ListaAdmin = observer((props: ListaProps) => {
    const navigate = useNavigate();
    const { listagem } = props;
    const { loginStore, vagaStore } = useStore();

    const [visibilidade, setVisibilidade] = useState<{ [key: string]: boolean }>(
        listagem.reduce((acc, e) => ({ ...acc, [e.id]: e.visualizar === 1 }), {})
    );

    const handleToggleVaga = async (id: string) => {
        const visibilidadeNova = !visibilidade[id]; // Inverte o valor de visibilidade
        await toggleVaga(id, visibilidadeNova ? 1 : 0, loginStore.token);
        setVisibilidade((prev) => ({ ...prev, [id]: visibilidadeNova })); // Atualiza o estado com a nova visibilidade
    };

    return (
        <div>
            {listagem.map((e) => (
                <div key={e.id} className="container mx-auto max-w-lg bg-white rounded border mt-4">
                    <div className="flex px-5 pt-5">
                        {e.Empresa.logo == null ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-20 text-background1"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                />
                            </svg>
                        ) : (
                            <img className="w-16" src={e.Empresa.logo} />
                        )}

                        <span className="pt-2 ml-4">
                            <h3 className="font-bold cursor-pointer" onClick={() => navigate('/candidato/vagas/' + e.id)}>
                                {e.titulo}
                            </h3>
                            <h4 className="text-sm">{e.Empresa.nome}</h4>
                        </span>
                    </div>
                    <hr />
                    <div className="bg-stone-50">
                        <div className="p-5 mx-2 flex justify-between items-center">
                            <p className="text-slate-400">{e.periodo}</p>
                            <button
                                onClick={() => handleToggleVaga(e.id)}
                                className={`py-2.5 px-6 rounded text-sm flex items-center text-white ${
                                    visibilidade[e.id] ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
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
                                {visibilidade[e.id] ? 'Visível' : 'Invisível'}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
});
