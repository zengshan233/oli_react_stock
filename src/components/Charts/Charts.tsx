import { observer } from 'mobx-react';
import { useEffect } from 'react';
import ChartsConfig from '../../config/ChartsConfig';
import ChartStore from '../../stores/ChartStore';
import { MenuBtn } from './Menu';
import './Chart.scss';

export const Charts = observer(() => {
  const optionsConfig: ChartsConfig = new ChartsConfig();
  
  useEffect(()=>{
        ChartStore.paintChart(false);
  },[])
  let optionList = optionsConfig.basicOptions.map((tab, idx) => {
    if (idx == 1) {
      return <MenuBtn key={idx} />
    }
    let icon = ChartStore.iconMap[tab.id];
    return (
      <li key={idx} onClick={() => {
        if (idx == 0) {
          ChartStore.fullScreen = true;
          return;
        }
        ChartStore.setCurrentOption(tab.id)
      }} title="Simple shapes">
        <img className="highcharts-menu-item-btn" src={require(`../../images/${icon}`).default}></img>
        {tab.lable && <span className="highcharts-menu-item-title">{tab.lable}</span>}
        {ChartStore.currentOptionId == tab.id && <ul id={`optionMenu${tab.id}`}>
          {tab.options.map((option, i) => (
            <li key={i} className={option.type} title={option.lable} onClick={(e) => {
              ChartStore.onTypePicked(tab.id, option.icon);
            }} >
              <img className="highcharts-menu-item-btn" src={require(`../../images/${option.icon}`).default}></img>
              <span className="highcharts-menu-item-title">{option.lable}</span>
            </li>
          ))}
        </ul>}
      </li>
    );
  });
  optionList.push(<li key='more' className="more" onClick={() => { ChartStore.showMore() }}> <img src={require(`../../images/more.svg`).default}></img></li>);
  optionList.push(<div key='clear' className="clear"></div>);
  return (
    <div className="chart-wrapper">
      <div className="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper">
        <div className="highcharts-menu-wrapper">
          <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
            {optionList}
          </ul>
          {ChartStore.moreOptions && <ul className="highcharts-stocktools-toolbar stocktools-toolbar">
            {optionsConfig.options.map((tab, idx) => {
              let icon = ChartStore.iconMap[tab.id];
              return (
                <li key={idx} onClick={() => {
                  ChartStore.setCurrentOption(tab.id)
                }} title="Simple shapes">
                  <img className="highcharts-menu-item-btn" src={require(`../../images/${icon}`).default}></img>
                  {tab.lable && <span className="highcharts-menu-item-title">{tab.lable}</span>}
                  {ChartStore.currentOptionId == tab.id && <ul>
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
              );
            })}
          </ul>}
        </div>
      </div>
      <div id="container" className="chart"></div>
      <div className="clear"></div>
    </div>
  );
})