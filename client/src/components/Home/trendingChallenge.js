import React,{useEffect, useState} from 'react';
import { Card, Avatar, Divider, Row, Space, Col } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { Result, Button } from 'antd';
import axios from 'axios';
import moment from "moment";
import ReadMoreReact from 'read-more-react';
import RegModal from './modal';

const { Meta } = Card;
const gridStyle = {
    width: '10%',
    textAlign: 'center',
    color:'red'
  };

const style = { background: '#d32029', paddingLeft: '0px', align:"center" };


export default function TrendingChallenge() {

  
    const [Challenges, setChallenges] = useState([]);
   


    const onlineUser = localStorage.getItem('userId');
    
    useEffect(() => {

       
        getChallenges();

  }, []);

    
const dataToSubmit = {
    writer:  onlineUser,

}       

  
    const getChallenges = (dataToSubmit) => {
    axios.get('/api/leaders-vision/trending', dataToSubmit).then((res) => {
        console.log(res);
        if (res.data.success) {
            setChallenges(res.data.trending);
        } else {
            alert('unable to get debates');
        }
    })
    }
    

    const renderChallenges=
    
    Challenges.map((vision, i) => (

  <Card size="large" title="Challenge" extra={<a href="#">More</a>} style={{ width: 400, marginLeft:"30px", marginTop:"10px", height:500 }}>
        <a href={`/contest-details/${vision._id}`}><h1><b>Topic:</b>{vision.heading}</h1></a>
        <img
        alt="img"
                src={`http://localhost:9000/${vision.image}`}
                style={{ maxWidth: '200px' }}
  
      
      />
        <ReadMoreReact style={{ color: "red"}} text={vision.summary}
                min={50}
                ideal={100}
                max={200}
          readMoreText="read more"
        />
        
        {/* <p>{vision.body}</p> */}
 
     
       
      <Button block type="secondary"><a href={`/contest/${vision._id}`}>Contribute</a> </Button>
      
</Card>

 
    ));
      
    



  return (
    <>
   
  
                    <br></br>      <br></br>   
          
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="true" justify="" style={style} >  
        
        <Space wrap="true">
       
                    
                  {renderChallenges}
        
       
        </Space>
        </Row>
     
        
    </>
  );
}

 