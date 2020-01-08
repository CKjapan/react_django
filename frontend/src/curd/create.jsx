import React, { Component } from 'react';
import axios from 'axios';

import { getcookie } from '../cookie';

// import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

//create処理
class Create extends Component {
  constructor(props) {
    super(props);
    //todosは登録したものを配列で保持。name等はinputbox用に用意
    this.state = {
      title: '',
      body: '',
    };
  };

  componentDidMount = () => {
    console.log(this.props.match.params.id)
    // API
  }

  //入力内容をinputboxに反映させる関数
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //submitでstate更新＆データベース保存
  handleSubmit = (e) => {
    e.preventDefault();
    //cookie取得
    const cookie = getcookie();
    //データベース保存用定数
    const data = { author: cookie[" UserId"], title: this.state.title, body: this.state.body };
    //データベース保存処理
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
      }).catch(err => {
        console.log(err);
      });
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
        <button>上書保存-未実装-</button>
        <button>一覧へ戻る-未実装-</button>
      </div >
    );
  }
}

export default Create;