import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

//cookie取得関数インポート
import { getcookie } from './components/get_cookie_function';

//ルーティングに必要なコンポーネントをインポート
import Read from './pages/read';
import Create from './pages/detail_page';
import LoginApp from './pages/login';
import LogoutApp from './pages/logout';

//readPage
const ReadPage = () => {
  return (
    <div>read
     <LogoutApp />
      <Read />
    </div>
  )
}

//createPage
const CreatePage = (props) => {
  return (
    <div>main
     <LogoutApp />
      <Create  {...props} />
      {/* <Rete/> */}
    </div>
  );
}

//認証状態の確認
let isAuthenticated = true

const getc = getcookie();
if (getc[" UserId"] !== undefined) {
  isAuthenticated = true
} else {
  isAuthenticated = false
};

//ルーティング処理
const App = () => {
  return (
    <div className="App">
      <p>{`isAuthenticated: ${isAuthenticated}`}</p>

      <Router>
        <div>
          <ul>
            <li><Link to="/create">Create</Link></li>
            <li><Link to="/read">Reads</Link></li>
          </ul>

          <hr />
        </div>
        <div>

          <Switch>
            <Route exact path="/login" component={LoginApp} />
            <Route exact path="/" render={props => isAuthenticated
              ? (<Redirect to="/logout" />)
              : (<Redirect to="/read" />)
            } />

            <PrivateRoute exact path="/create/:id" component={CreatePage} />
            <PrivateRoute exact path="/read" component={ReadPage} />
            {/* <PrivateRoute exact path="/read/:id" component={PostDetail} /> */}
          </Switch>

        </div>
      </Router>
    </div>
  )
}

//ログインしてない時のリダイレクト
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (isAuthenticated
      ? <Component {...props} />
      : <Redirect to="/login" />
    )} />
  )
}


export default App;