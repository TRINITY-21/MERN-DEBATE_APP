import React,{useEffect, useState} from 'react';
import { Card, Avatar, Divider, Row, Space, Col } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { Result, Button } from 'antd';
import axios from 'axios';
import moment from "moment";
import ReadMoreReact from 'read-more-react';
import ArticleModal from './modal';
// import uploadArticles from './uploadArticles';

const { Meta } = Card;
const gridStyle = {
    width: '10%',
    textAlign: 'center',
    color:'red'
  };

const style = { background: '#d32029', paddingLeft: '0px', align:"center" };


export default function ViewComments(props) {

    const [Debates, setDebates] = useState([]);

    console.log(props)
   


    const onlineUser = localStorage.getItem('userId');
    const article = props.history.match.articleId

    useEffect(() => {

    getDebates();

  }, []);


  const dataToSubmit = {
    writer:  onlineUser,
    article: article,
  }       
  

  const getDebates = (dataToSubmit) => {
    axios.get('/api/comment/comments', dataToSubmit).then((res) => {
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

  <Card size="large" title="Articles" extra={<a href="#">More</a>} style={{ width: 400, marginLeft:"30px", marginTop:"10px", height:400 }}>
        <a href={`/article-details/${debate._id}}`}><h1><b>Topic:</b>{debate.topic}</h1></a>
        
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
       
      <Button block type="secondary"><a href={`/article-comment/${debate._id}`}>Add Article Comment</a> </Button>
      
</Card>

 
    ));
      
    



  return (
    <>
     <br></br>      <br></br>   
   <Button> <ArticleModal/> </Button>
                    <br></br>      <br></br>   
          
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} wrap="true" justify="" style={style} >  
        
        <Space wrap="true">
       
          {renderCards}
             
        
       
        </Space>
        </Row>
     
        
    </>
  );
}

 