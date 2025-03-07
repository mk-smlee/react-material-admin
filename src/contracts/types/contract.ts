/**
 * /contracts - 목록 조회 시
 */
export interface ContractListItem {
  contractId: string;
  pgCompanyName: string;
  agencyName: string;
  merchantName: string;
  businessNumber: string;
  contractMerchantName: string;
  mid: string;
}

/**
 * /contracts/:id - 단건 상세 조회 시
 * GetContractResponse DTO 형태와 동일
 */
export interface ContractDetailItem {
  contractId: string;
  pgCompanyName: string;
  agencyName: string;
  merchantName: string;
  businessNumber: string;
  contractMerchantName: string;
  contractDate: string; // 백엔드에서 Date 형태 주더라도 문자열로 받는 경우가 많음
  specialNote?: string;
  contractType?: string;
  mid: string;
  smeGrade?: string;
  salesCommissionRate?: number;
  pgCommissionRate?: number;
  agencyCommissionRate?: number;
  excludePgCommissionRate?: number;
  createdAt: string;
}

/**
 * POST /contracts - 계약 생성 시
 */
export interface CreateContractPayload {
  pgCompanyId: string;
  agencyId: string;
  merchantId: string;
  contractMerchantName: string;
  contractDate: string; // "YYYY-MM-DD"
  specialNote?: string;
  contractType?: string;
  mid: string;
  smeGrade?: string;
  salesCommissionRate?: number;
  pgCommissionRate?: number;
  agencyCommissionRate?: number;
  excludePgCommissionRate?: number;
}

/**
 * PUT /contracts/:id - 계약 수정 시
 */
export interface UpdateContractPayload {
  contractMerchantName?: string;
  contractDate?: string;
  specialNote?: string;
  contractType?: string;
  smeGrade?: string;
  salesCommissionRate?: number;
  pgCommissionRate?: number;
  agencyCommissionRate?: number;
  excludePgCommissionRate?: number;
}

export interface ContractAuditLog {
  auditLogId: string;
  entityName: string; // 'contracts'
  entityId: string; // 계약ID
  fieldName: string; // 변경된 필드 이름
  oldValue: string;
  newValue: string;
  changedBy: string; // 수정자 (ex: userId / userName)
  changedAt: string; // 수정 일시
}

/**
 * 필드 라벨 매핑
 */
export const CONTRACT_FIELD_LABELS: Record<string, string> = {
  pgCompanyName: 'PG사',
  agencyName: '대리점',
  merchantName: '가맹점',
  businessNumber: '사업자번호',
  contractMerchantName: '계약 가맹점 상호',
  mid: 'MID',
  contractDate: '계약일',
  specialNote: '특이사항',
  contractType: '계약 유형',
  smeGrade: '영중소 등급',
  salesCommissionRate: '판매 수수료율(%)',
  pgCommissionRate: 'PG 원가(%)',
  agencyCommissionRate: '대리점 수수료(%)',
  excludePgCommissionRate: 'PG 제외 정산값(%)',
  createdAt: '생성 일시',
};
