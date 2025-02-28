import React from 'react';
import { TextField, Box } from '@material-ui/core';
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
    </Box>
  );
};

export default SettlementMonthSelector;
