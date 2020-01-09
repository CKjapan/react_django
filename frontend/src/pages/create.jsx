import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { getcookie } from '../components/get_cookie_function';


//create処理
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  };

  //入力内容をinputboxに反映させる関数
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //submitでstate更新＆データベース保存
  handleSubmit = (e) => {
    e.preventDefault();
    const cookie = getcookie();
    //データベース保存用定数
    const data = { author: cookie[" UserId"], title: this.state.title, body: this.state.body };
    //データベース保存
    axios
      ({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/',
        data: data,
        headers: { Authorization: `Token ${cookie[" Token"]}` }
      })
      .then(res => {
        //無事POST出来たらinputboxを空にして
        this.setState({
          title: "",
          body: ""
        });
      })
  };

  //入力フォームJSX表示
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          title:
         <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          body:
         <textarea name="body" value={this.state.body} onChange={this.handleChange} />
          <button >新規登録</button>
        </form>
        <Link to={`/read`}>一覧へ戻る</Link>
      </div >
    );
  }
}

export default Create;