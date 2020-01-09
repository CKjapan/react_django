import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//詳細ボタン
class Detailbody extends Component {
  render() {
    return (
      <Link to={`/detail/${this.props.id}`}>編集ページへ</Link>
    );
  }
}

export default Detailbody;