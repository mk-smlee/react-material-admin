import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import QueryWrapper from '../../core/components/QueryWrapper';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';

const settlementMenuItems = [
  {
    label: '대리점 정산',
    path: '',
  },
  {
    label: '매출 약정 패널티',
    path: './penalty/sales',
  },
  {
    label: '기기 약정 패널티',
    path: './penalty/device',
  },
];

const Settlements = () => {
  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar title="정산관리" />
      </AdminAppBar>
      <Box sx={{ mb: 4 }}>
        <Tabs aria-label="정산 관리 메뉴" value={false}>
          {settlementMenuItems.map((item) => (
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
    </React.Fragment>
  );
};

export default Settlements;
