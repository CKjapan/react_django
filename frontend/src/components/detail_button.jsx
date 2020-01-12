import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'react-router-dom';


class DetailButton extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/detail/${this.props.id}`)
  };

  render() {
    return (
      <div>
        <IconButton aria-label="delete" onClick={this.handleSubmit}>
          <EditIcon style={{ fontSize: 18 }} ></EditIcon>
        </IconButton>
      </div>
    );
  }
}

export default withRouter(DetailButton);