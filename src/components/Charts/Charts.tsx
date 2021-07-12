import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import ChartsConfig from '../../config/ChartsConfig';
import './Chart.scss';
import chartStore from '../../stores/ChartStore';
import Menu from './OptionMenu';




export const Charts = observer(() => {
  const optionsConfig: ChartsConfig = new ChartsConfig();
  useEffect(() => {
    chartStore.paintChart();
  }, []);
  let optionList = optionsConfig.basicOptions.map((tab, idx) => (
    <li key={idx} className={tab.type || tab.options[0].type} title="Simple shapes">
      <img className="highcharts-menu-item-btn" src={require(`../../images/${tab.icon}`).default}></img>
      {tab.lable && <span className="highcharts-menu-item-title">{tab.lable}</span>}
      <ul>
        {tab.options.map((option, i) => (
          <li key={i} className={option.type} title={option.lable} onClick={() => { }} >
            <img className="highcharts-menu-item-btn" src={require(`../../images/${option.icon}`).default}></img>
            <span className="highcharts-menu-item-title">{option.lable}</span>
          </li>
        ))}
      </ul>
    </li>
  ));
  optionList.push(<Menu />)
  optionList.push(<div className="clear"></div>);
  return (
    <div className="chart-wrapper">
      <div className="highcharts-popup highcharts-popup-indicators">
        <span className="highcharts-close-popup">&times;</span>
        <div className="highcharts-popup-wrapper">
          <label htmlFor="indicator-list">Indicator</label>
          <select name="indicator-list">
            <option value="sma">SMA</option>
            <option value="ema">EMA</option>
            <option value="bb">Bollinger bands</option>
          </select>
          <label htmlFor="stroke">Period</label>
          <input type="text" name="period" value="14" />
        </div>
        <button>Add</button>
      </div>
      <div className="highcharts-popup highcharts-popup-annotations">
        <span className="highcharts-close-popup">&times;</span>
        <div className="highcharts-popup-wrapper">
          <label htmlFor="stroke">Color</label>
          <input type="text" name="stroke" />
          <label htmlFor="stroke-width">Width</label>
          <input type="text" name="stroke-width" />
        </div>
        <button>Save</button>
      </div>
      <div className="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
        <div className="highcharts-menu-wrapper">
          <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
            {optionList}
          </ul>
        </div>
      </div>
      <div id="container" className="chart"></div>
    </div>
  );
})