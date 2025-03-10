/**
 * merchants - 목록 조회 시
 */
export interface MerchantsForDropdownItem {
  merchantId: string;
  merchantName: string;
  businessNumber: string;
}

/**
 * merchants - 목록 조회 시
 */
export interface MerchantListItem {
  merchantId: string;
  merchantName: string;
  businessNumber: string;
  createdAt: string;
}

/**
 * merchants/:id - 단건 상세 조회 시
 */
export interface MerchantDetailItem {
  merchantId: string;
  merchantName: string;
  businessNumber: string;
  representativeName?: string;
  settlementCycle?: number;
  intakeChannel?: string;
  createdAt: string;
}

/**
 * POST /merchants - 가맹점 생성
 */
export interface CreateMerchantPayload {
  merchantName: string;
  businessNumber: string;
  representativeName: string;
  settlementCycle: number;
  intakeChannel: string;
}

/**
 * PUT /merchants/:id - 가맹점 수정
 */
export interface UpdateMerchantPayload {
  merchantName?: string;
  businessNumber?: string;
  representativeName?: string;
  settlementCycle?: number;
  intakeChannel?: string;
}

/**
 * 필드 라벨 매핑
 * key: 실제 fieldName
 * value: UI로 보여줄 label
 */
export const MERCHANT_FIELD_LABELS: Record<string, string> = {
  merchantName: '가맹점명',
  businessNumber: '사업자번호',
  representativeName: '대표자명',
  settlementCycle: '정산 주기(일)',
  intakeChannel: '인입 채널',
  createdAt: '생성 일시',
  // 필요하다면 필요한 필드 전부 추가
  // merchantId 등 내부에서 거의 안보여줄 필드는 굳이 매핑 안 해도 됩니다.
};
