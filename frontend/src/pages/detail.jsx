import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { getcookie } from '../components/get_cookie_function';


//create処理
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datalist: [],
      title: '',
      body: '',
    };
  };

  //idに対応するデータの取得とインプットボックスへの表示
  componentDidMount = () => {
    const textid = this.props.match.params.id;
    const cookie = getcookie();
    axios
      ({
        method: 'GET',
        url: `http://127.0.0.1:8000/api/v1/${textid}/`,
        data: '',
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        this.setState({
          datalist: res.data,
          title: res.data.title,
        });
      })
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
    const textid = this.props.match.params.id;
    const cookie = getcookie();
    //データベース保存用定数
    const data = { id: textid, author: cookie[" UserId"], title: this.state.title, body: this.state.body };
    //データベース保存
    axios
      ({
        method: 'PUT',
        url: `http://127.0.0.1:8000/api/v1/${textid}/?author=${cookie[" UserId"]}`,
        data: data,
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        this.setState({
          title: res.data.title,
          body: ""
        });
      })
  };

  //入力フォームJSX表示
  render() {
    return (
      <div className='create_box'>
        <div className='form_box'>
          <form onSubmit={this.handleSubmit}>
            title:
         <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
            body:
         <input name="body" value={this.state.body} onChange={this.handleChange} />
            {/* type="hidden"  bodyは後々隠す*/}
            <Button type="submit"><p className='save_button'>保存</p></Button>
          </form>
        </div>
        <div className='return_box'>
          <Button><Link to={`/read`}><p className='return_button'>一覧へ戻る</p></Link></Button>
        </div>
      </div >
    );
  }
}

export default Detail;