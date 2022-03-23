import "./DashboardLayout.css";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const menuItmes = [
  {
    label: "Dashboard",
    icon: <DashboardOutlinedIcon />,
    link: "/",
  },
  {
    label: "Preferences",
    icon: <SettingsOutlinedIcon />,
    link: "/preferences",
  },
];

export default function DashboardLayout({ children, clearSession }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // const toggleDrawer = (open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setActiveMenu(open);
  // };
  
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {menuItmes.map((item) => (
          <ListItem
            button
            key={item.label}
            onClick={() => navigate(item.link, { replace: true })}
            selected={location.pathname === item.link}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    clearSession();
  };

  return (
    <div className="panelPage">
    
      <div className="panelPageContainer">
        <div
          style={{
            width: "100%",
            left: activeMenu ? "250px" : "0px",
            position: "relative",
          }}
          className="content"
        >
          <AppBar position="static">
            <Toolbar>
              

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {
                  menuItmes.filter((item) => item.link === location.pathname)[0]
                    .label
                }
              </Typography>

              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
          <div className="contentBody">{children}</div>
        </div>
      </div>
    </div>
  );
}
