/**
 * 월별 정산 데이터 인터페이스
 * 백엔드에서 반환하는 DTO 구조에 맞춘 타입 정의
 */
export interface MonthlySettlement {
  id: string;
  pgCompanyName: string;             // PG사 이름
  agencyName: string;                // 대리점 이름
  contractMerchantName: string;              // 가맹점 이름
  mid: string;                       // MID (가맹점 ID)
  smeGrade: string;                  // 영중소 (가맹점 크기: 영세/중소/일반)
  totalSales: number;                // 거래금액 (정산 월 총 거래금액)
  pgCommissionRate: number;          // PG 수수료율
  mkCommissionRate: number;          // MK(우리) 수수료율
  commissionRateDifference: number;  // 수수료율 차이
  pgCommissionAmount: number;        // PG 수수료액
  mkCommissionAmount: number;        // MK 수수료액
  commissionAmountDifference: number;// 수수료액 차이
  pgSurtax: number;                  // PG 부가세
  mkSurtax: number;                  // MK 부가세
  surtaxAmountDifference: number;    // 부가세 차이
  pgExpectedPayment: number;         // PG 총액
  mkExpectedPayment: number;         // MK 총액
  expectedPaymentDifference: number; // 총액 차이
  createdAt: string;                 // 생성일시
  updatedAt: string;                 // 수정일시
}