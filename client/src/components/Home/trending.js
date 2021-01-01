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


export default function Trending() {

    const [Debates, setDebates] = useState([]);
   


    const onlineUser = localStorage.getItem('userId');
    
    useEffect(() => {

        getDebates();
     
  }, []);

    
const dataToSubmit = {
    writer:  onlineUser,

}       
  
  const getDebates = (dataToSubmit) => {
    axios.get('/api/debate-article/trending', dataToSubmit).then((res) => {
        console.log(res);
        if (res.data.success) {
            setDebates(res.data.trending);
        } else {
            alert('unable to get debates');
        }
    })
  }; 
  
  




  const renderCards =
    
    Debates.map((debate, i) => (

  <Card size="large" title="Debate" extra={<a href="#">More</a>} style={{ width: 400, marginLeft:"30px", marginTop:"10px", height:500 }}>
       <a href={`/debate-details/${debate._id}`}><h1><b>Topic:</b>{debate.topic}</h1></a>
        <img
        alt="img"
                src={`http://localhost:9000/${debate.filePath}`}
                style={{ maxWidth: '500px', maxHeight:"100px" }}
  
      
      />
        <ReadMoreReact style={{ color: "red"}} text={debate.body}
                min={20}
                ideal={20}
                max={20}
                readMoreText="read more"
                extra={<a href="#">More</a>}
            />
            
        
        {/* <p>{debate.body}</p> */} 
 
     
       
      <Button block type="secondary"><a href={`/debate/${debate._id}`}>Contribute</a> </Button>
      
</Card>

 
    )); 
    




  return (
    <>
   
  
                    <br></br>      <br></br>   
          
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="true" justify="" style={style} >  
        
        <Space wrap="true">
       
          {renderCards}
          
        
       
        </Space>
        </Row>
     
        
    </> 
  );
}

 