import { Box, ButtonBase, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import perfilIcon from '../../assets/icons/perfil.png'

interface CartaoProps {
    listagem: {
        id: string
        perfil: string
        nome: string
        areaAtuacao: string
        descricao: string
        indicado: boolean
    }[],
    idVaga?: string
}

export function ListarCurriculos(props: CartaoProps) {
    const { listagem, idVaga } = props

    const navigate = useNavigate()

    const curriculosOrdenados = [...listagem].sort((a, b) => (b.indicado ? 1 : 0) - (a.indicado ? 1 : 0))


    return (
        <Box>
            {curriculosOrdenados.map(element => (
                <Box
                    key={element.id}
                    marginX="auto"
                    maxWidth="32rem"
                    bgcolor="#FFFFFF"
                    border-width="px"
                    borderRadius="0.25rem"
                    marginBottom="20px"
                >
                    <Box
                        display="flex"
                        paddingX="1.25rem"
                        paddingTop="1.25rem"
                        alignItems="start"
                        justifyContent="space-between"
                    >
                        <Box display="flex">
                            {element.perfil === null || element.perfil === "" ? (
                                <Box
                                    component="img"
                                    src={perfilIcon}
                                    alt="Currículo sem foto"
                                    width="5rem"
                                />
                            ) : (
                                <Box
                                    component="img"
                                    src={element.perfil}
                                    width="4rem"
                                    alt="Foto do candidato(a)"
                                />
                            )}
                            <Box component="span" paddingTop="0.5rem" marginLeft="1rem">
                                <Typography variant="h5" fontWeight="bold" fontSize="0.875rem">
                                    {element.nome}
                                </Typography>
                                <Typography fontSize="0.875rem">
                                    {element.areaAtuacao}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        marginX="0.5rem"
                        fontSize="0.875rem"
                        marginTop="0.5rem"
                        paddingX="1.25rem"
                        paddingBottom="1.25rem"
                        color="rgb(107 114 128 / var(--tw-text-opacity))"
                    >
                        {element.descricao.length < 250
                            ? element.descricao
                            : element.descricao.substring(0, 50) + ' ...'}
                    </Box>
                    <Box bgcolor="rgb(250 250 249)">
                        <Box
                            padding="1.25rem"
                            marginX="0.5rem"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            border-width="2px"
                        >
                            {element.indicado && (
                                <Typography fontSize="0.875rem" fontWeight="bold" color="#5E80BB">
                                    Este currículo foi indicado para a vaga!
                                </Typography>
                            )}
                            <ButtonBase
                                sx={{
                                    backgroundColor: '#5E80BB',
                                    color: '#FFFFFF',
                                    paddingBlock: '0.625rem',
                                    paddingInline: '1.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.875rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    ':hover': {
                                        backgroundColor: '#4766AC'
                                    }
                                }}
                            >
                                <Box component="span"
                                    onClick={() => navigate(`/empresa/curriculo/${element.id}/${idVaga}`, { state: { idCurriculo: element.id, idVaga: idVaga } } )}>
                                    Expandir Currículo
                                </Box>
                            </ButtonBase>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}