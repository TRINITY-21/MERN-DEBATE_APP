import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios'
import moment from 'moment'
import {Icon } from '@ant-design/compatible'
import { cart } from '../../../_actions/user_actions'
import { useSelector, useDispatch } from "react-redux";
import Likes from './likes'
import SearchFeature from './SearchFeature'



import { Form, Avatar, Card, Input, Button, Row, Col,Typography } from 'antd';
const {Meta} = Card
const { Search } = Input;
const { Title } = Typography;

function BookList() {

    const [Books, setBooks] = useState([]);
    const [cartNum, setCartNum] = useState(0)
    const [search, setSearch] = useState('')


    const onlineUser = localStorage.getItem('userId');
    
    useEffect(() => {
       

        getProducts();
        

    }, []);

    
        const getProducts = (dataToSubmit) => {
            axios.post('/api/book/books', dataToSubmit).then((res) => {
                console.log(res);
                if (res.data.success) {
                    setBooks(res.data.books);
                } else {
                    alert('unable to get books');
                }
            })
        };
    

 
    const dispatch = useDispatch();

    const handleClick = ((books) => {
        
        const dataToSubmit = {
            books,
            onlineUser,
            
        }       
        

    axios.post('/api/cart/saveCart', dataToSubmit)
                .then((res) => console.log(res));
                
    dispatch(cart(dataToSubmit)).then((res) => console.log(res));
        
    });


    const updateSearchTerms = (newSearchTerm) => {
        console.log(newSearchTerm);
        setSearch(newSearchTerm);

        let dataToSubmit = {
            search
        }


    

        getProducts(dataToSubmit);
    }

    // const handleOnchange = (e) => {
    //     setSearch(e.currentTarget.value);
    //     console.log(search);

    //     const dataToSubmit = {
    //         search
    //     }

    //     getProducts(dataToSubmit);
        
    // }
    
    // const submit = (e) => {
    //     e.preventDefault();
        
    //     console.log(search)

    //     const dataToSubmit = {
    //         search
    //     }

    //     // axios.post('/api/book/search', dataToSubmit).then((res) => {
    //     //      console.log(res);
    //     //     if (res.data.success) {
    //     //         setBooks(res.data.books);
    //     //     } else {
    //     //         alert('unable to get books');
    //     //     }
    //     // })
        
    //     getProducts(dataToSubmit);
     
       
    // }




    const renderCards =
        Books.map((book, i) => (
         
            <Col key={i} lg={6} md={8} xs={24}>
                <a href={`/book/${book._id}`}>   <img style={{ width: '100%', maxHeight: '150px' }} src={`http://localhost:5000/${book.filePath}`} width="250" height="200" /></a>
{/*              
                <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`http://localhost:5000/${book.filePath}`} alt="productImage" /> */}
                <div>
                    <Meta
                        // avatar={
                        //     <Avatar src={`http://localhost:5000/${book.writer.image}`} />

                        // }
                            
                        title={
                            book.title

                        }
                    />
                         
                        
                    <Likes bookId={book._id} />
                    <span>Posted By {book.writer && book.writer.name}</span>
                    <h6>ISBN {book.ISBN}</h6>
                    <h5>GHC{book.price}</h5>
                    <h5>Author: {book.author}</h5>
                    <span>{book.views} views</span>
                    <span>     {moment(book.createdAt).format('MMM Do YYYY hA')}</span>
                    <h4 onClick={() => handleClick(book._id)}>Add to Bucket </h4>
                </div>
                    
            </Col>
         

        ));
        
     
    

    return (
      

        <div style={{ width: '75%', margin: '3rem auto' }}>
        <div style={{ textAlign: 'center' }}>
                <Title style={{color :'black'}}>  BOOK <span style={{color :'red'}}>WORM</span> <Icon type="book" />  </Title>
        </div>

{/*          
            <form nSubmit={submit}o>
                <input type="text" id="search" name="search" value={search} onChange={handleOnchange} />
                <button type="submit">Search</button>

            </form>  */}

            <div>
                         
            {/* <form onSubmit={submit}>
                <input type="text" id="search" name="search" value={search} onChange={handleOnchange} />
                <button type="submit">Search</button>

            </form>  */}
          
                        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

                </div>
            </div>
            <br />
            
            <Title>Latest Books</Title>
            
                <br />

                            
                {Books.length === 0 ?
                    <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                        <h2>No post yet...</h2>
                    </div> :
                    <div>
                        <Row gutter={[16, 16]}>

                            {renderCards}

                        </Row>


                    </div>
                }
                            

            </div>
        )
    
}

export default BookList;

