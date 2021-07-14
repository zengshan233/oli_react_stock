import { Charts } from "./Charts/Charts";
import { StickyContainer, Sticky } from 'react-sticky';
import styles from '../scss/App.module.scss';

function Test() {
  return (
    <div className="App">
      <div className={styles.clear} ></div>
      <div className={styles.tab}></div>
      <div className={styles.test}></div>
      <div className={styles.testq}></div>
    </div>
  );
}

export default Test;
