import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import {Icon} from '@ant-design/compatible'
import { Drawer, Button,  } from 'antd';
import './Sections/Navbar.css';
// import Caro from '../../Home/carousel';

const style = {
  color:"white"
}


function NavBar() { 
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ color:"white",padding:'10px', zIndex: 3, width: '100%', height:'10%' }}>
      <div className="menu__logo">
        <h1 style={{ color: "white" }}><b>LOGO</b></h1>
      </div>
      <div className="menu__container">
        <div className="menu_left" style={{color:"blue"}}>
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_rigth" style={{style}}>
          <RightMenu mode="horizontal" />
        </div>
     
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          // title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar