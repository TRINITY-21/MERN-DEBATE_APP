import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Comment, Avatar, Button, Input } from 'antd';


export default function Reviews(props) {

    const [review, setReview] = useState('');
    const [content, setContent] = useState('');
    const [ReviewLists, setReviewlists] = useState([]);
    const [reviewLen, setReviewLen] = useState(0)



    const bookId = props.bookId;
    const onlineUser = localStorage.getItem('userId');

    useEffect(() => {

        let dataToSubmit = {
            bookId,
            onlineUser
        }

        fetchReviews(dataToSubmit);
     
    }, []);


    const fetchReviews = (dataToSubmit) => {
        axios.get('/api/review/getReview', dataToSubmit).then((res) => {
            console.log(res);
            //setReviewLen(res.data.len);
            //setReviewlists(res.data.review);

        });
    } 


    const handleOnchange = (e) => {
        setContent(e.currentTarget.value);
        console.log(review);
        
}

    const submit = (e) => {
        e.preventDefault();

        let dataToSubmit = {
            bookId,
            content,
            onlineUser
        }

        console.log(dataToSubmit);

        axios.post('/api/review/saveReview', dataToSubmit).then((res) => {
            console.log(res);
            fetchReviews();
            props.refreshFunc(res.data.review);
            setReviewLen(res.data.review.length);
        });

        setContent('');
        
    }

    return (
        <div>
            <h4> {reviewLen == 0 ? '' : reviewLen} Reviews</h4>
            
            {console.log(props.ReviewLists)}
            {props.ReviewLists.map((review, i) => {
                return < div key={i} >
                    <Comment
                //actions={actions}
                author={review.onlineUser.name}
                avatar={
                    <Avatar
                        src={`http://localhost:5000/${review.onlineUser.image}`}
                        alt="image"
                    />

                    
                }
                content={       
                    <p>
                        {review.content}
                    </p>
                }
                    ></Comment>
                    </ div>
            })
                
                }
            

            <form onSubmit={submit}>
                <div>
                <textarea type="text" value={content} onChange={handleOnchange}>

                    </textarea>
                    </div>

                <Button type="primary" size="large" onClick={submit}>
                    Submit
                </Button>
            </form>
        </div>
    )
}
