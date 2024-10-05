import { useState } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItemIcon,
  ListItemText,
  AppBar,
  Typography,
  IconButton,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import { useRouter } from "next/router";
import config from "utils/config";

const drawerWidth = 240;

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar (Drawer) */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {config.pages.map((text, index) => (
              <ListItemButton
                key={text}
                onClick={() =>
                  handleNavigation(
                    text === "Home" ? "/" : `/${text.toLowerCase()}`
                  )
                }
              >
                <ListItemIcon>
                  {index === 0 ? (
                    <HomeIcon />
                  ) : index === 1 ? (
                    <DashboardIcon />
                  ) : index === 2 ? (
                    <DashboardIcon />
                  ) : (
                    <DashboardIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
          ml: open ? `${drawerWidth}px` : "0",
          transition: "width 0.3s ease, margin 0.3s ease",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 4,
          ml: open ? "-5px" : `-${drawerWidth}px`, // Remove margin-left when drawer is closed
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%", // Full width when drawer is closed
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
