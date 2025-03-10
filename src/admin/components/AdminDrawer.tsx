import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CreditCard from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWalletOutlined';
import PersonIcon from '@material-ui/icons/Person';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosNew from '@material-ui/icons/ArrowBackIosNew';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../core/components/Logo';
import { drawerCollapsedWidth, drawerWidth } from '../../core/config/layout';
import AssignmentIcon from '@material-ui/icons/AssignmentOutlined';
import StorefrontIcon from '@material-ui/icons/StorefrontOutlined';
import BusinessIcon from '@material-ui/icons/BusinessOutlined';
import { useAuth } from '../../auth/contexts/AuthContext';
import MoneyOffOutlined from '@material-ui/icons/MoneyOffOutlined';
import DevicesOutlined from '@material-ui/icons/DevicesOutlined';
interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  role?: number;
}

export const menuItems: MenuItem[] = [
  {
    icon: CreditCard,
    label: 'PG사 관리',
    path: '/admin/pg-companies',
  },
  {
    icon: BusinessIcon,
    label: '대리점 관리',
    path: '/admin/agencies',
  },
  {
    icon: StorefrontIcon,
    label: '가맹점 관리',
    path: '/admin/merchants',
  },
  {
    icon: AssignmentIcon,
    label: '계약 관리',
    path: '/admin/contracts',
  },
  {
    icon: MoneyOffOutlined,
    label: '매출 약정 관리',
    path: '/admin/penalty-sales',
  },
  {
    icon: DevicesOutlined,
    label: '기기 약정 관리',
    path: '/admin/penalty-device',
  },
  {
    icon: AccountBalanceWalletIcon,
    label: '정산 관리',
    path: '/admin/settlements',
  },
  {
    icon: PersonOutlinedIcon,
    label: '사용자 관리',
    path: '/admin/users',
    role: 1,
  },
];

type AdminDrawerProps = {
  collapsed: boolean;
  changeCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
};

const AdminDrawer = ({
  collapsed,
  changeCollapsed,
  mobileOpen,
  onDrawerToggle,
}: AdminDrawerProps) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const width = collapsed ? drawerCollapsedWidth : drawerWidth;

  const renderMenuItem = (item: (typeof menuItems)[number]) => {
    const isActive = pathname.startsWith(item.path);
    const Icon = item.icon;
    if (item.role && item.role !== user?.role) {
      return null;
    }
    return (
      <ListItem
        button
        key={item.path}
        component={NavLink}
        to={item.path}
        className={isActive ? 'Mui-selected' : ''}
      >
        <ListItemAvatar>
          <Avatar sx={{ color: 'inherit', bgcolor: 'transparent' }}>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        {!collapsed && <ListItemText primary={item.label} />}
      </ListItem>
    );
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <Logo sx={{ display: 'flex', p: 4 }} />
      <List component="nav" sx={{ px: 2 }}>
        {menuItems.map(renderMenuItem)}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <List component="nav" sx={{ p: 2 }}>
        <ListItem button onClick={() => changeCollapsed(!collapsed)}>
          <ListItemAvatar>
            <Avatar>
              {collapsed ? <ArrowForwardIos /> : <ArrowBackIosNew />}
            </Avatar>
          </ListItemAvatar>
        </ListItem>
        <ListItem button component={NavLink} to="/admin/profile">
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          {user && (
            <ListItemText
              primary={`${user?.name}`}
              sx={{
                display: collapsed ? 'none' : 'block',
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
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: width,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default AdminDrawer;
