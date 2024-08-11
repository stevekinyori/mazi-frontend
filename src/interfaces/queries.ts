export type QueryArgs = { [key in 'onError' | 'onSuccess']: (...args) => void };

export type FintechQueryArgs = QueryArgs & { internalUser: boolean };

export type SummaryCompanyTotalsQueryArgs = QueryArgs & { [key in 'client_company_id' | 'funders_id']: number };

export type CompanyIdParam = { client_company_id: number };

export type ClientCompanyIdParam = { client_company_id: number };

export type DateRangeParams = { [key in 'period_start' | 'period_end']: string };

export type CargoHistoryQueryArgs = QueryArgs &
  CompanyIdParam &
  DateRangeParams & { group_by: 'DAY' | 'WEEK' | 'MONTH' };

export interface CompanyFinancialsParams extends QueryArgs {
  limit: number;
  offset: number;
  period_start: string;
  period_end: string;
  companies_id: number;
}

export type ShipmentInfoQueryArgs = QueryArgs & { shipmentId: number; clientCompanyId?: number };

export type DocumentsLoadQueryArgs = QueryArgs & {
  shipmentId?: number;
  clientCompanyId?: number;
  field: 'shipments_id' | 'customer_id';
  enabled: boolean;
  categories?: string[];
};

export interface ApiPagination {
  recordCount: number;
  recordOffset: number;
}
