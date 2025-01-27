import { ButtonBase } from "@mui/material"

export const BaseButton = ({children, backgroundColor, extraStyle}: any) => {
    return (
    <ButtonBase
    sx={{
      backgroundColor: backgroundColor,
      marginTop: 4,
      paddingBlock: '0.625rem',
      height: '2.5rem',
      paddingInline: '1.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.875rem',
      display: 'flex',
      alignItems: 'center',
     
      ...extraStyle
    }}
  >
    {children}
  </ButtonBase>
    )
}