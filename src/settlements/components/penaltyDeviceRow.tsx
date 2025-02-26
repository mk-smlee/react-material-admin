import React from 'react';
import { TableRow, TableCell, Typography, Box } from '@material-ui/core';
import { AgencyDeviceItem, MerchantDeviceItem } from '../types/penaltyDevice';

const penaltyDeviceRow = (agency: AgencyDeviceItem) => {
  const { merchants } = agency;
  const rowSpanCount = merchants.length + 1; // 가맹점 수 + 마지막 소계 행
  const firstMerchant = merchants[0];

  return (
    <React.Fragment key={agency.agencyName}>
      {/* 1) 첫 번째 가맹점 행 */}
      <TableRow>
        {/* 대리점 셀 rowspan */}
        <TableCell
          rowSpan={rowSpanCount}
          align="center"
          sx={{
            whiteSpace: 'pre-wrap',
            fontWeight: 'bold',
            borderRight: '1px solid #ccc',
          }}
        >
          {agency.agencyName}
        </TableCell>

        {firstMerchant ? (
          <>
            <TableCell align="center">{firstMerchant.merchantName}</TableCell>
            <TableCell align="center">{firstMerchant.mid}</TableCell>
            <TableCell align="center">{firstMerchant.grade}</TableCell>
            <TableCell align="center">
              {firstMerchant.windowCount.toLocaleString()}
            </TableCell>
            <TableCell align="center">
              {firstMerchant.androidCount.toLocaleString()}
            </TableCell>
            <TableCell align="center">
              {firstMerchant.posCount.toLocaleString()}
            </TableCell>
            <TableCell align="right">
              {firstMerchant.contractAmount.toLocaleString()}
            </TableCell>
            <TableCell align="right">
              {firstMerchant.monthlySales.toLocaleString()}
            </TableCell>
            <TableCell align="right">{firstMerchant.remarks}</TableCell>
          </>
        ) : (
          // 가맹점이 없는 경우 (이론상 없겠지만)
          <>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </>
        )}
      </TableRow>

      {/* 2) 두 번째 ~ 마지막 가맹점 행 */}
      {merchants.slice(1).map((m: MerchantDeviceItem) => (
        <TableRow key={m.merchantId}>
          <TableCell align="center">{m.merchantName}</TableCell>
          <TableCell align="center">{m.mid}</TableCell>
          <TableCell align="center">{m.grade}</TableCell>
          <TableCell align="center">{m.windowCount.toLocaleString()}</TableCell>
          <TableCell align="center">
            {m.androidCount.toLocaleString()}
          </TableCell>
          <TableCell align="center">{m.posCount.toLocaleString()}</TableCell>
          <TableCell align="right">
            {m.contractAmount.toLocaleString()}
          </TableCell>
          <TableCell align="right">{m.monthlySales.toLocaleString()}</TableCell>
          <TableCell align="right">{m.remarks}</TableCell>
        </TableRow>
      ))}

      {/* 3) 마지막 소계행: 대리점 전체 합계 */}
      <TableRow>
        {/* "대리점명 합계" 칸 등 필요하면 재구성 */}
        <TableCell
          align="center"
          sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}
        >
          <Typography component="div" variant="h5">
            {agency.agencyName} 합계
          </Typography>
        </TableCell>
        {/* colSpan = 전체 열 - 이미 1칸 사용 */}
        <TableCell
          colSpan={8}
          align="right"
          sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2">약정금액</Typography>
              <Typography color="textSecondary">
                {agency.agencyMonthlyCommitted.toLocaleString()}원
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">월매출</Typography>
              <Typography color="textSecondary">
                {agency.agencyMonthlySales.toLocaleString()}원
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">미달성</Typography>
              <Typography color="textSecondary">
                {agency.shortfall.toLocaleString()}원
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">패널티율</Typography>
              <Typography color="textSecondary">
                {Number(agency.averagePenaltyRate) * 100}%
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <Typography variant="subtitle2">패널티</Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ marginLeft: '1px' }}
                >
                  (VAT 제외)
                </Typography>
              </Box>
              <Typography color="textSecondary">
                {agency.totalPenalty.toLocaleString()}원
              </Typography>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default penaltyDeviceRow;
