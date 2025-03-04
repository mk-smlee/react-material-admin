export interface MerchantPenaltyItem {
  merchantId: string;
  merchantName: string;
  mid: string;
  pgCompanyName: string;
  smeGrade: string;
  monthlySales: number;
}

export interface AgencyPenaltyItem {
  agencyName: string;
  agencyMonthlySales: number; // 대리점 월 매출
  monthlyCommittedSales: number; // 대리점 월 약정금액
  shortfall: number; // 대리점 약정 부족금액
  penaltyRate: number; // 패널티율
  penalty: number; // 패널티 금액
  merchants: MerchantPenaltyItem[];
  remarks: string;
}
