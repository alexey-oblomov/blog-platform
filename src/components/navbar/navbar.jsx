import React from 'react';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export function Navbar(props) {
  return (
    <div>
      <WrapperDiv>
        <Link href="https://github.com/alexey-oblomov/blog-platform" alt="Ссылка на GutHub">
          GitHub: https://github.com/alexey-oblomov/blog-platform
        </Link>
        <AppBar position="static" style={{borderRadius: '10px'}}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => {}}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </WrapperDiv>
    </div>
  );
}

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Link = styled.a`
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 5px;
  color: #3a3833;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  font-size: 14px;
  :hover {
    text-decoration: underline #000000;
  }
`;
