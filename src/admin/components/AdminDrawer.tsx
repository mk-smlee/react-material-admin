import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CreditCard from "@material-ui/icons/CreditCard";
import PeopleIcon from "@material-ui/icons/People";
import PersonIcon from "@material-ui/icons/Person";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosNew from "@material-ui/icons/ArrowBackIosNew";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import Logo from "../../core/components/Logo";
import { drawerCollapsedWidth, drawerWidth } from "../../core/config/layout";

type AdminDrawerProps = {
  collapsed: boolean;
  changeCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
};

export const menuItems = [
  {
    icon: CreditCard,
    label: "PG사 관리",
    path: "/admin",
  },
  {
    icon: PeopleIcon,
    label: "사용자 관리",
    path: "/admin/user-management",
  },
];

const AdminDrawer = ({
  collapsed,
  changeCollapsed,
  mobileOpen,
  onDrawerToggle,
}: AdminDrawerProps) => {
  const { userInfo } = useAuth();
  const width = collapsed ? drawerCollapsedWidth : drawerWidth;

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100%" }}>
      <Logo sx={{ display: "flex", p: 4 }} />
      <List component="nav" sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            component={NavLink}
            key={item.path}
            activeClassName="Mui-selected"
            end={true}
            to={`/${item.path}`}
          >
            <ListItemAvatar>
              <Avatar sx={{ color: "inherit", bgcolor: "transparent" }}>
                <item.icon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.label}
              sx={{
                display: collapsed ? "none" : "block",
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List component="nav" sx={{ p: 2 }}>
      <ListItem button onClick={() => changeCollapsed(!collapsed)}>
          <ListItemAvatar>
            <Avatar>
              { collapsed ? <ArrowForwardIos /> : <ArrowBackIosNew /> } 
            </Avatar>
          </ListItemAvatar>
        </ListItem>
        <ListItem button component={NavLink} to={`/admin/profile`}>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          {userInfo && (
            <ListItemText
              primary={`${userInfo.firstName} ${userInfo.lastName}`}
              sx={{
                display: collapsed ? "none" : "block",
              }}
            />
          )}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      aria-label="관리자 메뉴"
      component="nav"
      sx={{
        width: { lg: width },
        flexShrink: { lg: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // 모바일에서 더 나은 성능을 위해 유지
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", lg: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: width,
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AdminDrawer;
