import React, {useState} from 'react'
import Dropzone from 'react-dropzone';
import { Route , withRouter} from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Row, Col,Typography } from 'antd';
import { Icon, } from '@ant-design/compatible'
import { useSelector } from 'react-redux';
import { Select } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;


function Critique(props){

    const leaders_vision = props.match.params.contestId;
    console.log(leaders_vision);

    const IssueArea =[
        {
        value:0 , label:'Engineering'
        },
        {
        value:1 , label:'Sciences'
    }
    
]
    const Gender =[
        {
        value:0 , label:'Male'
        },
        {
        value:1 , label:'Female'
    }
    
]
    

    const user = useSelector(state => state.user);

    const [name, setName] = useState('');
    const [heading, setHeading] = useState('');
    const [filePath, setfilePath] = useState('');
    const [pics, setPics] = useState('');
    const [summary, setSummary] = useState('');
    const [age, setAge] = useState(0);
    const [pdf, setPdf] = useState('');
    const [doc, setDoc] = useState('');
    const [video, setVideo] = useState('');
    const [gender, setGender] = useState('Male');
    const [issue_area, setIssueArea] = useState("Sciences");
  


    const onChangeTitle = e => {
        setName(e.currentTarget.value);
    }
    
   
    const onChangeDescription = e => {
        setHeading(e.currentTarget.value);
    }
        
    const onChangeIssueArea = e => {
        setIssueArea(e.currentTarget.value);
    }
    
   
    const onChangeSummary = e => {
        setSummary(e.currentTarget.value);
    }
        
    const onChangeAge = e => {
        setAge(e.currentTarget.value);
    }
    
   
    const onChangeVideo = e => {
        setVideo(e.currentTarget.value);
    }
        
    const onChangeGender = e => {
        setGender(e.currentTarget.value);
    }
    
   
  
   
    const onSubmit = e => {
        e.preventDefault();

        let dataToSubmit = {
            
            writer: user.userData,
            name,
            issue_area,
            heading,
            summary,
            age,
            pdf,
            doc,
            video,
            gender,
            pics,
            filePath,
            leaders_vision
            
           
        }


        // if (title == '' || category == '') {
        //     alert('enter all fields');
        

            console.log(dataToSubmit);

            axios.post('/api/critique/add-critique', dataToSubmit).then((res) => {
                console.log(res);
                console.log(filePath);

                console.log(props);
                if (res.data.success) {
                    alert('save data succeess');
                    props.history.push('/contest');
 
                    
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
        axios.post('/api/critique/upload', formData, config).then((res)=> {
            //console.log(res)
            if (res.data.success) {
                setfilePath(res.data.filePath);
                // setfileName(res.data.fileName);
                console.log(filePath);

               
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
        axios.post('/api/critique/upload-doc', formData, config).then((res)=> {
            //console.log(res)
            if (res.data.success) {
                setDoc(res.data.doc);
                // setfileName(res.data.fileName);
                console.log(doc);

               
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
        axios.post('/api/critique/upload-pdf', formData, config).then((res)=> {
            //console.log(res)
            if (res.data.success) {
                setPdf(res.data.pdf);
                // setfileName(res.data.fileName);
                console.log(pdf);

               
            }
        });


    }



    return (
        < React.Fragment>
        <div style={{ maxWidth: '700px', margin: '3rem auto' }}>
            <div style={{ textAlign: 'flex', marginBottom: '2rem' }}>
                {/* <Title level={5} > Upload Debate</Title> */}
            </div>
            
           
            <form onSubmit={onSubmit}>

        
                    <div>
                        Name
                        <br />
                    <input name='title' placeholder="Name" id="title" value={name} onChange={onChangeTitle} />
                    
                    </div>
                    
                    <div>
                        Age
                        <br />
                    <input name='Age' placeholder="Age" id="title" value={age} onChange={onChangeAge} />
                    
                    </div>
                    <br />
                    <div>
                    Video Url
                   
                    <div style={{ marginBottom: 16 }}>
                            <Input addonBefore="https://" value={video} onChange={onChangeVideo}/>
                        </div>
                </div>
                    <br /> 
                    <div>
                    heading
                    <br />
                <input name='heading' placeholder="heading" id="heading" value={heading} onChange={onChangeDescription} />
                    </div>
                    <br /> 
                    <div>
                        
                        Summary
                        <TextArea rows={4} name='summary' placeholder="summary" id="summary" value={summary} onChange={onChangeSummary} />

                </div>

                <br /> 
                <div>
                    issue_area
                    <br />
                <select name="issue_area"  onChange={onChangeIssueArea}>{ 
                        IssueArea.map((issue_area, i) => <option key={i} value={issue_area.value}>{issue_area.label}</option>)
                   
                }
                   
                </select>
                </div> 
                
                    <div>
                    Gender
                    <br />
                <select name="gender"  onChange={onChangeGender}>{ 
                        Gender.map((gender, i) => <option key={i} value={gender.value}>{gender.label}</option>)
                   
                }
                   
                </select>
                </div>
               
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
                    width: '150px', height: '50px', border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload"  style={{ fontSize: '1rem' }}  />
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

                <br /> 
                <div>
            <Col span={12}>
            Doc
                        <Dropzone style={{  display: 'center'}}
                              multiple={true}
                              maxSize={800000000}
                            onDrop={onDropDoc}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div  style={{
                    width: '150px', height: '50px', border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload"  style={{ fontSize: '1rem' }}  />
                                        </Button>
                                        
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>

                     {/* <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                                
                    <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:9000/${filePath}`}/>
                    </div> */}
                                
                    </Col>




                        </div>       <br />
                <div>
            <Col span={12}>
            Pdf
                        <Dropzone style={{  display: 'center'}}
                              multiple={true}
                              maxSize={800000000}
                            onDrop={onDropPdf}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div  style={{
                    width: '150px', height: '50px', border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }} {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type="upload"  style={{ fontSize: '1rem' }}  />
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

export default withRouter(Critique);


