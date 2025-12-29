import type { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type NavbarProps = {
  title: string;
  actions?: ReactNode;
};

export default function Navbar({ title, actions }: NavbarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: "rgba(18, 32, 58, 0.9)",
          boxShadow: "0 18px 40px rgba(28, 20, 45, 0.25)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h1 className="page__title">{title}</h1>
          </Typography>
          {actions && <div className="page__actions">{actions}</div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
