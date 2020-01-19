import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import DeleteButton from '../components/delete_button';
import { getcookie } from '../components/get_cookie_function';
import DetailButton from '../components/detail_button';


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
          <td style={{ width: '400px' }}>
            <a>{datalist.title}</a>
          </td>
          <td style={{ width: '40px' }}>
            <DeleteButton id={datalist.id} getdb={this.getdb} />
          </td>
          <td style={{ width: '40px' }}>
            <DetailButton id={datalist.id} />
          </td>
        </tr>
      );
    });

    return (
      <div className='read_box'>

        <div className='create_list_box'>
          <Link to={`/create/new`}><Button variant="contained" color="primary">新規作成</Button></Link>
          <p>テンプレートから作成</p>
          <Link to={`/template/1`}><Button className='template_button' variant="contained">テンプレート1</Button></Link>
          <Link to={`/template/2`}><Button className='template_button' variant="contained">テンプレート2</Button></Link>
          <Link to={`/template/3`}><Button className='template_button' variant="contained">テンプレート3</Button></Link>
        </div>

        <div className='detail_list_box'>
          <p>保存したプロジェクト</p>
          <table><tbody>{list}</tbody></table>
        </div>
      </div>
    );
  }
}

export default Read;