import { observable, action } from "mobx";
import ChartsConfig from "../config/ChartsConfig";
import { OhlcData,  VolumeData } from "../models/ChartModels";

class ChartStore {
  public Highcharts: any = (window as any).Highcharts;

  @observable timer;
  constructor() {
    this.timer = 0;
  }

  public paintChart() {
    var _self = this;
    this.Highcharts.getJSON('http://oliquantdemo-env.eba-fepvtuwm.ap-southeast-2.elasticbeanstalk.com/prices?symbol=8CO_ASX', function (data: any) {
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
      _self.Highcharts.stockChart('container', ChartsConfig.setChart(ohlc, volume));
      _self.Highcharts.setOptions(ChartsConfig.langOptions);
      _self.Highcharts.dateFormat();
    });
  }
}

export default new ChartStore();