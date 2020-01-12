import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

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
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        //無事POST出来たらinputboxを空にして
        this.setState({
          title: "",
          body: ""
        });
      })
  };


  render() {
    return (
      <div className='create_box'>
        <div className='form_box'>
          <form onSubmit={this.handleSubmit}>
            Title：
         <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
            bodyー後々消すー:
         <input name="body" value={this.state.body} onChange={this.handleChange} />
            {/* type="hidden"  bodyは後々隠す*/}
            <Button type="submit"><p className='save_button'>保存</p></Button>
          </form>
        </div>
        <div className='return_box'>
          <Button className='return_button'><Link to={`/read`}><p className='return_button'>一覧へ戻る</p></Link></Button>
        </div>
      </div >
    );
  }




}

export default Create;

