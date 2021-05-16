import React from 'react'
import { Carousel } from 'antd';
import { Avatar } from 'antd';
import { Image } from 'antd';


const contentStyle = {
  height: '560px',
  color: 'red',
  lineHeight: '160px',
  textAlign: 'center',
    background: 'teal',
//   marginTop:'200px'
};

const Caro = () => {
    
    return (
        <>
            <Carousel autoplay style={contentStyle}> 
                {/* <div>
                <Image  height='560px' width="500px"  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    
                </div> */}
                <div>
                    <Image height='560px' width="1500px" src="./download.jpg" />

                </div>
                
                <div>
                    <Image height='560px' width="1500px" src="./download3.jpg" />

                </div>
                <div>
                <Image height='560px' width="1500px" src="./download1.jpg" />

                </div>
                <div>
                <Image height='560px' width="1500px" src="./download2.jpg" />

                </div>
               
            </Carousel>

           
        </>
    );
  

};


export default Caro;