import React, { Component } from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';

import { getcookie } from '../components/get_cookie_function';
import { HomeButton } from '../components/home_button';
import { SaveButton } from '../components/save_button';

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
            <TextField name="title" type="text" value={this.state.title} onChange={this.handleChange} required id="standard-required" label="Title" />
            body-後々消す->
         <input name="body" value={this.state.body} onChange={this.handleChange} />
            {/* type="hidden"  bodyは後々隠す*/}
            <SaveButton />
          </form>
        </div>
        <div className='return_box'>
          <HomeButton />
        </div>
      </div >
    );
  }
}

export default Detail;