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
            <Carousel autoplay>
                <div>
                <Image  height='560px' width="500px"  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    
                </div>
                <div>
                    <Image height='560px' width="500px" src="./logo192.png" />

                </div>
                <div>
                <Image height='560px' width="500px" src="./logo512.png" />

                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>

           
        </>
    );
  

};


export default Caro;