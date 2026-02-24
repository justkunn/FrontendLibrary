import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "../../../shared/components/Button.tsx";

type ButtonAppBarProps = {
  onRefresh: () => void;
  onCreate: () => void;
  loading?: boolean;
  title?: string;
};

export default function ButtonAppBar({
  onRefresh,
  onCreate,
  loading = false,
  title = "Books",
}: ButtonAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <div>
              <h1 className="text-[clamp(2.2rem,2.8vw,3.2rem)] leading-none text-[#b8b2b2]">
                {title}
              </h1>
            </div>
          </Typography>
          <div className="flex flex-wrap gap-2.5">
            <Button variant="ghost" onClick={onRefresh} disabled={loading}>
              Refresh
            </Button>
            <Button variant="primary" onClick={onCreate}>
              + Tambah Buku
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
