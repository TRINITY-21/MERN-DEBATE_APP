import React,{useEffect, useState} from 'react';
import { Card, Avatar, Divider, Row, Space, Col } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { Result, Button } from 'antd';
import axios from 'axios';
import moment from "moment";
import ReadMoreReact from 'read-more-react';
// import ArticleModal from './modal';
// import uploadArticles from './uploadArticles';

const { Meta } = Card;
const gridStyle = {
    width: '10%',
    textAlign: 'center',
    color:'red'
  };

const style = { background: '#d32029', paddingLeft: '0px', align:"center" };


export default function DetailArticles(props) {

    const [Contest, setContest] = useState([]);
   
    const onlineUser = localStorage.getItem('userId');
    
    const id = props.match.params.id

    console.log(id);

    const dataToSubmit = {
        writer:  onlineUser,
    }
    
 
    
    useEffect(() => {

    getContest();

  }, []);


//     const sendId = {
//     id
// }
  const getContest = (dataToSubmit) => {
    axios.get(`/api/article/fetch-articles`).then((res) => {
        console.log(res);
        if (res.data.success) {
            setContest(res.data.article);
        } else {
            alert('unable to get Contest');
        }
    })
  };
  

  const renderCards = Contest.map((contest, i)=>{

    return (
    <div key={i}>
    <Card size="large" title="Articles" extra={<a href="#">More</a>} style={{ width: 700, marginLeft:"300px", marginTop:"10px", height:700 }}>
    <a href={`/article/${contest._id}`}><h1><b>Topic:</b>{contest.topic}</h1></a>
   
   
   {/* <img
                style={{ maxWidth: '10' }}
                src={`http://localhost:9000/${contest.image}`}
           alt="img"
           height="500px"
           width="500px"
           
            
     /> */}

   <p>{contest.body}</p>

 <Row>
 
 <p><b>Created By : </b>{contest.writer.name}</p>

   <p style={{paddingLeft:"200px"}}><b>Created On : </b>{moment(contest.createdAt).format("MMMM Do YYYY")}{" "}</p>
 </Row>
  
 <Button block type="secondary"><a href={`/article-comment/${Contest._id}`}>Add Article comment</a> </Button>
 
</Card>

</div>
  
    )})
    
    

    
      


  return (
    <>
     <br></br>      <br></br>   
  
          
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" style={style} >  
        
        <Space wrap="true">
       
          {renderCards}
             
        
       
        </Space>
        </Row>
     
        
    </>
  );
}

 