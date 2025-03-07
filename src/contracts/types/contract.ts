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
