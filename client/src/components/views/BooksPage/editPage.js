import React, {useState,useEffect} from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Input, Button, Row, Col,Typography } from 'antd';
import { Icon, } from '@ant-design/compatible'
import { useSelector } from 'react-redux';

const { Title } = Typography;

export default function EditPage(props) {

    const Category =[
        {
        value:0 , label:'Engineering'
    },{
        value:1 , label:'Sciences'
    }
    
]
    

    const user = useSelector(state => state.user);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('music');
    const [fileName, setfileName] = useState('');
    const [filePath, setfilePath] = useState('');
    const [contactNumber, setContact] = useState();
    const [price, setPrice] = useState(0);
    const [ISBN, setISBN] = useState('');
    const [author, setAuthor] = useState('');


    /// populate book data

    useEffect(() => {

        axios.post(`/api/book/getBook/${bookId}`).then((res) => {
            console.log(res)

            setTitle(res.data.book.title);
            setContact(res.data.book.contactNumber);
            setDescription(res.data.book.description);
            setfilePath(res.data.book.filePath);
            setPrice(res.data.book.price);
            setISBN(res.data.book.ISBN);
            setAuthor(res.data.book.author);
            setCategory(res.data.book.category)
            
        
        });

    }, []);
   


    const onChangeTitle = e => {
        setTitle(e.currentTarget.value);
    }
    
    const onChangeContactNumber = e => {
        setContact(e.currentTarget.value);
    }
    
    const onChangeISBN = e => {
        setISBN(e.currentTarget.value);
    }
    
    const onChangeAuthor = e => {
        setAuthor(e.currentTarget.value);
    }

    const onChangeDescription = e => {
        setDescription(e.currentTarget.value);
    }
    
   
    const onChangeCatergory = e => {
        setCategory(e.currentTarget.value);
    } 
    
    const onChangePrice= e => {
        setPrice(e.currentTarget.value);
    }

    const bookId = props.match.params.bookId;

    const onSubmit = e => {
        e.preventDefault();

        let dataToSubmit = {
            
            writer: user.userData,
           
            title,
            description,
            category,
            filePath,
            price,
            ISBN,
            author,
            contactNumber
            
        }


        // if (title == '' || category == '') {
        //     alert('enter all fields');
        

           //console.log(dataToSubmit);

            axios.post(`/api/book/editBook/${bookId}`,dataToSubmit).then((res) => {
                console.log(res);
                console.log(filePath);
                //props.history.push('/dashboard');



                if (res.data.success) {
                    alert('save data succeess');
                    props.history.push('/');


                  
                    
                }
                else {
                    alert('unable to edit data');
                }
        
            });
        //}

       
        // setTitle('');
        // setDescription('');
        // setPrivacy('');
        // setCategory('');
    }


    const onDrop = (files) => {
        console.log(files);
        let formData = new FormData();

        let config = {
            'content-type':'multipart/form-data'
        }

        formData.append('file', files[0]);

        //// upload video
        axios.post('/api/book/upload', formData, config).then((res)=> {
            //console.log(res)
            if (res.data.success) {
                setfilePath(res.data.filePath);
                setfileName(res.data.fileName);
                console.log(filePath);

                /// generate thumbnail

                // let dataToSubmit ={

                   
                //         filePath: res.data.filePath,
                //         fileName: res.data.fileName,
                      
                // }


                // axios.post('api/book/thumbnail', dataToSubmit).then((res) => {
                //     if(res.data.success){
                      
                //     setthumbFilePath(res.data.thumbnailPath);
                //         setDuration(res.data.fileDuration);
                //     }
                //   });
            }
        });


    }



    return (
        < React.Fragment style={{ display: 'flex' }}>
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'flex', marginBottom: '2rem' }}>
                <Title level={5} > Upload Book</Title>
            </div>
            
           
            <form onSubmit={onSubmit}>

            <div>
            <Col span={4}>
                        <Dropzone style={{  display: 'center'}}
                              multiple={false}
                              maxSize={800000000}
                            onDrop={onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div  style={{
                    width: '300px', height: '240px', border: '1px solid lightgray',
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

                                
                    <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${filePath}`}/>
                    </div> */}
                                
                    </Col>

                    { filePath !== "" &&
                     <img
                     style={{ maxWidth: '200px' }}
                     src={`http://localhost:5000/${filePath}`}
                     alt="img"
                 />
                   } 

          
            


            
                        
                    

                </div>
                    <div>
                        Title
                        <br />
                    <input name='title' placeholder="Title" id="title" value={title} onChange={onChangeTitle} />
                    
                    </div>
                    
                    <div>
                    description
                    <br />
                <input name='description' placeholder="description" id="description" value={description} onChange={onChangeDescription} />

                </div>
                    <div>
                    Contact
                    <br />
                <input type='number' placeholder="Contact" name='contactNumber' id="contactNumber" value={contactNumber} onChange={onChangeContactNumber} />

                </div>
                    <div>
                    Price(GHC)
                    <br />
                <input type='number' placeholder="Price" name='price' id="price" value={price} onChange={onChangePrice} />

                </div>
                    <div>
                    Author
                         <br />
                <input type='text' placeholder="Author" name='author' id="author" value={author} onChange={onChangeAuthor} />

                </div>
                    <div>
                    ISBN
                    <br />
                <input type='text' placeholder="ISBN" name='ISBN' id="ISBN" value={ISBN} onChange={onChangeISBN} />

                </div>
                    <div>
                    category
                    <br />
                <select name="category"  onChange={onChangeCatergory}>{ 
                        Category.map((category, i) => <option key={i} value={category.value}>{category.label}</option>)
                   
                }
                   
                </select>
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
