import React, { Component } from 'react';
import axios from 'axios';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import { getcookie } from './get_cookie_function';


//delete処理
class DeleteButton extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    //認証トークン取得
    const token = getcookie();
    axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/${this.props.id}/`,
      data: '',
      headers: { Authorization: `Token ${token["Token"]}` }
    })
      .then(res => {
        //リスト更新
        this.props.getdb();
      })
  };

  render() {
    return (
      <div>
        {/* <Button onClick={this.handleSubmit}>削除</Button> */}
        <Tooltip title="Delete" arrow>
          <IconButton aria-label="Delete" onClick={this.handleSubmit}>
            <DeleteIcon style={{ fontSize: 24 }} color="secondary" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default DeleteButton;