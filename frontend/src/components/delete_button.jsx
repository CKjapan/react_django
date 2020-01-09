import React, { Component } from 'react';
import axios from 'axios';
import { getcookie } from './cookie_get_button';


//delete処理
class Deletebody extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.props);
    //認証トークン取得
    const deletetoken = getcookie();
    axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/${this.props.id}/`,
      data: '',
      headers: { Authorization: `Token ${deletetoken[" Token"]}` }
    })
      //成功したら
      .then(res => {
        //リスト更新
        this.props.getdb();
      })
  };

  //削除ボタンJSX表示
  render() {
    return (
      <button onClick={this.handleSubmit}>削除</button>
    );
  }
}

export default Deletebody;