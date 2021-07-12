import { Charts } from "./Charts/Charts";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from '../scss/App.module.scss';

function App() {
  return (
    <div className="App">
      <Charts />
      <div className={styles.clear} ></div>
      <div className={styles.tab}></div>
      <div className={styles.test}></div>
      <div className={styles.testq}></div>
    </div>
  );
}

export default App;
