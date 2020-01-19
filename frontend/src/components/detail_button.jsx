import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';

import { withRouter } from 'react-router-dom';



class DetailButton extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/detail/${this.props.id}`)
  };

  render() {
    return (
      <div>
        <Tooltip title="Edit" arrow>
          <IconButton aria-label="Edit" onClick={this.handleSubmit}>
            <EditIcon style={{ fontSize: 24 }} ></EditIcon>
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withRouter(DetailButton);