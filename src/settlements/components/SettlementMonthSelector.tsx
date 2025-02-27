import React from 'react';
import { TextField, Button, Box } from '@material-ui/core';
import { useSettlementContext } from '../contexts/SettlementContext';

const SettlementMonthSelector = () => {
  const context = useSettlementContext();
  const { selectedMonth, setSelectedMonth } = context;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1}}>
      <TextField
        size="small"
        type="month"
        label="정산 월 선택"
        value={selectedMonth}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      {/* <Button variant="contained" color="primary" sx={{ padding: '8px 12px' }}>
        조회
      </Button> */}
    </Box>
  );
};

export default SettlementMonthSelector;
