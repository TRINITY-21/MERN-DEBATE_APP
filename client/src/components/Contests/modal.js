import React from 'react'
import { Modal, Button } from 'antd';
import UploadChallenge from './uploadContest';


const ChallengeModal = () => {
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
        Upload Challenge 
      </Button>
      <br />
          <Modal
              title="Upload Challenge"
              visible={visible}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
      >
        <UploadChallenge/>
      </Modal>         
    </>
  );
};

export default ChallengeModal;