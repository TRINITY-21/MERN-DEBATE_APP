import React, { useState, useEffect } from 'react'
import { FaCode } from "react-icons/fa";
import Reviews from './reviews';
import axios from 'axios'
import { cart } from '../../../_actions/user_actions'
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import { Form, Avatar, Card, Input, Button, Row, Col, } from 'antd';
const {Meta} = Card


function DetailsPage(props) {

    const [book, setBook] = useState([]);
    const [ReviewList, setNewReview] = useState([]);
    const bookId = props.match.params.bookId;
    const onlineUser = localStorage.getItem('userId');
    
    const dispatch = useDispatch();

 

    useEffect(() => {
        
        axios.post('/api/book/getBook/'+ bookId).then((res) => {
            console.log(res)
            setBook(res.data.book);

        });
    }, []);

    const updateReview = (newReview) => {
        setNewReview(ReviewList.concat(newReview));
    }

   

    return (
        <div style={{ width: '45%', margin: '3rem auto' }}>
                <h2> Details of Book</h2>
                <hr />
                {
                   
    
                        <div>
                            <a href={`/book/${book._id}`}>   <img src={`http://localhost:5000/${book.filePath}`} width="250" height="200" /></a>
                    
                            <div>
                                <Meta
                                    // avatar={
                                    //     <Avatar src={`http://localhost:5000/${book.writer.image}`} />
    
                                    // }
                                   
                                    title={
                                        book.title
    
                                    }
                                />
                                
                               
                            
                                <span>By {book.author}</span>
                                <h6>ISBN {book.ISBN}</h6> 
                                <h5>GHC{book.price}</h5> 
                                <span>{book.views} views</span>
                        <span>     {moment(book.createdAt).format('MMM Do YYYY hA')}</span>
                        <Reviews refreshFunc={updateReview} ReviewLists={ReviewList} bookId={book._id}/>
                               
                            </div>
                        </div>
                
    
                    
                }
    
      
    
    
    
            </div>
        )
    
    
}

export default DetailsPage
