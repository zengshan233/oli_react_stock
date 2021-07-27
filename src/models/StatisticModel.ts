/*Incomes*/
export interface Incomes {
    symbol: string;
    name: string;
    date: number;
    gross_margin: number;
    operating_margin: number;
    net_profit_margin: number;
    return_on_investment: number;
    financial_years: string;
    total_revenues: string;
    net_incomes: string;
}

/*Assets*/
export interface Assets {
    symbol: string;
    name: string;
    date: number;
    quick_ratio: number;
    current_ratio: number;
    long_term_debt_to_equity: number;
    total_debt_to_equity: number;
    financial_years: string;
    total_assets: string;
    total_liabs: string;
}

/*Cash flows*/
export interface CashFlows {
    symbol: string;
    name: string;
    date: number;
    revenue_per_common_share: number;
    operating_cash_flow: number;
    financial_years: string;
    cashes: string;
    change_in_cashes: string;
}

/*tsModel3*/
export interface StatisticResponse {
    incomes: Incomes;
    assets: Assets;
    cashFlows: CashFlows;
}