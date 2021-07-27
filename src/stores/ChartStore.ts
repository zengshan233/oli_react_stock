import { makeAutoObservable, } from "mobx";
import ChartsConfig from "../config/ChartsConfig";
import { OhlcData, SeriesItem, VolumeData } from "../models/ChartModels";
import StockChart from 'highcharts/modules/stock';
import { Ajax } from "../utils/http";

class ChartStore {

    moreOptions: boolean = false;
    chart: any;
    seriesItem: SeriesItem;
    seriesChartId: string;
    seriesIndex: number;
    seriesPeriod: number;
    iconMap: any = {};
    currentOptionId?: number;

    constructor() {
        makeAutoObservable(this);
        let chartConfig = new ChartsConfig();
        let initSeriesItem = chartConfig.seriesTypes[0];
        this.seriesItem = initSeriesItem;
        this.seriesChartId = ChartsConfig.ohlcId;
        this.seriesIndex = initSeriesItem.index;
        this.seriesPeriod = initSeriesItem.period;
        chartConfig.basicOptions.forEach((o) => {
            this.iconMap[o.id] = o.icon;
        })
        chartConfig.options.forEach((o) => {
            this.iconMap[o.id] = o.icon;
        })
    }

    public async paintChart(full: boolean) {
        let _self = this;
        var Highcharts: any = (window as any).Highcharts;
        let data: any = await new Ajax('http://oliapi-env.eba-z24vycvy.ap-southeast-2.elasticbeanstalk.com/prices?symbol=bhp_asx').get();

        let ohlc: Array<OhlcData> = [],
            volume: Array<VolumeData> = [];
        for (var i in data) {
            // ohlc.push(new OhlcData(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]))
            // volume.push(
            //     new VolumeData(
            //         data[i][0],
            //         data[i][5],
            //         data[i][1] <= data[i][4] ? "#227565" : "#cf4e63"
            //     )
            // );

            ohlc.push(new OhlcData(data[i].time, data[i].open, data[i].high, data[i].low, data[i].close))
            volume.push(
              new VolumeData(
                data[i].time,
                data[i].volume,
                data[i].open <= data[i].close ? "#227565" : "#cf4e63"
              )
            );
        }


        //   for (var i in data) {
        //     ohlc.push(new OhlcData(data[i].time, data[i].open, data[i].high, data[i].low, data[i].close))
        //     volume.push(
        //       new VolumeData(
        //         data[i].time,
        //         data[i].volume,
        //         data[i].open <= data[i].close ? "#227565" : "#cf4e63"
        //       )
        //     );
        //   }
        ohlc.sort((a, b) => a.x - b.x);
        volume.sort((a, b) => a.x - b.x);
        _self.chart = Highcharts.stockChart('container', ChartsConfig.setChart(ohlc, volume, full));
        Highcharts.setOptions(ChartsConfig.langOptions);
        Highcharts.dateFormat();
    }

    showMore() {
        this.moreOptions = !this.moreOptions;
    }

    setChartId(id: string) {
        this.seriesChartId = id;
    }

    setCurrentOption(id: number) {
        if (this.currentOptionId == id) {
            this.currentOptionId = 0
            return;
        }
        this.currentOptionId = id;
    }

    setSeriesItem(item: SeriesItem) {
        this.seriesItem = item;
        this.seriesIndex = item.index;
        this.seriesPeriod = item.period;
    }

    addSeries() {
        var Highcharts: any = (window as any).Highcharts;
        let series: any = {
            id: Highcharts.uniqueKey(),
            linkedTo: this.seriesChartId,
            type: this.seriesItem.type,
            params: {}
        }
        if (this.seriesItem.yAxis) {
            series.yAxis = Highcharts.uniqueKey();
        }
        if (this.seriesChartId == ChartsConfig.volumeId) {
            series.yAxis = 1;
        }
        if (this.seriesIndex >= 0) {
            series.params.index = this.seriesIndex;
        }
        if (this.seriesPeriod >= 0) {
            series.params.period = this.seriesPeriod;
        }
        if (this.seriesItem.volumeSeriesID) {
            series.params.volumeSeriesID = this.seriesItem.volumeSeriesID;
        }
        if (this.seriesItem.standardDeviation) {
            series.params.standardDeviation = this.seriesItem.standardDeviation;
        }
        // this.chart.addSeries(series)
        var navigation = this.chart.options.navigation;
        var options1 = Highcharts.merge({
            langKey: 'segment',
            type: 'crookedLine',
            typeOptions: {
                xAxis: 0,
                yAxis: 0,
                points: [{
                    x: 1573311808494.9053,
                    y: 66.13924050632912
                }, {
                    x: 1597963329732.169,
                    y: 50.56962025316456
                }]
            }
        }, navigation.annotationsOptions, navigation.bindings.segment.annotationsOptions);
        var options = Highcharts.merge({
            langKey: 'segment',
            type: 'crookedLine',
            typeOptions: {
                xAxis: 0,
                yAxis: 0,
                points: [{
                    x: 1573311808494.9053,
                    y: 40.13924050632912
                }, {
                    x: 1597963329732.169,
                    y: 100.56962025316456
                }]
            }
        }, navigation.annotationsOptions, navigation.bindings.segment.annotationsOptions);
        this.chart.addAnnotation(options);
        this.chart.addAnnotation(options1);
    }

    onTypePicked(id: number, icon: string) {
        let iconMap = this.iconMap;
        iconMap[id] = icon;
        this.iconMap = iconMap;
    }
}

export default new ChartStore();