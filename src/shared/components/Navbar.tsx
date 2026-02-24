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
        <Toolbar className="py-2">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <h1 className="text-[clamp(2.2rem,2.8vw,3.2rem)] leading-none text-[#b8b2b2]">
              {title}
            </h1>
          </Typography>
          {actions && <div className="flex flex-wrap gap-2.5">{actions}</div>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
