import React from 'react';
import { Menu } from 'antd';


const style = {
  color:"white"
}


function LeftMenu(props) {
  return (
    <Menu mode={props.mode} style={{background:"rgb(206, 0, 38)",}} >
    <Menu.Item key="mail">
      <a href="/" style={{ color:"white"}}>Home</a>
      </Menu.Item>
      
    <Menu.Item key="debate">
      <a href="/debate"  style={{ color:"white"}}>Debates</a>
      </Menu.Item>  
    <Menu.Item key="article">
      <a href="/article"  style={{ color:"white"}}>Articles</a>
      </Menu.Item>
      
    <Menu.Item key="contest">
      <a href="/contest"  style={{ color:"white"}}>Contests</a>
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