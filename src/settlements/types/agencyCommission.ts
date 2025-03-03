/**
 * 가맹점별 수수료 정보 인터페이스
 */
export interface MerchantCommissionItem {
  contractId: string;
  mid: string;
  merchantName: string;
  grade: string;
  agencyCommission: number;  // % (ex: 2.5)
  monthlySales: number;
  commissionAmount: number;  // 반올림된 수수료액
  commissionVAT: number;     // 반올림된 수수료 부가세
  commissionPlusVAT: number; // 수수료+VAT 합계
}

/**
 * 대리점별 수수료 요약 정보 인터페이스
 */
export interface AgencyCommissionItem {
  agencyId: string;
  agencyName: string;
  totalSales: number;        // 대리점 총 결제액
  totalCommission: number;   // 대리점 총 수수료액
  totalVat: number;          // 대리점 총 수수료 부가세
  totalPayout: number;       // 대리점 총 정산액
  merchants: MerchantCommissionItem[];
}
