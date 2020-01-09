import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//詳細ボタン
class Detailbody extends Component {
  render() {
    return (
      <Link to={`/create/${this.props.id}`}>詳細ページへ</Link>
    );
  }
}

export default Detailbody;