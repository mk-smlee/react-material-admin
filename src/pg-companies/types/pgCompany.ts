export interface PgCompany {
  id: string;
  name: string;
  is_direct_agency_payout: boolean;
  monthly_excel_format: MonthlyExcelFormatEnum;
}

export enum MonthlyExcelFormatEnum {
  MONTHLY = 10, //월별
  DAILY = 20, //일별
}

export const IsDirectAgencyPayoutLabels: Record<number, string> = {
  1: 'PG사 정산', //true
  0: '먼키 정산', //false
};

export const MonthlyExcelFormatLabels: Record<number, string> = {
  [MonthlyExcelFormatEnum.MONTHLY]: '월별',
  [MonthlyExcelFormatEnum.DAILY]: '일별',
};
