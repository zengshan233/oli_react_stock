import { getAdministration } from 'mobx/dist/internal';
import { useEffect } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import ChartsConfig from '../../config/ChartsConfig';
import { Ajax } from '../../utils/http';
import './Statistic.scss';
import StatisticTabs from './StatisticTabs';

interface statisticProps extends RouteConfigComponentProps {
    routes?: any;
}

export default function Statistic(props: statisticProps) {
    let chart: any;
    let statisticData: any = [];
    useEffect(() => {
        getData();
    }, []);


    let getData = async () => {
        var Highcharts: any = (window as any).Highcharts;
        statisticData = await new Ajax('https://demo-live-data.highcharts.com/aapl-c.json').get();
        let data1: any = [], data2: any = [];
        statisticData.slice(0, 30).forEach((d: any, i: any) => {
            if (i <= 10) {
                data1.push(d);
                data2.push([d[0]]);
            } else if (i <= 21) {
                data2[i - 11][1] = d[1];
            }
        })
        chart = Highcharts.stockChart('statisticChart', ChartsConfig.setStatisticChart(data1, data2,chart));
    }

    let updateChart = (range: Array<number>) => {
        let data1: any = [], data2: any = [];
        statisticData.slice(...range).forEach((d: any, i: any) => {
            if (i <= 10) {
                data1.push(d);
                data2.push([d[0]]);
            } else if (i <= 21) {
                data2[i - 11][1] = d[1];
            }
        })
        console.log("data1", data1)
        console.log("data2", data2)
        chart.series[0].update({ data: data1 });
        chart.series[1].update({ data: data2 });
    }

    return (
        <div className="statisticWrapper">
            <StatisticTabs onChanged={(key: any) => {
                console.log("keyyyyyyy", key);
                if (key == 1) {
                    updateChart([0, 30]);

                }
                if (key == 2) {
                    updateChart([30, 80]);
                }
                if (key == 3) {
                    updateChart([90, 140]);
                }
            }} />
            <div className="chartWraper">
                <div id="statisticChart" ></div>
                <div className='statisInfo'>
                    <div className="content">
                        <div>长期债务</div>
                        <div>股本比</div>
                        <div className="value">152.63%</div>
                    </div>

                    <div className="content">
                        <div>债务股本比</div>
                        <div className="value">152.63%</div>
                    </div>

                    <div className="content">
                        <div>流动比率</div>
                        <div className="value">1.17</div>
                    </div>

                    <div className="content">
                        <div>速动比率</div>
                        <div className="value">1.13</div>
                    </div>
                </div>
                <div className="clear"></div>
            </div>
            <div className="tipsWrapper">
                <div className="tips"><div className="line1"></div> <div className="tipsInfo">总资产</div> </div>
                <div className="tips"><div className="line2"></div> <div className="tipsInfo">总负债</div> </div>
            </div>
        </div>
    );
}