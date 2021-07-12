import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import 'lib-flexible';

const browserHistory = createBrowserHistory();

ReactDOM.render(
    <Router history={browserHistory}>
      <Switch>
        <Route
          path="/"
          component={App}
        />
      </Switch>
    </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
