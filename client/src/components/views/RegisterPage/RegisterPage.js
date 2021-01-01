import React, {useState} from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Input, Button, Row, Col, Typography, } from 'antd';
import { Icon, } from '@ant-design/compatible'
import { useSelector } from 'react-redux';
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// import {
//   Form,
//   Input,
//   Button,
// } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



function RegisterPage(props) {
  const dispatch = useDispatch();

 // const user = useSelector(state => state.user);

 
  const [fileName, setfileName] = useState('');
  const [filePath, setfilePath] = useState('');
  // const [thumbnailPath, setthumbFilePath] = useState('');
  // const [fileDuration, setDuration] = useState('');


  
  const onDrop = (files) => {
    console.log(files);
    let formData = new FormData();

    let config = {
        'content-type':'multipart/form-data'
    }

    formData.append('file', files[0]);

    //// upload video
    axios.post('/api/users/upload', formData, config).then((res)=> {
        console.log(res)
        if (res.data.success) {
            setfilePath(res.data.filePath);
            setfileName(res.data.fileName);

            /// generate thumbnail

            // let dataToSubmit ={

               
            //         filePath: res.data.filePath,
            //         fileName: res.data.fileName,
                  
            // }


            // axios.post('api/video/thumbnail', dataToSubmit).then((res) => {
            //     if(res.data.success){
                  
            //     setthumbFilePath(res.data.thumbnailPath);
            //     setDuration(res.data.fileDuration);
                  
            //     }
            //   });
        }
    });


}
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        lastName: Yup.string()
          .required('Last Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: filePath
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
      
        } = props;
        return (

          <div className="app">
             <br/><br/>
            <h2>Sign up</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >
           
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                <br/><br/>
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
                
              </Form.Item>

              <Form.Item required label="Last Name">
                <Input
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                  }
                />
                 <br/><br/>
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>

              <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                 <br/><br/>
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                 <br/><br/>
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="Confirm" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                 <br/><br/>
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
                </Form.Item>

              <Form.Item  required label="Image">
              <Col span={12} offset="1">
                                <Dropzone onDrop={onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button >
                                            <Icon type="upload" />
                                                    Upload your Image
                                        </Button>
          
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                    </Col>
                                  <br />
                    { filePath !== "" &&
                     <img
                     style={{ maxWidth: '200px',height:'50px' }}
                     src={`http://localhost:9000/${filePath}`}
                     alt="img"
                 />
                   } 

                       </Form.Item>

              <br/>

            <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
}


export default RegisterPage
