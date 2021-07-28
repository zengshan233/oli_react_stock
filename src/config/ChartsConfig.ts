import { OptionType, ChartOptionItem, ChartOptions, OhlcData, VolumeData, SeriesItem, StatisticData, StatisticTab } from "../models/ChartModels";
import { StatisticType } from "../services/StatisticService";
import icons from "../images/images";
import dateFormat from "../utils/dateFormat";


class ChartsConfig {
    public basicOptions: Array<ChartOptions> = [
        new ChartOptions(1, icons.fullscreen, [], undefined, OptionType.full),
        new ChartOptions(2, icons.indicators, [], 'Indicators', OptionType.indicators),
        new ChartOptions(3, icons.series_ohlc, [
            new ChartOptionItem(OptionType.seriesOhlc, 'OHLC', icons.series_ohlc),
            new ChartOptionItem(OptionType.seriesLine, 'Line',icons.series_line),
            new ChartOptionItem(OptionType.seriesCandlestick, 'Candlestick', icons.series_candlestick),
        ], 'Series type'),
        new ChartOptions(4, icons.label, [
            new ChartOptionItem(OptionType.shapeLabel, 'Lable',icons.label),
            new ChartOptionItem(OptionType.shapeCircle, 'Circle', icons.circle),
            new ChartOptionItem(OptionType.shapeRectangle, 'Rectangle', icons.rectangle),
        ], 'Shapes'),
    ]
    public options: Array<ChartOptions> = [
        new ChartOptions(5, icons.segment, [
            new ChartOptionItem(OptionType.lineSegment, 'Segment', icons.segment),
            new ChartOptionItem(OptionType.lineArrowSegment, 'Arrow Segment', icons.arrow_segment),
            new ChartOptionItem(OptionType.lineRay, 'Ray', icons.ray),
            new ChartOptionItem(OptionType.lineArrowRay, 'Arrow Ray', icons.arrow_ray),
            new ChartOptionItem(OptionType.line, 'Line', icons.line),
            new ChartOptionItem(OptionType.lineArrow, 'Arrow', icons.arrow_line),
            new ChartOptionItem(OptionType.lineHorizontal, 'Horizontal',icons.horizontal_line),
            new ChartOptionItem(OptionType.lineVertical, 'Vertical',icons.vertical_line),
        ], 'Lines'),
        new ChartOptions(6, icons.elliott3, [
            new ChartOptionItem(OptionType.elliott3, icons.elliott3, icons.elliott3),
            new ChartOptionItem(OptionType.elliott5,icons.elliott5, icons.elliott5),
            new ChartOptionItem(OptionType.crooked3, icons.crooked3, icons.crooked3),
            new ChartOptionItem(OptionType.crooked5, icons.crooked5, icons.crooked5),
        ], 'Crooked lines'),
        new ChartOptions(7, icons.measure_xy, [
            new ChartOptionItem(OptionType.measureXY, 'Measure XY', icons.measure_xy),
            new ChartOptionItem(OptionType.measureX, 'Measure X',icons.measure_x),
            new ChartOptionItem(OptionType.measureY, 'Measure Y',icons.measure_y),
        ], 'Measure'),
        new ChartOptions(8, icons.fibonacci, [
            new ChartOptionItem(OptionType.fibonacci, 'Fibonacci', icons.fibonacci),
            new ChartOptionItem(OptionType.pitchfork, 'Pitchfork', icons.pitchfork),
            new ChartOptionItem(OptionType.parallel, 'Parallel', icons.parallel_channel),
        ], 'Advanced'),
        new ChartOptions(9, icons.vertical_counter, [
            new ChartOptionItem(OptionType.counter, 'Counter', icons.vertical_counter),
            new ChartOptionItem(OptionType.counterLabel, 'Label', icons.vertical_label),
            new ChartOptionItem(OptionType.counterArrow, 'Arrow', icons.vertical_arrow),
        ], 'Counters'),
        new ChartOptions(10, icons.flag_elipse, [
            new ChartOptionItem(OptionType.flagsCircle, 'Circle', icons.flag_elipse),
            new ChartOptionItem(OptionType.flagsDiamond, 'Diamond', icons.flag_diamond),
            new ChartOptionItem(OptionType.flagsSquare, 'Square', icons.flag_trapeze),
            new ChartOptionItem(OptionType.flagsSimple, 'Simple', icons.flag_basic),
        ], 'Flags'),

        new ChartOptions(11, icons.annotations_visible, [], undefined, OptionType.toggle),
        new ChartOptions(12, icons.current_price_show, [], undefined, OptionType.price),
        new ChartOptions(13, icons.zoom_x, [
            new ChartOptionItem(OptionType.zoomX, 'Zoom X',icons.zoom_x),
            new ChartOptionItem(OptionType.zoomY, 'Zoom Y', icons.zoom_y),
            new ChartOptionItem(OptionType.zoomXY, 'Zoom XY', icons.zoom_xy),
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
                labels: {
                    style: { "fontSize": "10px" },
                    formatter: function (): any {
                        let value: number = (this as any).value;
                        return dateFormat("YYYY/mm/dd", new Date(value));
                    }
                },
                tickAmount: 6,
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

            // tooltip: {
            //     shape: 'square',
            //     headerShape: 'callout',
            //     borderWidth: 0,
            //     shadow: false,
            //     positioner: (width: any, height: any, point: any) => {
            //         var Highcharts: any = (window as any).Highcharts;
            //         var chart = Highcharts,
            //             position;
            //         if (point.isHeader) {
            //             position = {
            //                 x: Math.max(
            //                     // Left side limit
            //                     chart.plotLeft,
            //                     Math.min(
            //                         point.plotX + chart.plotLeft - width / 2,
            //                         // Right side limit
            //                         chart.chartWidth - width - chart.marginRight
            //                     )
            //                 ),
            //                 y: point.plotY
            //             };
            //         } else {
            //             position = {
            //                 x: point.series.chart.plotLeft,
            //                 y: point.series.yAxis.top - chart.plotTop
            //             };
            //         }

            //         return position;
            //     }
            // },

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

    public static setStatisticChart = (data1: Array<Array<number>>, data2: Array<Array<number>>) => {
        return {
            chart: {
                events: {
                    load: function () {
                    }
                },
                zoomType: 'x',
                backgroundColor: "#000000",
                plotBackgroundColor: 0,
                spacing: [5, 0, 5, 5]

            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            },
            rangeSelector: {
                enabled: false,
            },

            yAxis: [{
                labels: {
                    align: 'right',
                },
                gridLineColor: '#151515 ',
                gridLineWidth: 0.5,
                endOnTick: true,
                tickAmount: 7,
                opposite: false,
                resize: {
                    enabled: true
                }
            }],
            xAxis: [{
                labels: {
                    style: { "fontSize": "10px" },
                    formatter: function (): any {
                        let value: number = (this as any).value;
                        return dateFormat("mm/dd", new Date(value));
                    }
                },
                startOnTick: true,
                tickAmount: 6,
                tickColor: '#342619',
                tickLength: 6,
                tickWidth: 2,
                lineColor: "#110d08",
            }],
            stockTools: {
                gui: {
                    enabled: true
                }
            },
            series: [{
                type: 'line',
                name: '总资产',
                data: data1,
                color: "#a86c24",
                tooltip: {
                    valueDecimals: 2
                }
            }, {
                type: 'line',
                name: '总负债',
                color: "#2476a8",
                data: data2,
                tooltip: {
                    valueDecimals: 2
                }
            }],
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

    public statisticTabs: Array<StatisticTab> = [
        new StatisticTab('收入', StatisticType.assets, ['总收入', '净收入']),
        new StatisticTab('资产', StatisticType.incomes, ['总资产', '总负债']),
        new StatisticTab('现金流', StatisticType.cashFlows, ['总现金', '净增减额'])
    ];
}



export default ChartsConfig;