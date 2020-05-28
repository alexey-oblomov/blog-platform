import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export function Navbar(props) {
  return (
    <div>
      <AppBar position="static" style={{borderRadius: '10px'}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {}}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
