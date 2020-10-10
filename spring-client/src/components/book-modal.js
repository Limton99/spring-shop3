import React, {useState, useEffect} from 'react';
import { Modal, Form, Input, Upload } from 'antd';
import { connect } from 'react-redux'
import { saveBook } from "../actions";


function ModalBook(props) {
    const {modalBlogVisible, close } = props
    const [visible, setVisible] = useState(modalBlogVisible)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        count: ''
    })

    useEffect(() => {
        setVisible(modalBlogVisible)
    }, [modalBlogVisible])


    const handleOk = () => {
        props.saveBook(formData)

        close();
    };

    const onFinish = values => {
        console.log(values);
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
        console.log(e.target.value)
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <Modal
            title="Add Book"
            visible={visible}
            onOk={handleOk}
            onCancel={close}
        >
            <Form layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['product', 'name']} label="Title" rules={[{ required: true }]}>
                    <Input name="name" value={formData.name} onChange={handleChange}/>
                </Form.Item>
                <Form.Item name={['product', 'price']} label="Price">
                    <Input name="price" value={formData.price} onChange={handleChange}/>
                </Form.Item>
                <Form.Item name={['product', 'count']} label="Count">
                    <Input name="count" value={formData.count} onChange={handleChange}/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

const mapStateToProps = null;

const mapDispatchToProps = {
        saveBook
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBook);


