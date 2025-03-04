import React from 'react';
import { AgencyPenaltyItem, MerchantPenaltyItem } from '../types/penaltySales';
import { Box, TableCell, TableRow, Typography } from '@material-ui/core';

const penaltySalesRow = (agency: AgencyPenaltyItem) => {
  const { merchants } = agency;

  // rowSpan은 (가맹점 수 + 1) → 가맹점들 + 마지막 소계
  const rowSpanCount = merchants.length === 0 ? 2 : merchants.length + 1;

  // 첫 번째 merchant
  const firstMerchant = merchants[0];

  return (
    <React.Fragment key={agency.agencyName}>
      {/* 1) 첫 번째 merchant row */}
      <TableRow>
        {/* 대리점 셀 */}
        <TableCell
          rowSpan={rowSpanCount}
          align="center"
          sx={{
            whiteSpace: 'pre-wrap',
            fontWeight: 'bold',
            borderRight: '1px solid #ccc',
          }}
        >
          <Typography component="div" variant="h6">
            {agency.agencyName}
          </Typography>
          {agency.remarks ? (
            <Typography color="textSecondary" variant="body2">
              {`(비고: ${agency.remarks})`}
            </Typography>
          ) : null}
        </TableCell>

        {/* 첫 번째 가맹점 */}
        {firstMerchant ? (
          <>
            <TableCell align="center">{firstMerchant.merchantName}</TableCell>
            <TableCell align="center">{firstMerchant.mid}</TableCell>
            <TableCell align="center">{firstMerchant.pgCompanyName}</TableCell>
            <TableCell align="center">{firstMerchant.smeGrade}</TableCell>
            <TableCell align="right">
              {firstMerchant.monthlySales.toLocaleString()}
            </TableCell>
          </>
        ) : (
          // 가맹점이 0개라면 빈 칸
          <>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell />
          </>
        )}
      </TableRow>

      {/* 2) 두 번째 ~ 마지막 merchant row */}
      {merchants.slice(1).map((m: MerchantPenaltyItem) => (
        <TableRow key={m.merchantId}>
          <TableCell align="center">{m.merchantName}</TableCell>
          <TableCell align="center">{m.mid}</TableCell>
          <TableCell align="center">{m.pgCompanyName}</TableCell>
          <TableCell align="center">{m.smeGrade}</TableCell>
          <TableCell align="right">{m.monthlySales.toLocaleString()}</TableCell>
        </TableRow>
      ))}

      {/* 3) 마지막 소계 row */}
      <TableRow>
        <TableCell
          colSpan={2}
          align="center"
          sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}
        >
          <Typography component="div" variant="h5">
            {agency.agencyName} 합계
          </Typography>
        </TableCell>
        <TableCell
          colSpan={3}
          align="right"
          sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2">약정액</Typography>
              <Typography color="textSecondary">
                {agency.monthlyCommittedSales.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">매출액</Typography>
              <Typography color="textSecondary">
                {agency.agencyMonthlySales.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">미달성</Typography>
              <Typography
                color={agency.shortfall > 0 ? 'error' : 'textSecondary'}
              >
                {agency.shortfall.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">패널티율</Typography>
              <Typography color="textSecondary">
                {Number(agency.penaltyRate) * 100}%
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
              <Typography
                color={agency.shortfall > 0 ? 'error' : 'textSecondary'}
              >
                {agency.penalty.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default penaltySalesRow;
