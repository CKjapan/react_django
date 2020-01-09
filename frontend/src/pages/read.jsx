import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Deletebody from '../components/delete_button';
import Detailbody from '../components/detail_button';
import { getcookie } from '../components/get_cookie_function';

//一覧表示処理
class Read extends Component {
  constructor(props) {
    super(props);
    //datalistは登録したものを配列で保持。name等はinputbox用に用意
    this.state = {
      datalist: [],
      title: '',
      body: ''
    };
  };

  //コンポーネント作成時の処理//データベースから情報取得しsetState
  componentDidMount = () => {
    this.getdb();
  };

  //DB取得関数
  getdb = () => {
    const cookie = getcookie();
    axios
      ({
        method: 'GET',
        url: `http://127.0.0.1:8000/api/v1/?author=${cookie[" UserId"]}`,
        data: '',
        headers: { Authorization: `Token ${cookie[" Token"]}` }
      })
      .then(res => {
        this.setState({ datalist: res.data });
      })
  };

  render() {
    //全リスト表示は一旦変数に格納
    const list = this.state.datalist.map((datalist) => {
      return (
        <li key={datalist.id}>
          <div id={datalist.author}>
            <Detailbody id={datalist.id} />
            <Deletebody id={datalist.id} getdb={this.getdb} />
            title:{datalist.title} body:{datalist.body}
          </div>
        </li>
      );
    });

    return (
      <div>
        <Link to={`/create/new`}>新規プロジェクト作成</Link>
        <p>標準テンプレートから作成</p>
        <ul>
          <li><Link to={`/template/1`}>テンプレート1</Link></li>
          <li><Link to={`/template/2`}>テンプレート2</Link></li>
          <li><Link to={`/template/3`}>テンプレート3</Link></li>
        </ul>
        <p>保存済のプロジェクトの呼び出し</p>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default Read;