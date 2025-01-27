import { styled } from '@mui/material/styles';

import {
    Avatar as MuiAvatar,
} from '@mui/material';

export const Avatar = styled(MuiAvatar)(({ theme }) => ({
    alignSelf: 'center',
    width: 60,
    height: 60,
    marginBottom: theme.spacing(2),
}));