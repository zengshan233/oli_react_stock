import { observer } from 'mobx-react';
import { useEffect } from 'react';
import ChartsConfig from '../../config/ChartsConfig';
import ChartStore from '../../stores/ChartStore';
import { useHistory } from "react-router-dom";

import './Chart.scss';
import { MenuBtn } from './Menu';
import { RouteConfigComponentProps } from 'react-router-config';

export const FullScreenCharts = observer(() => {
    const optionsConfig: ChartsConfig = new ChartsConfig();

    let history = useHistory();
    useEffect(() => {
        ChartStore.paintChart(true);
    }, []);
    let optionList = [...optionsConfig.basicOptions, ...optionsConfig.options];
    return (
        <div className="chart-wrapper  chart-full-wrapper">
            <div className="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
                <div className="highcharts-menu-wrapper">
                    <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
                        {optionList.map((tab, idx) => {
                            if (idx === 1) {
                                return <MenuBtn key={idx} />
                            }
                            return (

                                <li key={idx} onClick={() => {
                                    if (idx === 0) {
                                        ChartStore.fullScreen = false;
                                        return;
                                    }
                                    ChartStore.setCurrentOption(tab.id)
                                }} title="Simple shapes">
                                    <img className="highcharts-menu-item-btn" src={require(`../../images/${ChartStore.iconMap[tab.id]}`).default}></img>
                                    {tab.lable && <span className="highcharts-menu-item-title">{tab.lable}</span>}
                                    {ChartStore.currentOptionId === tab.id && <ul>
                                        {tab.options.map((option, i) => (
                                            <li key={i} className={option.type} title={option.lable} onClick={(e) => {
                                                ChartStore.onTypePicked(tab.id, option.icon);
                                            }}  >
                                                <img className="highcharts-menu-item-btn" src={require(`../../images/${option.icon}`).default}></img>
                                                <span className="highcharts-menu-item-title">{option.lable}</span>
                                            </li>
                                        ))}
                                    </ul>}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div id="container" className="chart fullChart"></div>
            <div className="clear"></div>
        </div>
    );
})