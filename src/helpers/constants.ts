export const UserStorageKey = 'auth_user';

export const FintechFunderDetailsQueryKey = 'fintech_funder_details';

export const FintechFundedCompaniesQueryKey = 'fintech_funded_companies';

export const SummaryCompanyTotalsQueryKey = 'summary_company_totals';

export const SummaryCapitalChartQueryKey = 'summary_capital_chart';

export const CompanyCargoQueryKey = 'company_cargo';

export const CargoSummaryQueryKey = 'cargo_summary';

export const CargoHistoryQueryKey = 'company_history';

export const CompanyFinancialStatementsQueryKey = 'company_statements';

export const CashSummaryQueryKey = 'cash_summary';

export const CashTotalQueryKey = 'cash_total';

export const CashChartQueryKey = 'cash_chart';

export const CompanyInventorySummaryQueryKey = 'company_inventory_summary';

export const CompanyInventoryTotalsQueryKey = 'company_inventory_totals';

export const CompanyFinancialsSummaryQueryKey = 'company_financials_summary';

export const CompanyFinancialsTotalsQueryKey = 'company_financials_totals';

export const ShipmentDetailsQueryKey = 'shipment_details';

export const ListOfValuesQueryKey = 'list_of_values';

export const ShipmentFintransSummaryQueryKey = 'shipment_fintrans_summary';

export const ShipmentNotesQueryKey = 'shipment_notes';

export const ShipmentContainersQueryKey = 'shipment_containers';

export const ShipmentFintransDocumentsQueryKey = 'shipment_fintrans_documents';

export const ShipmentPaymentsQueryKey = 'shipment_payments';

export const ShipmentDocumentsQueryKey = 'shipment_documents';

export const LoadDocumentQueryKey = 'load_document';

export const ListContainerStatusQueryKey = 'list_container_status';

export const GetClientDocumentsStatusQueryKey = 'get_client_documents';

export const accountType: { [key in 'label' | 'value']: string }[] = [
  {
    value: '',
    label: 'All accounts',
  },
  {
    value: 'TRANSACTIONAL',
    label: 'Transactional',
  },
  {
    value: 'FIXED',
    label: 'Fixed',
  },
];

export const shipmentStatusTypes: { label: string; value: string[] }[] = [
  {
    value: [],
    label: 'Show All',
  },
  {
    value: ['CREATE', 'FILING_IDF'],
    label: 'At Supplier',
  },
  {
    value: ['ON_SHIP'],
    label: 'On Ship',
  },
  {
    value: ['AT_PORT', 'WAITING_FOR_PICKUP'],
    label: 'At Port',
  },

  {
    value: ['ON_TRUCK'],
    label: 'Delivery Ongoing',
  },
  {
    value: ['COMPLETE', 'CARGO_DELIVERED', 'CONTAINER_DELIVERED'],
    label: 'Delivered',
  },
];

export const RouteSessionStorageKey = 'active_route';
