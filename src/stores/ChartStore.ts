import { makeAutoObservable, } from "mobx";
import ChartsConfig from "../config/ChartsConfig";
import { ChartItem, OhlcData, SeriesItem, VolumeData } from "../models/ChartModels";

class ChartStore {

  moreOptions: boolean = false;
  chart: any;

  seriesItem: SeriesItem;
  seriesChartId: string;
  seriesIndex: number;
  seriesPeriod: number;

  constructor() {
    makeAutoObservable(this);
    let initSeriesItem = new ChartsConfig().seriesTypes[0];
    this.seriesItem = initSeriesItem;
    this.seriesChartId = ChartsConfig.ohlcId;
    this.seriesIndex = initSeriesItem.index;
    this.seriesPeriod = initSeriesItem.period;
  }

  public paintChart() {
    let _self = this;
    var Highcharts: any = (window as any).Highcharts;
    Highcharts.getJSON('http://oliquantdemo-env.eba-fepvtuwm.ap-southeast-2.elasticbeanstalk.com/prices?symbol=8CO_ASX', function (data: any) {
      let ohlc: Array<OhlcData> = [],
        volume: Array<VolumeData> = [];
      for (var i in data) {
        ohlc.push(new OhlcData(data[i].time, data[i].open, data[i].high, data[i].low, data[i].close))
        volume.push(
          new VolumeData(
            data[i].time,
            data[i].volume,
            data[i].open <= data[i].close ? "#227565" : "#cf4e63"
          )
        );
      }
      ohlc.sort((a, b) => a.x - b.x);
      volume.sort((a, b) => a.x - b.x);
      _self.chart = Highcharts.stockChart('container', ChartsConfig.setChart(ohlc, volume));
      Highcharts.setOptions(ChartsConfig.langOptions);
      Highcharts.dateFormat();

    });
  }

  showMore() {
    this.moreOptions = !this.moreOptions;
  }

  setChartId(id: string) {
    this.seriesChartId = id;
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
    if(this.seriesItem.volumeSeriesID){
     series.params.volumeSeriesID=this.seriesItem.volumeSeriesID;
    }
    if(this.seriesItem.standardDeviation){
      series.params.standardDeviation = this.seriesItem.standardDeviation;
    }
    console.log('series', series)
    this.chart.addSeries(series)
  }
}

export default new ChartStore();