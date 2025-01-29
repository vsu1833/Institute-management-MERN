/* eslint-disable no-unused-vars */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import ExplicitIcon from "@mui/icons-material/Explicit";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

export default function School() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const navigate = useNavigate();
  const iconColor = "#1E3A8A";

  const handleDrawerOpen = () => {
    setOpen(true);
    setHovered(false);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setHovered(false);
  };

  const handleDrawerHoverOpen = () => {
    if (!open) {
      setOpen(true);
      setHovered(true);
    }
  };

  const handleDrawerHoverClose = () => {
    if (hovered) {
      setOpen(false);
      setHovered(false);
    }
  };

  const handleNavigation = (link) => {
    navigate(link);
  };

  const navArr = [
    {
      link: "/",
      component: "Home",
      icon: <HomeIcon style={{ color: "#1E3A8A" }} />,
    },
    {
      link: "/school",
      component: "Dashboard",
      icon: <SpaceDashboardIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/class",
      component: "Class",
      icon: <FormatListNumberedRtlIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/subject",
      component: "Subject",
      icon: <MenuBookIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/teachers",
      component: "Teachers",
      icon: <SchoolIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/student",
      component: "Student",
      icon: <PeopleAltIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/schedule",
      component: "Schedule",
      icon: <AssignmentIndIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/attendance",
      component: "Attendance",
      icon: <RecentActorsIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/examination",
      component: "Examination",
      icon: <ExplicitIcon style={{ color: iconColor }} />,
    },
    {
      link: "/school/notice",
      component: "Notice",
      icon: <AnnouncementIcon style={{ color: iconColor }} />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            School Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleDrawerHoverOpen}
        onMouseLeave={handleDrawerHoverClose}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navArr.map((navItem) => (
            <ListItem
              key={navItem.component}
              disablePadding
              sx={{ display: "block" }}
            >
              <Tooltip
                title={navItem.component}
                placement="left"
                arrow
                components={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ],
                  },
                }}
              >
                <ListItemButton
                  onClick={() => handleNavigation(navItem.link)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={navItem.component}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
