import React from 'react';
import { AgencyPenaltyItem, MerchantPenaltyItem } from '../types/penaltySales';
import { Box, TableCell, TableRow, Typography } from '@material-ui/core';

const penaltySalesRow = (agency: AgencyPenaltyItem) => {
  const { merchants } = agency;
  // 대리점의 매출합
  const totalSales = merchants.reduce(
    (acc, cur) => acc + (cur.monthlySales || 0),
    0,
  );

  // rowSpan은 (가맹점 수 + 1) → 가맹점들 + 마지막 소계
  const rowSpanCount = merchants.length + 1;

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
          sx={{ whiteSpace: 'pre-wrap', fontWeight: 'bold' }}
        >
          {`${
            agency.agencyName
          } \n(약정 ${agency.monthlyCommittedSales.toLocaleString()}원)`}
        </TableCell>

        {/* 첫 번째 가맹점 */}
        {firstMerchant ? (
          <>
            <TableCell align="center">{firstMerchant.merchantName}</TableCell>
            <TableCell align="center">{firstMerchant.mid}</TableCell>
            <TableCell align="center">{firstMerchant.pgCompanyName}</TableCell>
            <TableCell align="center">{firstMerchant.grade}</TableCell>
            <TableCell align="right">
              {firstMerchant.monthlySales.toLocaleString()}
            </TableCell>
          </>
        ) : (
          // 가맹점이 0개라면(이론상 없겠지만) 빈 칸
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
          <TableCell align="center">{m.grade}</TableCell>
          <TableCell align="right">{m.monthlySales.toLocaleString()}</TableCell>
        </TableRow>
      ))}

      {/* 3) 마지막 소계 row */}
      <TableRow>
        <TableCell
          align="center"
          sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}
        >
          <Typography component="div" variant="h4">
            {agency.agencyName} 합계
          </Typography>
        </TableCell>
        <TableCell
          colSpan={4}
          align="center"
          sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="div" variant="h6">
                약정액
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {agency.monthlyCommittedSales.toLocaleString()}원
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="div" variant="h6">
                매출액
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {totalSales.toLocaleString()}원
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="div" variant="h6">
                미달성
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {agency.shortfall.toLocaleString()}원
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography component="div" variant="h6">
                패널티
              </Typography>
              <Typography color="textSecondary" variant="body2">
                {agency.penalty.toLocaleString()}원
              </Typography>
            </Box>
          </Box>

          {/* 예: 대리점 매출액: X원, 미달성: X원, 패널티: X원 */}
          {/* {`${agency.agencyName} 매출액: ${totalSales.toLocaleString()}원, ` +
            `미달성: ${agency.shortfall.toLocaleString()}원, ` +
            `패널티: ${agency.penalty.toLocaleString()}원`} */}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default penaltySalesRow;
