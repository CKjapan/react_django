import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// import "./styles.css";
//cookie取得関数インポート
import { getcookie } from './components/get_cookie_function';

//ルーティングに必要なコンポーネントをインポート
import Read from './pages/read';
import Template from './pages/template';
import Create from './pages/create';
import Detail from './pages/detail';
import LoginApp from './pages/login';
import LogoutApp from './pages/logout';
import { createEditor } from "./rete/rete";
import SignupApp from './pages/signup';


//readPage
const ReadPage = () => {
  return (
    <div>
      <div className='header'>
        <div className='logo_box'>Logo</div>
        <LogoutApp />
      </div>
      <div className="main">
        {/* <div className="dock_title"><h1>DashBoard</h1></div> */}
        <Read />
      </div >
    </div >
  )
}

//templatePage
const TemplatePage = (props) => {
  return (
    <div>
      <div className='header'>
        <div className='logo_box'>Logo</div>
        {/* <h1>テンプレートから作成ページ</h1> */}
        <Template {...props} />
        <LogoutApp />
      </div>
      <div className="main">
        {/* <div className="dock_title"><h1>Dock</h1></div> */}
        <div className="dock"></div>
        <div>
          <Rete />
        </div>
      </div>
    </div>
  );
}

//createPage
const CreatePage = () => {
  return (
    <div>
      <div className='header'>
        <div className='logo_box'>Logo</div>
        <Create />
        <LogoutApp />
      </div>
      <div className="main">
        {/* <div className="dock_title"><h1>Dock</h1></div> */}
        <div className="dock"></div>
        <div>
          <Rete />
        </div>
      </div>
    </div>
  );
}

//detailPage
const DetailPage = (props) => {
  return (
    <div>
      <div className='header'>
        <div className='logo_box'>Logo</div>
        {/* <h1>テンプレートから作成ページ</h1> */}
        <Detail {...props} />
        <LogoutApp />
      </div>
      <div className="main">
        {/* <div className="dock_title"><h1>Dock</h1></div> */}
        <div className="dock"></div>
        <div>
          <Rete />
        </div>
      </div>
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
        <div>

          <Switch>
            <Route exact path="/signup" component={SignupApp} />
            <Route exact path="/login" component={LoginApp} />
            <Route exact path="/" render={props => isAuthenticated
              ? (<Redirect to="/read" />)
              : (<Redirect to="/login" />)
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

//Rete表示
export function Rete() {
  return (
    <div className="ReteApp">
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={ref => ref && createEditor(ref)}
      />
    </div>
  );
}




export default App;