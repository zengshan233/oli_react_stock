import ReactDOM from 'react-dom';
import './scss/index.scss';
import Stock from './components/Stock/Stock';
import reportWebVitals from './reportWebVitals';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import 'lib-flexible';
import { FullScreenCharts } from './components/Charts/FullScreenChart';
import Test from './components/Test';

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <Router history={browserHistory}>
    <Switch>
      <Route path="/" component={Stock} exact={true}/>
      <Route path="/fullScreenChart" component={FullScreenCharts} />
      <Route path="/test" component={Test} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
