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

const MonthlySettlement: React.FC = () => {
  const { id, month } = useParams();
  const { data: pgCompany } = usePgCompanyById(id);
  const { data: monthlySettlements } = useMonthlySettlements(id, month);

  const headerCells: {
    id: string;
    label: string;
    align?: 'center' | 'left' | 'right';
    isPercentage?: boolean;
  }[] = [
    { id: 'agency_name', label: '대리점' },
    { id: 'merchant_name', label: '가맹점' },
    { id: 'mid', label: 'MID' },
    { id: 'sme_grade', label: '영중소' },
    { id: 'total_sales', label: '거래금액' },
    { id: 'pg_fee_rate', label: 'PG 수수료율', isPercentage: true },
    { id: 'our_fee_rate', label: 'MK 수수료율', isPercentage: true },
    { id: 'fee_rate_difference', label: '수수료율 차이', isPercentage: true },
    { id: 'pg_calculated_fee', label: 'PG 수수료액' },
    { id: 'our_calculated_fee', label: 'MK 수수료액' },
    { id: 'fee_amount_difference', label: '수수료액 차이' },
    { id: 'pg_surtax', label: 'PG 부가세' },
    { id: 'our_surtax', label: 'MK 부가세' },
    { id: 'surtax_amount_difference', label: '부가세 차이' },
    { id: 'pg_expected_payment', label: 'PG 총액' },
    { id: 'our_expected_payment', label: 'MK 총액' },
    { id: 'expected_payment_difference', label: '총액 차이' },
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
      agency_name: '합계',
      merchant_name: '',
      mid: '',
      sme_grade: '',
      total_sales: sum('total_sales'),
      pg_fee_rate: sum('pg_fee_rate') / count,
      our_fee_rate: sum('our_fee_rate') / count,
      fee_rate_difference: sum('fee_rate_difference') / count,
      pg_calculated_fee: sum('pg_calculated_fee'),
      our_calculated_fee: sum('our_calculated_fee'),
      fee_amount_difference: sum('fee_amount_difference'),
      pg_surtax: sum('pg_surtax'),
      our_surtax: sum('our_surtax'),
      surtax_amount_difference: sum('surtax_amount_difference'),
      pg_expected_payment: sum('pg_expected_payment'),
      our_expected_payment: sum('our_expected_payment'),
      expected_payment_difference: sum('expected_payment_difference'),
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
        <AdminToolbar title={`${pgCompany?.name} ${month} 정산 내역`} />
      </AdminAppBar>

      <Box p={2}>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto' }}
        >
          <Table stickyHeader>
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
                <TableRow key={index}>
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
                      <TableCell align="center">{row.agency_name}</TableCell>
                      <TableCell align="center">{row.merchant_name}</TableCell>
                      <TableCell align="center">{row.mid}</TableCell>
                      <TableCell align="center">{row.sme_grade}</TableCell>
                    </React.Fragment>
                  )}
                  <TableCell align="center">
                    {row.total_sales.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {Number(row.pg_fee_rate).toFixed(3)}%
                  </TableCell>
                  <TableCell align="center">
                    {Number(row.our_fee_rate).toFixed(3)}%
                  </TableCell>
                  <StyledDifferenceCell
                    value={row.fee_rate_difference}
                    suffix="%"
                    isPercentage
                  />
                  <TableCell align="center">
                    {row.pg_calculated_fee.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {row.our_calculated_fee.toLocaleString()}
                  </TableCell>
                  <StyledDifferenceCell value={row.fee_amount_difference} />
                  <TableCell align="center">
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
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </React.Fragment>
  );
};

export default MonthlySettlement;
