import React, {useState,useEffect} from 'react'
import { Route , withRouter} from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Row, Col,Typography,Card,Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { Select } from 'antd';

const { Meta } = Card;
const { TextArea } = Input;
const { Title } = Typography;

function ArticleComment(props) {
    
    const articleId = props.match.params.articleId;

    const user = useSelector(state => state.user);

    const [body, setBody] = useState('');

    const [comments, setComment] = useState([]);

    useEffect(() => {

        getComments();
    
      }, []);

      const dataToSubmit = {
        writer:  user.userData,
        article: articleId,
        articleId
      }       
      
    
      const getComments = (dataToSubmit) => {
        axios.get('/api/article/getComments', dataToSubmit).then((res) => {
            console.log(res);
            if (res.data.success) {
                setComment(res.data.comments);
            } else {
                alert('unable to get debates');
            }
        })
      };
      
    const onChangeBody = e => {
        setBody(e.currentTarget.value);
    }
    

    const onSubmit = e => {
        e.preventDefault();

        let dataToSubmit = {
            
            writer: user.userData,
            article:articleId,
            comment:body
            
           
        }


        // if (title == '' || category == '') {
        //     alert('enter all fields');
        

            console.log(dataToSubmit);

            axios.post('/api/article/add-comment', dataToSubmit).then((res) => {
                console.log(res);

                if (res.data.success) {
                    setComment(res.data.result)
                    alert('save data success');
                    props.history.push('/article-comment/5fe252b9c4b196b0a904e719');
 
                    
                }
                else {
                    alert('unable to save data');
                }
        
            });
     
    }

    const renderCards = comments.map((comment, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>
            <div style={{ position: 'relative' }}>
               
            </div><br />
            <Meta
                avatar={
                    <Avatar src={`http://localhost:9000/${comment.writer && comment.writer.image}`} />
                }
                title={comment.writer && comment.writer.name} 
                description={comment.comment}
            />
          
           
        </Col>

    })


    return (
        < React.Fragment style={{ display: 'flex' }}>
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>

        <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2} > Article Comment </Title>
        <hr />

        {/* <Row gutter={4}> */}
            {renderCards}
        {/* </Row> */}
    </div>

    <form onSubmit={onSubmit}>

        
                    <div>
                    <div style={{ textAlign: 'flex', marginBottom: '2rem' }}>
                <Title level={5} > Add Article Comment </Title>
                    </div>  
                    
                <TextArea rows={4} name='body' placeholder="body" id="body" value={body} onChange={onChangeBody} />

                    </div>
                    <br />

                    <div>
                     
                         <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
                </div>
               

            </form>

            </div>
            </React.Fragment>
    )
}

export default withRouter(ArticleComment);


