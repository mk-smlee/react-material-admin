import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/contexts/AuthProvider";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";

const profileMenuItems = [
  {
    label: "프로필 정보",
    path: "./",
  },
];

const Profile = () => {
  const { logout, userInfo } = useAuth();
  const snackbar = useSnackbar();

  const handleLogout = () => {
    logout().catch(() =>
      snackbar.error("예상치 못한 오류가 발생했습니다.")
    );
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar>
          <Fab
            aria-label="로그아웃"
            color="secondary"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </Fab>
        </AdminToolbar>
      </AdminAppBar>
      <Grid container spacing={12}>
        <Grid item xs={12} md={4} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "background.paper",
                mb: 3,
                height: 160,
                width: 160,
              }}
            >
              <PersonIcon sx={{ fontSize: 120 }} />
            </Avatar>
            <Typography
              component="div"
              variant="h4"
            >{`${userInfo?.firstName} ${userInfo?.lastName}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} marginTop={3}>
          <Box sx={{ mb: 4 }}>
            <Tabs aria-label="프로필 메뉴" value={false}>
              {profileMenuItems.map((item) => (
                <Tab
                  key={item.label}
                  activeClassName="Mui-selected"
                  end={true}
                  component={NavLink}
                  label={item.label}
                  to={item.path}
                />
              ))}
            </Tabs>
          </Box>
          <QueryWrapper>
            <Outlet />
          </QueryWrapper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
