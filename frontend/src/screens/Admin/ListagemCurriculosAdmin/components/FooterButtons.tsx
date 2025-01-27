import { Box, ButtonBase } from '@mui/material';
import React from 'react';

// import { Container } from './styles';

type Props = {
    copiarEmail: () => void;
    setOpenModal: (open: boolean) => void
}

const FooterButtons = ({copiarEmail, setOpenModal}: Props ) => {
  return (
    <Box bgcolor="rgb(250 250 249)" display="flex" justifyContent="space-between" flexDirection="row">
    <Box
      padding="1.25rem"
    //  marginX="0.5rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border-width="2px"
      alignSelf="flex-end"
    >
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
            backgroundColor: '#4766AC',
          },
        }}
      >
        <Box onClick={copiarEmail} component="span">
          Entrar em contato
        </Box>
      </ButtonBase>
    </Box>

    <Box
      padding="1.25rem"
      display="flex"
      alignSelf="flex-end"
    >
      <ButtonBase
        sx={{
          backgroundColor: '#5E80BB',
          color: '#FFFFFF',
          paddingBlock: '0.625rem',
          paddingInline: '1.5rem',
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
          display: 'flex',
          ':hover': {
            backgroundColor: '#4766AC',
          },
        }}
      >
        <Box onClick={() => setOpenModal(true)} component="span">
          Atualizar status
        </Box>
      </ButtonBase>
    </Box>
  </Box>
  )
}

export default FooterButtons;