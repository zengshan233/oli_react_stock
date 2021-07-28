import { Charts } from "./Charts/Charts";
import { Search } from "./Search/Search";
import Info from "./Info/Info";
import { useEffect } from "react";
import registerGlobalFuncs from "../utils/globalFuncs";
import { observer, } from "mobx-react";
import ChartStore from '../stores/ChartStore';
import Lottie from 'react-lottie-player'
import loading from '../lottie/loading.json';
import { FullScreenCharts } from "./Charts/FullScreenChart";
import { Statistic } from "./Statistic/Statistic";
import StockData from "./StockData/StockData";


export const App = observer(() => {
  useEffect(() => {
    registerGlobalFuncs();
  }, [])
  if (ChartStore.fullScreen) {
    return <FullScreenCharts />;
  }
  return (
    <div className="App">
      <Search />
      <Charts />
      <Info />
      {ChartStore.stockTab == 1 ? <Statistic /> : ChartStore.stockTab == 2 ? <StockData /> : <div></div>
      }
      <div className="loading" style={{ display: ChartStore.pending ? 'block' : 'none' }}>
        {ChartStore.init && <Lottie
          className="plane"
          style={{}}
          loop
          animationData={loading}
          play
        />}

      </div>
    </div>
  );
});
