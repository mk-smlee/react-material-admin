export interface MerchantPenaltyItem {
  merchantId: string;
  merchantName: string;
  mid: string;
  pgCompanyName: string;
  grade: string;
  monthlySales: number;
}

export interface AgencyPenaltyItem {
  agencyName: string;
  monthlyCommittedSales: number;
  shortfall: number;
  penalty: number;
  merchants: MerchantPenaltyItem[];
}
