import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
// import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';


import { getcookie } from '../components/get_cookie_function';


//logout処理
class LogoutApp extends Component {
  state = {
    logout: false,
    anchorEl: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //cookie取得
    const cookie = getcookie();
    //postでリクエスト
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/rest-auth/logout/',
      data: '',
      headers: { Authorization: `Token ${cookie["Token"]}` }
    })
      //成功したら
      .then(res => {
        //cookieからトークン削除
        document.cookie = 'Token=' + encodeURIComponent(cookie["Token"]) + ';max-age=0';
        document.cookie = 'UserName=' + encodeURIComponent(cookie[" UserName"]) + ';max-age=0';
        document.cookie = 'UserId=' + encodeURIComponent(cookie[" UserId"]) + ';max-age=0';
        //ログアウト状態をtrueに
        this.setState({ logout: true });
      })
  };

  //popupmenu
  handleMenu = e => {
    e.preventDefault();
    // setAnchorEl(event.currentTarget);
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    // setAnchorEl(null);
    this.setState({ anchorEl: null });
  };


  //ログアウトボタンJSX表示
  render() {
    // もしログアウト状態ならログインページへ飛ばす
    if (this.state.logout === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div className='logout_box'>

        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle style={{ fontSize: 45 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem type="submit" onClick={this.handleSubmit}>Logout</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
          </Menu>
        </div>

      </div>
    )
  }
}

export default LogoutApp;