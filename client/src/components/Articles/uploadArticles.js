import React, {useState} from 'react'
import Dropzone from 'react-dropzone';
import { Route , withRouter} from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Row, Col,Typography } from 'antd';
import { Icon, } from '@ant-design/compatible'
import { useSelector } from 'react-redux';
const { TextArea } = Input;
const { Title } = Typography;


function UploadArticles(props){



    const Category =[
        {
        value:0 , label:'Engineering'
    },{
        value:1 , label:'Sciences'
    }
    
]
    

    const user = useSelector(state => state.user);

    const [topic, setTopic] = useState('');
    const [body, setBody] = useState('');
    const [filePath, setfilePath] = useState('');
  


    const onChangeTitle = e => {
        setTopic(e.currentTarget.value);
    }
    
   
    const onChangeDescription = e => {
        setBody(e.currentTarget.value);
    }
    
   
    const onSubmit = e => {
        e.preventDefault();

        let dataToSubmit = {
            
            writer: user.userData,
            topic,
            body,
           
            filePath,
            
           
        }


        // if (title == '' || category == '') {
        //     alert('enter all fields');
        

            console.log(dataToSubmit);

            axios.post('/api/article/add-article', dataToSubmit).then((res) => {
                console.log(res);
                console.log(filePath);

                console.log(props);
                if (res.data.success) {
                    alert('save data succeess');
                    props.history.push('/article');
 
                    
                }
                else {
                    alert('unable to save data');
                }
        
            });
     
    }


    const onDrop = (files) => {
        console.log(files);
        let formData = new FormData();

        let config = {
            'content-type':'multipart/form-data'
        }

        formData.append('file', files[0]);

        //// upload video
        axios.post('/api/article/upload', formData, config).then((res)=> {
            //console.log(res)
            if (res.data.success) {
                setfilePath(res.data.filePath);
                // setfileName(res.data.fileName);
                console.log(filePath);

               
            }
        });


    }



    return (
        < React.Fragment style={{ display: 'flex' }}>
        <div style={{ maxWidth: '200px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'flex', marginBottom: '2rem' }}>
                {/* <Title level={5} > Upload Debate</Title> */}
            </div>
            
           
            <form onSubmit={onSubmit}>

        
                    <div>
                        Topic
                        <br />
                    <input name='title' placeholder="Title" id="title" value={topic} onChange={onChangeTitle} />
                    
                    </div>
                    <br /> <br />
                    <div>
                    Body
                    <br />
                <TextArea rows={4} name='description' placeholder="description" id="description" value={body} onChange={onChangeDescription} />

                </div>

                <br /> <br />
                <div>
            <Col span={12}>
            Your Photo
                        <Dropzone style={{  display: 'center'}}
                              multiple={true}
                              maxSize={800000000}
                            onDrop={onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div  style={{
                    width: '150px', height: '140px', border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload"  style={{ fontSize: '3rem' }}  />
                                        </Button>
                                        
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>

                     {/* <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                                
                    <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:9000/${filePath}`}/>
                    </div> */}
                                
                    </Col>

              <br /> <br />

                    { filePath !== "" &&
                     <img
                     style={{ maxWidth: '10' }}
                     src={`http://localhost:9000/${filePath}`}
                alt="img"
                height="100px"
                width="100px"
                
                 />
                   } 
  

                </div>
                    <div>
                         <br />
                         <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
                </div>
               

            </form>
            </div>
            </React.Fragment>
    )
}

export default withRouter(UploadArticles);


