import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

//cookie取得関数インポート
import { getcookie } from './cookie';

//ルーティングに必要なコンポーネントインポート
import Read from './curd/read';
import Create from './curd/create';
import LoginApp from './auth/login';
import LogoutApp from './auth/logout';

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