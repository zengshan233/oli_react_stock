import { makeAutoObservable, } from "mobx";
import ChartsConfig from "../config/ChartsConfig";
import { OhlcData, SeriesItem, StatisticData, VolumeData } from "../models/ChartModels";
import StockChart from 'highcharts/modules/stock';
import { Ajax } from "../utils/http";
import { Assets, CashFlows, Incomes, StaticticService, StatisticResponse, StatisticType, Summary } from "../services/StatisticService";

class StatisticStore {
    chart: any;
    summary?: Summary;
    incomes?: Incomes;
    assets?: Assets;
    cashFlows?: CashFlows;
    type: StatisticType = StatisticType.incomes;

    constructor() {
        makeAutoObservable(this);
        let chartConfig = new ChartsConfig();
    }

    public async paintChart(statisticData?: StatisticResponse) {
        if (statisticData) {
            this.incomes = statisticData.incomes;
            this.assets = statisticData.assets;
            this.cashFlows = statisticData.cash_flows;
            this.summary = statisticData.summary;
        } else if (!this.chart) {
            return;
        }
        setTimeout(() => {
            this.handleTabChange(StatisticType.assets, true);
        }, 0);
    }

    handleTabChange(type: StatisticType, init: boolean = false) {
        var Highcharts: any = (window as any).Highcharts;
        let line1: Array<Array<number>> = [], line2: Array<Array<number>> = [];

        this.type = type;
        switch (this.type) {
            case StatisticType.incomes:
                let datesIncomes: Array<string> = this.incomes?.financial_years?.split(",") || [];
                let revenues: Array<string> = this.incomes?.total_revenues?.split(",") || [];
                let incomes: Array<string> = this.incomes?.net_incomes?.split(",") || [];
                for (let i = 0; i < datesIncomes.length; i++) {
                    line1.push([Date.parse(datesIncomes[i]), parseFloat(revenues[i])]);
                    line2.push([Date.parse(datesIncomes[i]), parseFloat(incomes[i])]);
                }
                break;
            case StatisticType.assets:
                let datesAssets: Array<string> = this.assets?.financial_years?.split(",") || [];
                let revenuesAssets: Array<string> = this.assets?.total_assets?.split(",") || [];
                let liabs: Array<string> = this.assets?.total_liabs?.split(",") || [];
                for (let i = 0; i < datesAssets.length; i++) {
                    line1.push([Date.parse(datesAssets[i]), parseFloat(revenuesAssets[i])]);
                    line2.push([Date.parse(datesAssets[i]), parseFloat(liabs[i])]);
                }
                break;
            case StatisticType.cashFlows:
                let datesCashFlows: Array<string> = this.cashFlows?.financial_years?.split(",") || [];
                let cashes: Array<string> = this.cashFlows?.cashes?.split(",") || [];
                let changeInCashes: Array<string> = this.cashFlows?.change_in_cashes?.split(",") || [];
                for (let i = 0; i < datesCashFlows.length; i++) {
                    line1.push([Date.parse(datesCashFlows[i]), parseFloat(cashes[i])]);
                    line2.push([Date.parse(datesCashFlows[i]), parseFloat(changeInCashes[i])]);
                }
                break;
        }
        if (this.chart && !init) {
            this.chart.series[0].update({ data: line1 });
            this.chart.series[1].update({ data: line2 });
        } else {
            this.chart = Highcharts.stockChart('statisticChart', ChartsConfig.setStatisticChart(line1, line2));
        }
    }
}

export default new StatisticStore();