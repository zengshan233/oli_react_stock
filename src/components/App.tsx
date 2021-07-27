import { Charts } from "./Charts/Charts";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from '../scss/App.module.scss';
import Routes from "./Routes";
import Search from "./Search/Search";
import Info from "./Info/Info";

interface AppProps {
  routes: any;
}

function App(props: AppProps) {
  return (
    <div className="App">
      <Search />
      <Charts />
      <Info />
      <Routes routes={props.routes} />
    </div>
  );
}

export default App;
