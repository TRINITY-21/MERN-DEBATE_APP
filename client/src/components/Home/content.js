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


export default function Contents() {

    const [Debates, setDebates] = useState([]);
   


    const onlineUser = localStorage.getItem('userId');
    
    useEffect(() => {

    getDebates();

  }, []);


  const dataToSubmit = {
    writer:  onlineUser,
  }       
  

  const getDebates = (dataToSubmit) => {
    axios.get('/api/debate-article/fetch-approved-debate', dataToSubmit).then((res) => {
        console.log(res);
        if (res.data.success) {
            setDebates(res.data.article);
        } else {
            alert('unable to get debates');
        }
    })
  };
  

  const renderCards =
    
    Debates.map((debate, i) => (

  <Card size="small" title="Debate" extra={<a href="#">More</a>} style={{ width: 400, marginLeft:"30px", marginTop:"10px", height:400 }}>
        <a href={`/debate-details/${debate._id}`}><h1><b>Topic:</b>{debate.topic}</h1></a>
        
        <ReadMoreReact style={{ color: "red"}} text={debate.body}
                min={50}
                ideal={100}
                max={200}
          readMoreText="read more"
        />
        
        {/* <p>{debate.body}</p> */}
 
      <Row>
      
      <p><b>Created By : </b>{debate.writer.name}</p>

        <p style={{paddingLeft:"200px"}}><b>Created On : </b>{moment(debate.createdAt).format("MMMM Do YYYY")}{" "}</p>
      </Row>
       
      <Button block type="secondary"><a href={`/debate/${debate._id}`}>Add Lead opinion</a> </Button>
      
</Card>

 
    ));
      
    



  return (
    <>
     <br></br>      <br></br>   
   <Button> <RegModal /> </Button>
                    <br></br>      <br></br>   
          
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="true" justify="" style={style} >  
        
        <Space wrap="true">
       
          {renderCards}
             
        
       
        </Space>
        </Row>
     
        
    </>
  );
}

 