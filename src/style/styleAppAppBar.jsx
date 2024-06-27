import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: "999px",
  backdropFilter: "blur(7px)",
  maxHeight: "40px",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor:
    theme.palette.mode === "light"
      ? "hsla(220, 60%, 99%, 0.6)"
      : "hsla(220, 0%, 0%, 0.7)",
  boxShadow:
    theme.palette.mode === "light"
      ? "0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)"
      : "0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)",
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 400,
  fontStyle: "normal",
}));
