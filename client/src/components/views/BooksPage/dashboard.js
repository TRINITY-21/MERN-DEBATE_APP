// import React, { useEffect, useState } from 'react'
// import { Typography, Popover, Button } from 'antd';
// import axios from 'axios';
// import './dashboard.css';
// import { useSelector } from 'react-redux';

// const { Title } = Typography;

// function DashboardPage() {
//     const [Books, setBooks] = useState([])

//     const onlineUser = localStorage.getItem('userId');
    



//     const dataToSubmit = {
//         //writer: user.userData,
//         onlineUser
//     }

//     useEffect(() => {
        
//         fetchBooks();

//     }, []);
   
//     const fetchBooks = () => {
        
//         axios.post('/api/book/dashboard', dataToSubmit).then((res) => {
//             console.log(res)
//             setBooks(res.data.book);
//         }

//         );
//     }
    
//     const handleRemove = (bookId,onlineUser) => {

//         const dataToSubmit = {
//             bookId,
//             onlineUser,                            
//         }
        
//         axios.post('/api/book/deleteBook', dataToSubmit).then((res) => {
//             console.log(res)
//             fetchBooks();

//         });
//     }

//     const renderCards = Books.map((book, index) => {


//         const content = (
//             <div>
//                 {book?
//               <img src={`http://localhost:5000/${book.filePath}`} width="250" height="200" />
//                     : "no image"}
//             </div>
//         );

//         return <tr key={index}>

//             <Popover content={content} title={`${  book.title}`}>
//                 <td>{  book.title}</td>
//             </Popover>

//             <td>Price GHC{book.price}</td>
//             <td>{book.contactNumber}</td>
//             <td><button onClick={()=>handleRemove(book._id,book.writer._id)}> Remove </button></td>
//             <td><a href={`/edit/${book._id}`}><button> Edit </button></a></td>
//         </tr>
//     })




//         return (
//             <div style={{ width: '85%', margin: '3rem auto' }}>
//                 <Title level={2} > Dashboard </Title>
//                 <hr />
               
//                     {/* <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                         <p>Please Log in first...</p>
//                         <a href="/login">Go to Login page</a>
//                     </div> */}
                
                  
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Title</th>
//                             <th>Price</th>
//                             <th>Contact</th>
//                                 <td>Remove from checkout</td>
//                                 <td>Edit Book</td>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {renderCards}
//                         </tbody>
//                     </table>
                
//             </div>
//         )


// }

// export default DashboardPage
