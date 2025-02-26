import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import { Outlet, useLocation } from "react-router-dom";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSettings } from "../../core/contexts/SettingsProvider";
import AdminDrawer from "../components/AdminDrawer";

const AdminLayout = () => {
  const { collapsed, changeCollapsed, open, toggleDrawer } = useSettings();
  const location = useLocation(); 

  return (
    <Box sx={{ display: "flex" }}>
      <AdminDrawer
        collapsed={collapsed}
        changeCollapsed={changeCollapsed}
        mobileOpen={open}
        onDrawerToggle={toggleDrawer}
      />

      <Box component="main" sx={{ flexGrow: 1, pb: 3, px: { xs: 3, sm: 6 } }}>
        <Toolbar />
        <QueryWrapper key={location.pathname}>
          <Outlet />
        </QueryWrapper>
      </Box>
    </Box>
  );
};

export default AdminLayout;
