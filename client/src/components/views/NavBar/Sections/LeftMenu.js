import React from 'react';
import { Menu } from 'antd';


const style = {
  color:"white"
}


function LeftMenu(props) {
  return (
    <Menu mode={props.mode} style={{background:"rgb(255, 196, 0)",}} >
    <Menu.Item key="mail">
      <strong><a href="/" style={{ color:"white"}}>Home</a></strong>
      </Menu.Item>
      
    <Menu.Item key="debate">
     <strong> <a href="/debate"  style={{ color:"white"}}>Debates</a></strong>
      </Menu.Item>  
    <Menu.Item key="article">
      <strong><a href="/article"  style={{ color:"white"}}>Articles</a></strong>
      </Menu.Item>
      
    <Menu.Item key="contest">
     <strong> <a href="/contest"  style={{ color:"white"}}>Contests</a></strong>
      </Menu.Item>

      {/* <Menu.Item key="booklist">
      <a href="/booklist"  style={{ color:"white"}} >booklist</a>
      </Menu.Item>
      
      <Menu.Item key="favorite">
      <a href="/favorite"  style={{ color:"white"}}>Favorite</a>
    </Menu.Item> */}
    
  </Menu>
  )
}

export default LeftMenu