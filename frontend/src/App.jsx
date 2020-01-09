import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

//cookie取得関数インポート
import { getcookie } from './components/get_cookie_function';

//ルーティングに必要なコンポーネントをインポート
import Read from './pages/read';
import Template from './pages/template';
import Create from './pages/create';
import Detail from './pages/detail';
import LoginApp from './pages/login';
import LogoutApp from './pages/logout';

//readPage
const ReadPage = () => {
  return (
    <div>一覧ページ
     <LogoutApp />
      <Read />
    </div>
  )
}

//templatePage
const TemplatePage = (props) => {
  return (
    <div>テンプレートから作成ページ
     <LogoutApp />
      <Template {...props} />
      {/* <Rete/> */}
    </div>
  );
}

//createPage
const CreatePage = () => {
  return (
    <div>新規作成ページ
     <LogoutApp />
      <Create />
      {/* <Rete/> */}
    </div>
  );
}

//detailPage
const DetailPage = (props) => {
  return (
    <div>保存済のプロジェクトの編集ページ
     <LogoutApp />
      <Detail {...props} />
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
      {/* <p>{`isAuthenticated: ${isAuthenticated}`}</p> */}

      <Router>
        {/* <div>
          <ul>
            <li><Link to="/create/new">Create</Link></li>
            <li><Link to="/read">Reads</Link></li>
          </ul>
          <p>↑線より上は管理用（将来消す）↑</p>
          <hr />
        </div> */}
        <div>

          <Switch>
            <Route exact path="/login" component={LoginApp} />
            <Route exact path="/" render={props => isAuthenticated
              ? (<Redirect to="/logout" />)
              : (<Redirect to="/read" />)
            } />

            <PrivateRoute exact path="/template/:id" component={TemplatePage} />
            <PrivateRoute exact path="/create/new" component={CreatePage} />
            <PrivateRoute exact path="/detail/:id" component={DetailPage} />

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