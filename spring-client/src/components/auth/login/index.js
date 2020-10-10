import React, {useState, useEffect} from 'react';
import { Modal, Form, Input, Button } from 'antd';

import {logIn, logOut, setError, signUp} from "../../../actions";
import { connect } from 'react-redux'

function Login(props) {
  const {modalLoginVisible, close, openSignup} = props
  const {error} = props
  const [visible, setVisible] = useState(modalLoginVisible)
  const [loading, setLoading] =  useState(false)
  const [formData, setFormData] = useState({
    username: ``,
    password: ``
  })
  useEffect(() => {
    setVisible(modalLoginVisible)
      if(!modalLoginVisible){
          props.setError()
      }
  }, [modalLoginVisible])


  const handleOk = () => {
      console.log(formData)
    props.logIn(formData)
      // close()
  };

  const onFinish = values => {
    handleOk()
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <Modal
        title="Login"
        visible={visible}
        onOk={handleOk}
        onCancel={close}
        footer={[
            <Button key="back" onClick={close}>
              Close
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Submit
            </Button>,
          ]}
    >

        <Form layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}
                       validateStatus={error.username ? 'error' : ''}
                       help={error.username}
            >

                <Input name="username" value={formData.username} onChange={handleChange}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
                validateStatus={error.password ? 'error' : ''}
                help={error.password}
            >
                <Input.Password name="password" value={formData.password} onChange={handleChange}/>
            </Form.Item>
        </Form>
        {error.detail && <span style={{color: 'red'}}>{error.detail}</span>}<br />
        Or <a onClick={openSignup}>register now!</a>
    </Modal>
  );
}


const mapStateToProps = state => {
    return { error: state.errors.error }
}

const mapDispatchToProps = {
      logIn: logIn,
    setError: setError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
