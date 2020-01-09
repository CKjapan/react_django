import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//詳細ボタン
class Detailbody extends Component {
  state = {
    jump: false,
  };

  //詳細移行ボタンJSX表示
  render() {
    return (
      <Link to={`/create/${this.props.id}`}>詳細ページへ</Link>
    );
  }
}

export default Detailbody;