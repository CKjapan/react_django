import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Button from '@material-ui/core/Button';


//ログイン詳細へ
class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      // email: '',
      password: '',
      login: false
    }
  }

  //入力内容をinputboxに反映させる関数
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //login処理
  handleSubmit = (e) => {
    e.preventDefault();
    //データベース送信用定数
    const data = { username: this.state.username, email: this.state.email, password: this.state.password };
    //認証処理//認証データの送信とTokenの取得
    axios
      .post('http://127.0.0.1:8000/api/v1/rest-auth/login/', data)
      .then(res => {
        //無事POST出来たらtokenkeyをcookieへ保存
        document.cookie = 'Token=' + encodeURIComponent(res.data.key);
        //GETでリクエスト
        axios
          .get('http://127.0.0.1:8000/api/v1/users/', {
            headers: { Authorization: `Token ${res.data.key}` }
          })
          //成功したらid取得
          .then(res => {
            const resdata = res.data;
            const fildata = resdata.filter((obj) => {
              return obj.username === data.username;
            });
            //無事GET出来たらusername,idをcookieへ保存
            document.cookie = `UserId=` + encodeURIComponent(fildata[0].id);
            document.cookie = `UserName=` + encodeURIComponent(fildata[0].username);
            //最後にinputboxを空に&ログイン状態をtrueに
            this.setState({
              username: '',
              email: '',
              password: '',
              login: true
            });

          })
      })
      .catch(err => {
        console.log(err);
      });
  };


  //表示
  render() {
    //もしログイン状態ならログアウトあるページへ飛ばす
    if (this.state.login === true) {
      return <Redirect to="/read" />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          username:
         <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          password:
         <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
          <Button type="submit">ログイン</Button>
        </form>
      </div>
    );

  }
}

export default LoginApp;