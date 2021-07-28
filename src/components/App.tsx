import { Charts } from "./Charts/Charts";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from '../scss/App.module.scss';
import Routes from "./Routes";
import { Search } from "./Search/Search";
import Info from "./Info/Info";
import { useEffect } from "react";
import registerGlobalFuncs from "../utils/globalFuncs";
import { observer, } from "mobx-react";
import ChartStore from '../stores/ChartStore';
import Lottie from 'react-lottie-player'
import loading from '../lottie/loading.json';
import { FullScreenCharts } from "./Charts/FullScreenChart";
interface AppProps {
  routes: any;
}

export const App = observer((props: AppProps) => {
  useEffect(() => {
    registerGlobalFuncs();
  }, [])
  if (!ChartStore.init) {
    return <div></div>
  }
  if (ChartStore.pending) {
    return <div className="loading">
      <Lottie
        className="plane"
        loop
        animationData={loading}
        play
      />

    </div>
  }
  if (ChartStore.fullScreen) {
    return <FullScreenCharts />;
  }

  return (
    <div className="App">
      <Search />
      <Charts />
      <Info />
      <Routes routes={props.routes} />
    </div>
  );
});
