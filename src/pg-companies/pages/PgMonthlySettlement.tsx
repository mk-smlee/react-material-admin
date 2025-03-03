import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@material-ui/core';
import { useMonthlySettlements } from '../hooks/useMonthlySettlements';
import { MonthlySettlement as MonthlySettlementType } from '../types/monthlySettlement';
import AdminAppBar from '../../admin/components/AdminAppBar';
import AdminToolbar from '../../admin/components/AdminToolbar';
import { usePgCompanyById } from '../hooks/usePgCompanyById';
import { headerCellType } from '../../core/types';

const getDifferenceColor = (value: number) => {
  if (value < 0) return 'red';
  if (value > 0) return 'blue';
  return 'inherit';
};

const StyledDifferenceCell = ({
  value,
  suffix = '',
  isPercentage = false,
}: {
  value: number;
  suffix?: string;
  isPercentage?: boolean;
}) => (
  <TableCell
    align="center"
    sx={{
      color: getDifferenceColor(value),
      fontWeight: 'bold',
    }}
  >
    {isPercentage ? Number(value).toFixed(3) + suffix : value.toLocaleString()}
  </TableCell>
);

const PgMonthlySettlement: React.FC = () => {
  const { id, month } = useParams();
  const { data: pgCompany } = usePgCompanyById(id);
  const { data: monthlySettlements } = useMonthlySettlements(id, month);

  const headerCells: headerCellType[] = [
    { id: 'agencyName', label: '대리점' },
    { id: 'contractMerchantName', label: '가맹점' },
    { id: 'mid', label: 'MID' },
    { id: 'smeGrade', label: '영중소' },
    { id: 'totalSales', label: '거래금액' },
    { id: 'pgCommissionRate', label: 'PG 수수료율', isPercentage: true },
    { id: 'mkCommissionRate', label: 'MK 수수료율', isPercentage: true },
    { id: 'commissionRateDifference', label: '수수료율 차이', isPercentage: true },
    { id: 'pgCommissionAmount', label: 'PG 수수료액' },
    { id: 'mkCommissionAmount', label: 'MK 수수료액' },
    { id: 'commissionAmountDifference', label: '수수료액 차이' },
    // { id: 'pgSurtax', label: 'PG 부가세' },
    // { id: 'mkSurtax', label: 'MK 부가세' },
    // { id: 'surtaxAmountDifference', label: '부가세 차이' },
    // { id: 'pgExpectedPayment', label: 'PG 총액' },
    // { id: 'mkExpectedPayment', label: 'MK 총액' },
    // { id: 'expectedPaymentDifference', label: '총액 차이' },
  ];

  const summary = useMemo(() => {
    if (!monthlySettlements || monthlySettlements.length === 0) return null;
    const count = monthlySettlements.length;
    const sum = (field: keyof MonthlySettlementType) =>
      monthlySettlements.reduce(
        (acc, row) => acc + (Number(row[field]) || 0),
        0,
      );

    return {
      id: '0', // 요약 행의 임의 ID
      pgCompanyName: '',
      agencyName: '합계',
      contractMerchantName: '',
      mid: '',
      smeGrade: '',
      totalSales: sum('totalSales'),
      pgCommissionRate: sum('pgCommissionRate') / count,
      mkCommissionRate: sum('mkCommissionRate') / count,
      commissionRateDifference: sum('commissionRateDifference') / count,
      pgCommissionAmount: sum('pgCommissionAmount'),
      mkCommissionAmount: sum('mkCommissionAmount'),
      commissionAmountDifference: sum('commissionAmountDifference'),
      pgSurtax: sum('pgSurtax'),
      mkSurtax: sum('mkSurtax'),
      surtaxAmountDifference: sum('surtaxAmountDifference'),
      pgExpectedPayment: sum('pgExpectedPayment'),
      mkExpectedPayment: sum('mkExpectedPayment'),
      expectedPaymentDifference: sum('expectedPaymentDifference'),
      createdAt: '',
      updatedAt: '',
    } as MonthlySettlementType;
  }, [monthlySettlements]);

  // 새로운 배열: summary를 맨 앞에 추가
  const dataToRender = useMemo(() => {
    if (!monthlySettlements) return [];
    return summary ? [summary, ...monthlySettlements] : monthlySettlements;
  }, [monthlySettlements, summary]);

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar
          title={`${pgCompany?.pgCompanyName} ${month} 정산 내역`}
        />
      </AdminAppBar>

      <Box p={2}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {headerCells.map((cell) => (
                  <TableCell
                    key={cell.id}
                    align={cell.align || 'center'}
                    sx={{
                      backgroundColor: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {cell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataToRender.map((row: MonthlySettlementType, index: number) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index === 0 && summary ? '#f9f9f9' : '',
                  }}
                >
                  {index === 0 && summary ? (
                    <TableCell
                      align="center"
                      colSpan={4}
                      sx={{ fontWeight: 'bold' }}
                    >
                      합계
                    </TableCell>
                  ) : (
                    <React.Fragment>
                      <TableCell align="center">{row.agencyName}</TableCell>
                      <TableCell align="center">{row.contractMerchantName}</TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: getDifferenceColor(row.commissionRateDifference),
                        }}
                      >
                        {row.mid}
                      </TableCell>
                      <TableCell align="center">{row.smeGrade}</TableCell>
                    </React.Fragment>
                  )}
                  <TableCell align="center">
                    {row.totalSales.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {Number(row.pgCommissionRate).toFixed(3)}%
                  </TableCell>
                  <TableCell align="center">
                    {Number(row.mkCommissionRate).toFixed(3)}%
                  </TableCell>
                  <StyledDifferenceCell
                    value={row.commissionRateDifference}
                    suffix="%"
                    isPercentage
                  />
                  <TableCell align="center">
                    {row.pgCommissionAmount?.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.mkCommissionAmount?.toLocaleString()}
                  </TableCell>
                  <StyledDifferenceCell value={row.commissionAmountDifference} />
                  {/* <TableCell align="center">
                    {row.pg_surtax.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.our_surtax.toLocaleString()}
                  </TableCell>
                  <StyledDifferenceCell value={row.surtax_amount_difference} />
                  <TableCell align="center">
                    {row.pg_expected_payment.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.our_expected_payment.toLocaleString()}
                  </TableCell>
                  <StyledDifferenceCell
                    value={row.expected_payment_difference}
                  /> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default PgMonthlySettlement;
