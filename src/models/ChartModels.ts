enum OptionType {
    indicators = 'highcharts-indicators',
    shapeLabel = 'highcharts-label-annotation',
    shapeCircle = 'highcharts-circle-annotation',
    shapeRectangle = 'highcharts-rectangle-annotation',
    line = 'highcharts-infinity-line',
    lineSegment = 'highcharts-segment',
    lineArrowSegment = 'highcharts-arrow-segment',
    lineRay = 'highcharts-ray',
    lineArrowRay = 'highcharts-arrow-ray',
    lineArrow = 'highcharts-arrow-infinity-line',
    lineHorizontal = 'highcharts-horizontal-line',
    lineVertical = 'highcharts-vertical-line',
    elliott3 = 'highcharts-elliott3',
    elliott5 = 'highcharts-elliott5',
    crooked3 = 'highcharts-crooked3',
    crooked5 = 'highcharts-crooked5',
    measureXY = 'highcharts-measure-xy',
    measureX = 'highcharts-measure-x',
    measureY = 'highcharts-measure-y',
    fibonacci = 'highcharts-fibonacci',
    pitchfork = 'highcharts-pitchfork',
    parallel = 'highcharts-parallel-channel',
    counter = 'highcharts-vertical-counter',
    counterLabel = 'highcharts-vertical-label',
    counterArrow = 'highcharts-vertical-arrow',
    flagsCircle = 'highcharts-flag-circlepin',
    flagsDiamond = 'highcharts-flag-diamondpin',
    flagsSquare = 'highcharts-flag-squarepin',
    flagsSimple = 'highcharts-flag-simplepin',
    seriesOhlc = 'highcharts-series-type-ohlc',
    seriesLine = 'highcharts-series-type-line',
    seriesCandlestick = 'highcharts-series-type-candlestick',
    save = 'highcharts-save-chart',
    full = 'highcharts-full-screen',
    zoomX = 'highcharts-zoom-x',
    zoomY = 'highcharts-zoom-y',
    zoomXY = 'highcharts-zoom-xy',
    price = 'highcharts-current-price-indicator',
    toggle = 'highcharts-toggle-annotations'
}




class ChartOptions {
    public lable?: string;
    public icon: string;
    public options: Array<ChartOptionItem>;
    public type?: OptionType;
    constructor(_icon: string, _options: Array<ChartOptionItem>, _lable?: string, _type?: OptionType) {
        this.type = _type;
        this.lable = _lable;
        this.icon = _icon;
        this.options = _options;
    }
}

class ChartOptionItem {
    public type: OptionType;
    public icon: string;
    public lable: string;
    constructor(_type: OptionType, _lable: string, _icon: string) {
        this.type = _type;
        this.icon = _icon;
        this.lable = _lable;
    }
}

class OhlcData {
    public x: number;
    public open: number;
    public high: number;
    public low: number;
    public close: number;
    constructor(_x: number, _open: number, _high: number, _low: number, _close: number) {
        this.x = _x;
        this.open = _open;
        this.high = _high;
        this.low = _low;
        this.close = _close;
    }
}

class VolumeData {
    public x: number;
    public y: number;
    public color: string;
    constructor(_x: number, _y: number, _color: string) {
        this.x = _x;
        this.y = _y;
        this.color = _color;
    }
}


class SeriesItem {
    public name: string;
    public type: string;
    public index: number;
    public period: number;
    public yAxis: boolean;
    public volume: boolean;
    public standardDeviation?: number;
    public volumeSeriesID?:string
    constructor(_name: string, _type: string, _index: number, _period: number, _yAxis: boolean, _volume: boolean, _standardDeviation?: number,_volumeSeriesID?:string) {
        this.name = _name;
        this.type = _type;
        this.index = _index;
        this.period = _period;
        this.yAxis = _yAxis;
        this.volume = _volume;
        this.standardDeviation = _standardDeviation;
        this.volumeSeriesID = _volumeSeriesID;
    }
}

class ChartItem {
    public id: string;
    public name: string;
    constructor(_id: string, _name: string) {
        this.id = _id;
        this.name = _name;
    }
}


export { OptionType, ChartOptions, ChartOptionItem, OhlcData, VolumeData, SeriesItem,ChartItem };