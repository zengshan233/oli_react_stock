import { OptionType, ChartOptionItem, ChartOptions, OhlcData, VolumeData, SeriesItem } from "../models/ChartModels";


class ChartsConfig {
    public basicOptions: Array<ChartOptions> = [
        new ChartOptions(1, 'fullscreen.svg', [], undefined, OptionType.full),
        new ChartOptions(2, 'indicators.svg', [], 'Indicators', OptionType.indicators),
        new ChartOptions(3, 'series-ohlc.svg', [
            new ChartOptionItem(OptionType.seriesOhlc, 'OHLC', 'series-ohlc.svg'),
            new ChartOptionItem(OptionType.seriesLine, 'Line', 'series-line.svg'),
            new ChartOptionItem(OptionType.seriesCandlestick, 'Candlestick', 'series-candlestick.svg'),
        ], 'Series type'),
        new ChartOptions(4, 'label.svg', [
            new ChartOptionItem(OptionType.shapeLabel, 'Lable', 'label.svg'),
            new ChartOptionItem(OptionType.shapeCircle, 'Circle', 'circle.svg'),
            new ChartOptionItem(OptionType.shapeRectangle, 'Rectangle', 'rectangle.svg'),
        ], 'Shapes'),
    ]
    public options: Array<ChartOptions> = [
        new ChartOptions(5, 'segment.svg', [
            new ChartOptionItem(OptionType.lineSegment, 'Segment', 'segment.svg'),
            new ChartOptionItem(OptionType.lineArrowSegment, 'Arrow Segment', 'arrow-segment.svg'),
            new ChartOptionItem(OptionType.lineRay, 'Ray', 'ray.svg'),
            new ChartOptionItem(OptionType.lineArrowRay, 'Arrow Ray', 'arrow-ray.svg'),
            new ChartOptionItem(OptionType.line, 'Line', 'line.svg'),
            new ChartOptionItem(OptionType.lineArrow, 'Arrow', 'arrow-line.svg'),
            new ChartOptionItem(OptionType.lineHorizontal, 'Horizontal', 'horizontal-line.svg'),
            new ChartOptionItem(OptionType.lineVertical, 'Vertical', 'vertical-line.svg'),
        ], 'Lines'),
        new ChartOptions(6, 'elliott-3.svg', [
            new ChartOptionItem(OptionType.elliott3, 'Elliott 3', 'elliott-3.svg'),
            new ChartOptionItem(OptionType.elliott5, 'Elliott 5', 'elliott-5.svg'),
            new ChartOptionItem(OptionType.crooked3, 'Crooked 3', 'crooked-3.svg'),
            new ChartOptionItem(OptionType.crooked5, 'Crooked 5', 'crooked-5.svg'),
        ], 'Crooked lines'),
        new ChartOptions(7, 'measure-xy.svg', [
            new ChartOptionItem(OptionType.measureXY, 'Measure XY', 'measure-xy.svg'),
            new ChartOptionItem(OptionType.measureX, 'Measure X', 'measure-x.svg'),
            new ChartOptionItem(OptionType.measureY, 'Measure Y', 'measure-y.svg'),
        ], 'Measure'),
        new ChartOptions(8, 'fibonacci.svg', [
            new ChartOptionItem(OptionType.fibonacci, 'Fibonacci', 'fibonacci.svg'),
            new ChartOptionItem(OptionType.pitchfork, 'Pitchfork', 'pitchfork.svg'),
            new ChartOptionItem(OptionType.parallel, 'Parallel', 'parallel-channel.svg'),
        ], 'Advanced'),
        new ChartOptions(9, 'vertical-counter.svg', [
            new ChartOptionItem(OptionType.counter, 'Counter', 'vertical-counter.svg'),
            new ChartOptionItem(OptionType.counterLabel, 'Label', 'vertical-label.svg'),
            new ChartOptionItem(OptionType.counterArrow, 'Arrow', 'vertical-arrow.svg'),
        ], 'Counters'),
        new ChartOptions(10, 'flag-elipse.svg', [
            new ChartOptionItem(OptionType.flagsCircle, 'Circle', 'flag-elipse.svg'),
            new ChartOptionItem(OptionType.flagsDiamond, 'Diamond', 'flag-diamond.svg'),
            new ChartOptionItem(OptionType.flagsSquare, 'Square', 'flag-trapeze.svg'),
            new ChartOptionItem(OptionType.flagsSimple, 'Simple', 'flag-basic.svg'),
        ], 'Flags'),

        new ChartOptions(11, 'annotations-visible.svg', [], undefined, OptionType.toggle),
        new ChartOptions(12, 'current-price-show.svg', [], undefined, OptionType.price),
        new ChartOptions(13, 'zoom-x.svg', [
            new ChartOptionItem(OptionType.zoomX, 'Zoom X', 'zoom-x.svg'),
            new ChartOptionItem(OptionType.zoomY, 'Zoom Y', 'zoom-y.svg'),
            new ChartOptionItem(OptionType.zoomXY, 'Zoom XY', 'zoom-xy.svg'),
        ]),
    ];

    public static ohlcName: string = '价格';
    public static volumeName: string = '成交量';
    public static ohlcId: string = 'aapl-ohlc';
    public static volumeId: string = 'aapl-volume';

    public static setChart = (ohlc: Array<OhlcData>, volume: Array<VolumeData>, full: boolean) => {
        return {
            chart: {
                events: {
                    load: function () {
                        // addPopupEvents(this);
                    }
                },
                zoomType: 'x',
                backgroundColor: "#303030",
                borderColor: '#cf4e63',
                plotBackgroundColor: 0,
                spacing: [5, 0, 5, 5]

            },
            scrollbar: {
                enabled: full
            },
            navigator: {
                enabled: full
            },
            rangeSelector: {
                enabled: full,
            },

            yAxis: [{
                labels: {
                    align: 'left',
                },
                height: '70%',
                gridLineColor: '#252525',
                gridLineWidth: 0.5,
                endOnTick: false,
                tickAmount: 7,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'left',
                },
                top: '70%',
                gridLineWidth: 0.5,
                gridLineColor: '#252525',
                height: '30%',
                endOnTick: false,
                tickAmount: 4,
                offset: 0,
            }],
            xAxis: [{
                tickAmount: 4,
                tickColor: '#929292',
                tickLength: 4,
                tickWidth: 1,
                lineColor: "#757576",
            }],
            stockTools: {
                gui: {
                    enabled: true
                }
            },
            tooltip: {
                shape: 'square',
                headerShape: 'callout',
                borderWidth: 0,
                shadow: false,
                positioner:  (width:any, height:any, point:any) =>{
        var Highcharts: any = (window as any).Highcharts;
        var chart = Highcharts,
                        position;
    
                    if (point.isHeader) {
                        position = {
                            x: Math.max(
                                // Left side limit
                                chart.plotLeft,
                                Math.min(
                                    point.plotX + chart.plotLeft - width / 2,
                                    // Right side limit
                                    chart.chartWidth - width - chart.marginRight
                                )
                            ),
                            y: point.plotY
                        };
                    } else {
                        position = {
                            x: point.series.chart.plotLeft,
                            y: point.series.yAxis.top - chart.plotTop
                        };
                    }
    
                    return position;
                }
            },
            
            series: [{
                type: 'ohlc',
                id: ChartsConfig.ohlcId,
                name: ChartsConfig.ohlcName,
                data: ohlc,
                color: "#cf4e63",
                upLineColor: '#227565', // docs
                upColor: '#227565',
                turboThreshold: 6000,
                cropThreshold: 6000,
            }, {
                type: 'column',
                id: ChartsConfig.volumeId,
                name: ChartsConfig.volumeName,
                data: volume,
                turboThreshold: 6000,
                yAxis: 1
            }],


            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 900
                    },
                    chartOptions: {
                        rangeSelector: {
                            inputEnabled: false
                        }
                    }
                }]
            }
        };
    }


    public static langOptions: object = {
        lang: {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            shortWeekdays: ['七', '一', '二', '三', '四', '五', '六'],
            resetZoom: '重置缩放',
            rangeSelectorZoom: '范围选择'
        }
    }

    public seriesTypes: Array<SeriesItem> = [
        new SeriesItem('SMA', 'sma', 0, 14, false, false),
        new SeriesItem('BB', 'bb', 3, 20, false, false, 2),
        // new SeriesItem('Accumulation/Distribution', 'ad', -1, 14, true, true,undefined,ChartsConfig.volumeId),
        // new SeriesItem('AO', 'ao', -1, -1, true, false),
        // new SeriesItem('Aroon', 'aroon', -1, 25, true, false),
        // new SeriesItem('Aroon Oscillator', 'sma', -1, 25, true, false),
        // new SeriesItem('ATR', 'atr', -1, 14, true, false),
        // new SeriesItem('CCI', 'cci', -1, 14, true, false),
    ]
}



export default ChartsConfig;