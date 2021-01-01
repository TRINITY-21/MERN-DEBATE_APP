import React, {useState} from 'react'
import Dropzone from 'react-dropzone';
import { Route , withRouter} from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Row, Col,Typography } from 'antd';
import { Icon, } from '@ant-design/compatible'
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;


function LeadOpinion(props) {
    
    const debateId = props.match.params.debateId;

    const Category =[
        {
        value:0 , label:'Engineering'
    },{
        value:1 , label:'Sciences'
    }
    
]
    

    const user = useSelector(state => state.user);

    
    const [body, setBody] = useState('');
    const [filePath, setfilePath] = useState('');
    const [pdf, setPdf] = useState('');
    const [doc, setDoc] = useState('');
    const [video, setVideo] = useState('');
  


    const onChangeBody = e => {
        setBody(e.currentTarget.value);
    }
    
       const onChangeVideo = e => {
        setVideo(e.currentTarget.value);
    }
    
   
   
   
    const onSubmit = e => {
        e.preventDefault();

        let dataToSubmit = {
            
            writer: user.userData,
            debate_thesis:debateId,
            body,
            pdf,
            doc,
            video,
            filePath,
            
           
        }


        // if (title == '' || category == '') {
        //     alert('enter all fields');
        

            console.log(dataToSubmit);

            axios.post('/api/debate-article/add-thesis', dataToSubmit).then((res) => {
                console.log(res);
                console.log(filePath);
                console.log(pdf);
                console.log(doc);

                console.log(props);
                if (res.data.success) {
                    
                    alert('save data success');
                    props.history.push('/');
 
                    
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
        axios.post('/api/debate-article/upload', formData, config).then((res)=> {
            console.log(res)
            if (res.data.success) {

                setfilePath(res.data.filePath);
               
        

               
            }
        });


    }  
    
    const onDropPdf = (files) => {
        console.log(files);
        let formData = new FormData();

        let config = {
            'content-type':'multipart/form-data'
        }

        formData.append('file', files[0]);

        //// upload video
        axios.post('/api/debate-article/upload-pdf', formData, config).then((res)=> {
            console.log(res)
            if (res.data.success) {

                setPdf(res.data.pdf);                
               
            }
        });


    } 
    
    const onDropDoc = (files) => {
        console.log(files);
        let formData = new FormData();

        let config = {
            'content-type':'multipart/form-data'
        }

        formData.append('file', files[0]);

        //// upload video
        axios.post('/api/debate-article/upload-doc', formData, config).then((res)=> {
            console.log(res)
            if (res.data.success) {
               
                setDoc(res.data.doc);

               
            }
        });


    }



    return (
        < React.Fragment style={{ display: 'flex' }}>
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'flex', marginBottom: '2rem' }}>
                <Title level={2} > Upload Debate Thesis</Title>
            </div>
            
           
            <form onSubmit={onSubmit}>

        
        
                    <div>
                    Body
                    <br />
                <TextArea rows={4} name='body' placeholder="body" id="body" value={body} onChange={onChangeBody} />

                    </div>
                    <br />
                    <div>
                    Video Url
                    <br />
                    <div style={{ marginBottom: 16 }}>
                            <Input addonBefore="https://" value={video} onChange={onChangeVideo}/>
                        </div>
                </div>

                <br /> <br />
                <div>
            <Col span={12}>
            Your Image
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
            <Col span={12}>
            pdf
                        <Dropzone style={{  display: 'center'}}
                              multiple={true}
                              maxSize={800000000}
                            onDrop={onDropPdf}>
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

           

                 
                </div>  <div>
            <Col span={12}>
            doc
                        <Dropzone style={{  display: 'center'}}
                              multiple={true}
                              maxSize={800000000}
                            onDrop={onDropDoc}>
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

export default withRouter(LeadOpinion);


