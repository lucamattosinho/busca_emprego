import { Avatar, Box, Typography } from "@mui/material"
import { Curriculo } from ".."

type Props = {
    curriculo: Curriculo
}


export const Header = ({curriculo}: Props) => {
    return (
        <>
          <Box
        display="flex"
        paddingX="1rem"
        paddingTop="1.25rem"
        alignItems="start"
      >
            {curriculo.perfil === null ||
              (curriculo.perfil as any) === '' ? (
             <Avatar />
            ) : (
              <Box
                component="img"
                src={curriculo.perfil}
                width="4rem"
                alt="Foto do candidato(a)"
                borderRadius="2rem"
              />
            )}
            <Box component="span" paddingTop="0.5rem" marginLeft="1rem">
              <Typography
                variant="h5"
                fontWeight="bold"
                fontSize="1.3rem"
                color="#32264D"
              >
                {curriculo.nome}
              </Typography>
              <Typography color="#6A6180" fontSize="0.875rem">
                {curriculo.areaAtuacao}
              </Typography>
            </Box>
      </Box>
      <Box
      //  marginX="0.5rem"
        fontSize="0.875rem"
        marginTop="0.5rem"
        paddingX="1.2rem"
        paddingBottom="1.25rem"
        color="#6A6180"
      >
        {curriculo.descricao}
      </Box>
        </>
      
    )
}