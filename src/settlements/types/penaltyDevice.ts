export interface MerchantDeviceItem {
  merchantId: string;
  merchantName: string;
  mid: string;
  grade: string;
  windowCount: number;
  androidCount: number;
  posCount: number;
  contractAmount: number; // 가맹점별 약정금액
  monthlySales: number;   // 가맹점별 월매출
  shortfall: number;      // 가맹점별 미달성 매출
  penalty: number;        // 가맹점별 패널티 (VAT 제외)
  remarks: string;        // 가맹점별 비고
}

/**
 * 대리점 기준의 기기약정 패널티 조회 결과
 */
export interface AgencyDeviceItem {
  agencyName: string;
  agencyMonthlyCommitted: number; // 대리점 총 약정금액(가맹점 합)
  agencyMonthlySales: number;     // 대리점 총 월매출 합
  shortfall: number;              // 대리점 미달성 매출
  totalPenalty: number;           // 대리점 패널티 (VAT 제외)
  averagePenaltyRate: number;     // 대리점 평균 패널티율
  merchants: MerchantDeviceItem[];
}
