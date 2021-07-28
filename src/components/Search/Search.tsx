import { observer } from 'mobx-react';
import ChartStore from '../../stores/ChartStore';
import StatisticStore from '../../stores/StatisticStore';
import './Search.scss';

export const Search = observer(() => {
    if (!StatisticStore.summary || !StatisticStore.incomes || !StatisticStore.assets ) {
        return (<div></div>);
    }
    let symbolList: Array<string> = StatisticStore.summary?.symbol.split('_');
    let yearsList: Array<string> = StatisticStore.incomes?.financial_years.split(',');
    let revenueList: Array<string> = StatisticStore.incomes?.total_revenues.split(',');
    let incomeList: Array<string> = StatisticStore.incomes?.net_incomes.split(',');
    let assetList: Array<string> = StatisticStore.assets?.total_assets.split(',');
    let liabsList: Array<string> = StatisticStore.assets?.total_liabs.split(',');
    let year: string = yearsList[1].split("-").reverse().join('/');
    let income: string = (((parseFloat(revenueList[0]) - parseFloat(revenueList[1])) / parseFloat(revenueList[1])) * 100).toFixed(2);
    let netIncome: string = (((parseFloat(incomeList[0]) - parseFloat(incomeList[1])) / parseFloat(incomeList[1])) * 100).toFixed(2);
    let curAsset = parseFloat(assetList[0]) - parseFloat(liabsList[0]);
    let lastAsset = parseFloat(assetList[1]) - parseFloat(liabsList[1]);
    let netAssets: string = (((curAsset - lastAsset) / lastAsset) * 100).toFixed(2);
    let curClose = ChartStore.stockData[0]?.close;
    let preClose = ChartStore.stockData[1]?.close;
    return (
        <div className="topWrapper">
            {/* <div className='search-wrapper'>
                <div className="icon"></div>
                <Paper component="form" >
                    <img className='search' src={require(`../../images/search.svg`).default}></img>
                    <InputBase
                        placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <img className="close" src={require(`../../images/close.svg`).default}></img>
                </Paper>
            </div> */}

            <div className="info">
                <div className="icon">{symbolList[0][0]}</div>
                <div className="stock-info">
                    <div className='top-info'>
                        <div className="title-info"><div className="title">{symbolList[0]}</div> <div className="subtitle">{symbolList[1]}</div></div>
                      {ChartStore.stockData &&  <div className="data">{curClose}({((curClose - preClose) / preClose * 100).toFixed(2)}%)</div>}
                    </div>
                    <div className='bottom-info'>
                        <div className="abstract">{StatisticStore.summary.name}</div>
                        <img className="follow" src={require(`../../images/add.svg`).default}></img>
                    </div>
                </div>
            </div>

            <div className="introduce">
                BBIN公司从{year}结束的财政年度开始：收入上升了{income}%；净收入上升了{netIncome}%；净资产上升了{netAssets}%。
            </div>
            <div className="introduce">

            </div>
        </div>
    );
});