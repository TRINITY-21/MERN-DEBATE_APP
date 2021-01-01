import React, { Component }  from 'react';
import { Layout, Menu, Breadcrumb, Row, Button } from 'antd';
import Caro from './carousel';
import { Typography } from 'antd';
import { Avatar, Image } from 'antd';
import Contents from './content'
import Trending from './trending';
import TrendingChallenge from './trendingChallenge';
import NavBar from '../views/NavBar/NavBar';


const { Title } = Typography;

const { Header, Content, Footer } = Layout;

const HomePage = () => {

    return (
        <div>
    {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="false"></Row> */}
    <Layout className="layout">
           
                <Caro />


                <br></br>  

                <Title level={1}>Trending Debates</Title>
        
                <Content style={{ padding: '0 20px' }}>
                   

                    <div className="site-layout-content"><Trending/></div>
                   
                    
                    </Content>
                   
        {/* <Footer style={{ textAlign: 'center' }}> ©2018 Created by TRINITY</Footer> */}
           
        <br></br>  
            <Layout className="layout">
    

                <br></br>  
                <Title level={1}>Trending Challenges</Title>
                <Content style={{ padding: '0 20px' }}>
                   

                    <div className="site-layout-content"><TrendingChallenge /></div>
                   
                    
                    </Content>
                   
        {/* <Footer style={{ textAlign: 'center' }}> ©2018 Created by TRINITY</Footer> */}
                </Layout>
                </Layout>
            <Row/>
            </div>

);

};

export default HomePage;