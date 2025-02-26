import React from 'react';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { NavLink, Outlet } from 'react-router-dom';
import QueryWrapper from '../../core/components/QueryWrapper';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import SettlementMonthSelector from '../components/SettlementMonthSelector';
import { SettlementProvider } from '../contexts/SettlementContext';

export const settlementMenuItems = [
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

const SettlementsLayout: React.FC = () => {
  return (
    <SettlementProvider>
      <AdminAppBar>
        <AdminToolbar title="정산관리" />
      </AdminAppBar>

      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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

        <SettlementMonthSelector />
      </Box>

      <QueryWrapper>
        <Outlet />
      </QueryWrapper>
    </SettlementProvider>
  );
};

export default SettlementsLayout;
