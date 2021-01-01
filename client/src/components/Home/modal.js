import React from 'react'
import { Modal, Button } from 'antd';
import UploadDabate from '../Upload/uploadDebate';




const RegModal = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Content of the modal');

  const showModal = (props) => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <>
      <Button type="danger" onClick={showModal}>
        Upload Debate 
      </Button>
      <br />
      <Modal
        title="Upload Debate"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <UploadDabate/>
      </Modal>         
    </>
  );
};

export default RegModal;