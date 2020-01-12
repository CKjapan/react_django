import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Deletebody from '../components/delete_button';
// import Detailbody from '../components/detail_button';
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
      ({//6f87e1c4652ea873634c09f55ddce83e68e16ad1
        method: 'GET',//
        url: `http://127.0.0.1:8000/api/v1/?author=${cookie[" UserId"]}`,
        data: '',
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        this.setState({ datalist: res.data });
      }).catch(err => {
        console.log('err:', err);
      });
  };

  render() {
    //全リスト表示は一旦変数に格納
    const list = this.state.datalist.map((datalist) => {
      return (
        <tr className='create_list' key={datalist.id}>
          <td>
            <Deletebody id={datalist.id} getdb={this.getdb} />
          </td>
          <td>
            <Link to={`/detail/${datalist.id}`}>{datalist.title}</Link>
          </td>
        </tr>
      );
    });

    return (
      <div className='read_box'>
        <div className='create_list_box'>
          <p>新規プロジェクトから作成</p>
          <ul><li className='create_list'><Link to={`/create/new`}>作成</Link></li></ul>

          <p>標準テンプレートから作成</p>
          <ul>
            <li className='create_list'><Link to={`/template/1`}>テンプレート1</Link></li>
            <li className='create_list'><Link to={`/template/2`}>テンプレート2</Link></li>
            <li className='create_list'><Link to={`/template/3`}>テンプレート3</Link></li>
          </ul>
        </div>

        <div className='detail_list_box'>
          <p>保存済のプロジェクトの呼び出し</p>
          <table><tbody>{list}</tbody></table>
        </div>
      </div>
    );
  }
}

export default Read;