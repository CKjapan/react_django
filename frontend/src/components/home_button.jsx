import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

import { Link } from 'react-router-dom';


export const HomeButton = () => {
  return (
    <div>
      <Tooltip title="Return Home" arrow>
        <IconButton aria-label="Home" >
          <Link to={`/read`}><HomeIcon style={{ fontSize: 32 }} /></Link>
        </IconButton>
      </Tooltip>
    </div>
  )
}


