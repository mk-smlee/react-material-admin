export interface MonthlySettlement {
  id: string;
  pg_company_name: string;       // PG사 이름
  agency_name: string;           // 대리점 이름
  merchant_name: string;         // 가맹점 이름
  mid: string;                   // MID (가맹점 ID)
  sme_grade: string;             // 영중소 (가맹점 크기: 영세/중소/일반)
  total_sales: number;           // 거래금액 (정산 월 총 거래금액)
  pg_fee_rate: number;           // PG 수수료율
  our_fee_rate: number;          // MK(우리) 수수료율
  fee_rate_difference: number;   // 수수료율 차이
  pg_calculated_fee: number;     // PG 수수료액
  our_calculated_fee: number;    // MK 수수료액
  fee_amount_difference: number; // 수수료액 차이
  pg_surtax: number;             // PG 부가세
  our_surtax: number;            // MK 부가세
  surtax_amount_difference: number; // 부가세 차이
  pg_expected_payment: number;   // PG 총액
  our_expected_payment: number;  // MK 총액
  expected_payment_difference: number; // 총액 차이
  created_at: string;            // 생성일시
  updated_at: string;            // 수정일시
}
