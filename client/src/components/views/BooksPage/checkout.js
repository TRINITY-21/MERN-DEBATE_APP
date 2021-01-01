import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { Typography, Popover, Button } from 'antd';
import { Form, Avatar, Card, Input, Row, Col, } from 'antd';
const { Meta } = Card;
const { Title } = Typography;


function Checkout(props) {
    const user = useSelector(state => state.user);

    const users= localStorage.getItem('userId');
    console.log(users)

    const [Books, setBook] = useState([]);





    useEffect(() => {
        fetchBooks();
    },[]);
        
        const fetchBooks = () => {
            axios.get('/api/cart/cartBooks').then((res) => {
                console.log(res)
                if (res.data.success) {
                    setBook(res.data.cart);

                }
            }
            );
        }


  

    const handleRemove = (bookId, onlineUser) => {

        const dataToSubmit = {
            bookId,
            onlineUser,
        }
        
        axios.post('/api/cart/removeBook', dataToSubmit).then((res) => {
            console.log(res)
            fetchBooks();

        });
    }


    const renderCards = Books.map((book, index) => {


        const content = (
            <div>
                { book.books ?
              <img src={`http://localhost:5000/${book.books.filePath}`} width="250" height="200" />
                    : "no image"
                }
            </div>
        );

        return <tr key={index}>
            {book.books &&
                <Popover content={content} title={`${book.books.title}`}>
                    <td>{book.books.title}</td>
                </Popover>
            }
            <td>Price GHC{book.books && book.books.price}</td>
            <td>{book.books && book.books.contactNumber}</td>
            <td><button onClick={()=>handleRemove(book.books && book._id, book.books && book.onlineUser)}> Remove </button></td>
             
        </tr>
    })


        return (
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <Title level={2} > Checkout</Title>
                <h4>Remove Item after recieving the item</h4>
                <hr />
               
                    {/* <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <p>Please Log in first...</p>
                        <a href="/login">Go to Login page</a>
                    </div> */}
                
                  
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                            <th>Price</th>
                            <th>Contact</th>
                                <td>Remove from checkout</td>
                            </tr>
                        </thead>
                        <tbody>
                            {renderCards}
                        </tbody>
                    </table>
                
            </div>
        )





       
}

export default Checkout


