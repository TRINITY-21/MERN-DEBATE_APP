import React,{useState,useEffect} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux'
import { Icon, } from '@ant-design/compatible'

function Likes(props) {

    const user = useSelector(state => state.user);

    const [likeNum, setlikeNum] = useState(0);
    const [liked, setliked] = useState(false);

    //const onlineUser = localStorage.getItem('userId');
    const onlineUser = localStorage.getItem('userId');
    const bookId = props.bookId;
   // console.log(onlineUser);

    
    useEffect(() => {
        const dataToSubmit = {         
            bookId,     
           
        }

        axios.post('/api/like/likeNum',dataToSubmit).then((res) => {
            console.log(res);
            setlikeNum(res.data.likeNum);
        });
    
    }, []);     
    
    const handleClick = () => {

        const dataToSubmit = {
            onlineUser,
            bookId
        }

        
    if (!liked) {

         /// save 
         axios.post('/api/like/like', dataToSubmit).then((res) => {
            //console.log(res);
            setlikeNum(likeNum + 1);
            setliked(!liked);
        });
      
        
    } else {
                //delete
                axios.post('/api/like/unlike', dataToSubmit).then((res) => {
                    //console.log(res);
                    setlikeNum(likeNum - 1);
                    setliked(!liked);
                });
       
    }
    
          
 }
    



    return (

        <div>
            {likeNum}
            <span onClick={handleClick}> 
            <Icon type="heart"  style={{ fontSize: '1rem', color:'red' }}  /></span>
        </div>
    )
}
export default Likes;