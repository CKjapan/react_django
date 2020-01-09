import React, { Component } from 'react';
import axios from 'axios';
import { getcookie } from './cookie_get_button';


//delete処理
class Deletebody extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    //認証トークン取得
    const token = getcookie();
    axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/${this.props.id}/`,
      data: '',
      headers: { Authorization: `Token ${token[" Token"]}` }
    })
      .then(res => {
        //リスト更新
        this.props.getdb();
      })
  };

  render() {
    return (
      <button onClick={this.handleSubmit}>削除</button>
    );
  }
}

export default Deletebody;