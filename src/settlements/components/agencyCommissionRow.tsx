// agency-commission/components/agencyCommissionRow.tsx
import React from 'react';
import { TableRow, TableCell, Typography, Box } from '@material-ui/core';
import { AgencyCommissionItem, MerchantCommissionItem } from '../types/agencyCommission';

/**
 * "대리점 수수료 정산" 테이블 Row 컴포넌트
 * - 대리점 셀 rowSpan
 * - 가맹점들
 * - 마지막 합계 행
 */
const agencyCommissionRow = (agency: AgencyCommissionItem) => {
  const { merchants } = agency;
  // 가맹점이 하나도 없는 경우도 고려
  const rowSpanCount = merchants.length > 0 ? merchants.length + 1 : 2;

  const firstMerchant = merchants[0];

  return (
    <React.Fragment key={agency.agencyId}>
      {/* 첫 번째 Merchant Row */}
      <TableRow>
        {/* 대리점 셀 (rowSpan) */}
        <TableCell
          rowSpan={rowSpanCount}
          align="center"
          sx={{
            whiteSpace: 'pre-wrap',
            fontWeight: 'bold',
            borderRight: '1px solid #ccc',
            minWidth: '120px',
          }}
        >
          {agency.agencyName}
        </TableCell>

        {/* 가맹점이 있는 경우 */}
        {firstMerchant ? (
          <>
            <TableCell align="center">{firstMerchant.mid}</TableCell>
            <TableCell align="center">{firstMerchant.merchantName}</TableCell>
            <TableCell align="center">{firstMerchant.grade}</TableCell>
            <TableCell align="right">
              {firstMerchant.agencyCommission.toLocaleString()}%
            </TableCell>
            <TableCell align="right">
              {firstMerchant.monthlySales.toLocaleString()}
            </TableCell>
            <TableCell align="right">
              {firstMerchant.commissionAmount.toLocaleString()}
            </TableCell>
            <TableCell align="right">
              {firstMerchant.commissionVAT.toLocaleString()}
            </TableCell>
          </>
        ) : (
          // 가맹점이 0개일 때 빈 셀
          <>
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

      {/* 나머지 Merchant Rows */}
      {merchants.slice(1).map((m: MerchantCommissionItem) => (
        <TableRow key={m.contractId}>
          <TableCell align="center">{m.mid}</TableCell>
          <TableCell align="center">{m.merchantName}</TableCell>
          <TableCell align="center">{m.grade}</TableCell>
          <TableCell align="right">
            {m.agencyCommission.toLocaleString()}%
          </TableCell>
          <TableCell align="right">{m.monthlySales.toLocaleString()}</TableCell>
          <TableCell align="right">
            {m.commissionAmount.toLocaleString()}
          </TableCell>
          <TableCell align="right">{m.commissionVAT.toLocaleString()}</TableCell>
        </TableRow>
      ))}

      {/* 마지막: 대리점 합계 Row */}
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
          colSpan={6}
          align="right"
          sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2">총 결제액</Typography>
              <Typography color="textSecondary">
                {agency.totalSales.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">총 수수료</Typography>
              <Typography color="textSecondary">
                {agency.totalCommission.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">VAT</Typography>
              <Typography color="textSecondary">
                {agency.totalVat.toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">총 정산액</Typography>
              <Typography color="textSecondary">
                {agency.totalPayout.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default agencyCommissionRow;
