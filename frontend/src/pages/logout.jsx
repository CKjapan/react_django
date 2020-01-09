import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

import { getcookie } from '../components/get_cookie_function';


//logout処理
class LogoutApp extends Component {
  state = {
    logout: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //cookie取得
    const cookie = getcookie();
    //postでリクエスト
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/rest-auth/logout/',
      data: '',
      headers: { Authorization: `Token ${cookie[" Token"]}` }
    })
      //成功したら
      .then(res => {
        //cookieからトークン削除
        document.cookie = 'Token=' + encodeURIComponent(cookie[" Token"]) + ';max-age=0';
        document.cookie = 'UserName=' + encodeURIComponent(cookie[" UserName"]) + ';max-age=0';
        document.cookie = 'UserId=' + encodeURIComponent(cookie[" UserId"]) + ';max-age=0';
        //ログアウト状態をtrueに
        this.setState({ logout: true });
      })
  };

  //ログアウトボタンJSX表示
  render() {
    // もしログアウト状態ならログインページへ飛ばす
    if (this.state.logout === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <button >ログアウト</button>
        </form>
      </div>
    )
  }
}

export default LogoutApp;