export interface AgencyDropdownItem {
  agencyId: string;
  agencyName: string;
}
export interface AgencyListItem {
  agencyId: string;
  agencyName: string;
  createdAt: string;
}

export interface AgencyDetailItem {
  agencyId: string;
  agencyName: string;
  createdAt: string;
}

// 생성/수정 시 사용하는 DTO
export interface CreateAgencyPayload {
  agencyName: string;
}

export interface UpdateAgencyPayload {
  agencyName?: string;
}

/**
 * 필드 라벨 매핑
 */
export const AGENCY_FIELD_LABELS: Record<string, string> = {
  agencyName: '대리점명',
  createdAt: '생성일시',
};
