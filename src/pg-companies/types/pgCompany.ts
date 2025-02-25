export interface PgCompany {
  id: string;
  name: string;
  monthly_excel_format: MonthlyExcelFormatEnum;
  daily_excel_format: DailyExcelFormatEnum;
}

export enum MonthlyExcelFormatEnum {
  MONTHLY = 10, //월별
  DAILY = 20, //일별
}

export enum DailyExcelFormatEnum {
  DAILY = 20, //일별
  PER_TRANSACTION = 30, //결제건별
}

export const MonthlyExcelFormatLabels: Record<number, string> = {
  [MonthlyExcelFormatEnum.MONTHLY]: '월별',
  [MonthlyExcelFormatEnum.DAILY]: '일별',
};

export const DailyExcelFormatLabels: Record<number, string> = {
  [DailyExcelFormatEnum.DAILY]: '일별',
  [DailyExcelFormatEnum.PER_TRANSACTION]: '결제건별',
};