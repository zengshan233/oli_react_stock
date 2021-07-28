import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import ChartsConfig from '../../config/ChartsConfig';
import { StatisticType } from '../../services/StatisticService';
import StatisticStore from '../../stores/StatisticStore';
import './Statistic.scss';
import StatisticTabs from './StatisticTabs';
import KeepAlive, { AliveScope } from 'react-activation';


export const Statistic = observer(() => {
    useEffect(() => {
        StatisticStore.paintChart();
    }, []);
    let config: ChartsConfig = new ChartsConfig();
    let tips: string[] = config.statisticTabs.find((t) => t.type == StatisticStore.type)?.tips || [];
    return (
        <AliveScope>
            <KeepAlive>
                <div className="statisticWrapper">
                    <StatisticTabs onChanged={(type: StatisticType) => {
                        StatisticStore.handleTabChange(type);
                    }} />
                    <div className="chartWraper">
                        <div id="statisticChart" ></div>
                        {StatisticStore.type == StatisticType.assets ? <div className='statisInfo'>
                            <div className="content">
                                <div>长期债务</div>
                                <div>股本比</div>
                                <div className="value">{StatisticStore.assets?.long_term_debt_to_equity.toFixed(2)}%</div>
                            </div>
                            <div className="content">
                                <div>债务股本比</div>
                                <div className="value">{StatisticStore.assets?.total_debt_to_equity.toFixed(2)}%</div>
                            </div>

                            <div className="content">
                                <div>流动比率</div>
                                <div className="value">{StatisticStore.assets?.current_ratio.toFixed(2)}</div>
                            </div>

                            <div className="content">
                                <div>速动比率</div>
                                <div className="value">{StatisticStore.assets?.quick_ratio.toFixed(2)}</div>
                            </div>
                        </div> : StatisticStore.type == StatisticType.incomes ? <div className='statisInfo'>
                            <div className="content">
                                <div>投资回报率</div>
                                <div className="value">{StatisticStore.incomes?.return_on_investment.toFixed(2)}%</div>
                            </div>

                            <div className="content">
                                <div>净利润率</div>
                                <div className="value">{StatisticStore.incomes?.net_profit_margin.toFixed(2)}%</div>
                            </div>

                            <div className="content">
                                <div>营业利润率</div>
                                <div className="value">{StatisticStore.incomes?.operating_margin.toFixed(2)}</div>
                            </div>

                            <div className="content">
                                <div>毛利润率</div>
                                <div className="value">{StatisticStore.incomes?.gross_margin.toFixed(2)}</div>
                            </div>
                        </div> : <div className='statisInfo'>
                            <div className="content">
                                <div>营业利润率</div>
                                <div className="value">{StatisticStore.incomes?.operating_margin.toFixed(2)}</div>
                            </div>

                            <div className="content">
                                <div>毛利润率</div>
                                <div className="value">{StatisticStore.incomes?.gross_margin.toFixed(2)}</div>
                            </div>
                        </div>
                        }

                        <div className="clear"></div>
                    </div>
                    <div className="tipsWrapper">
                        <div className="tips"><div className="line1"></div> <div className="tipsInfo">{tips[0]}</div> </div>
                        <div className="tips"><div className="line2"></div> <div className="tipsInfo">{tips[1]}</div> </div>
                    </div>
                </div>
            </KeepAlive>
        </AliveScope>
    );
});
