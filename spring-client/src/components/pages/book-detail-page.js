import React, {Component, Fragment} from "react";
import {Row, Col} from 'antd'
import { connect } from "react-redux";
import axios from "axios";
import {bookAddedToCart, fetchBooks} from "../../actions";
import {withRouter} from 'react-router-dom'
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);

class BookDetail extends Component{

    state = {
        product: null,
        comments: null
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios.get('/api/v1/admin/products/list/' + id)
            .then(res => {
                this.setState({
                    ...this.state,
                    product: res.data
                })
            })
    }

    state = {
        comments: [],
        submitting: false,
        value: '',
    };

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        this.setState({
            submitting: true,
        });

        setTimeout(() => {
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    {
                        author: this.props.username,
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content: <p>{this.state.value}</p>,
                        datetime: moment().fromNow(),
                    },
                    ...this.state.comments,
                ],
            });
        }, 1000);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { onAddedToCart } = this.props;
        const { comments, submitting, value } = this.state;
        const addButton = (<button onClick={() => onAddedToCart(this.state.product.id)} className="btn btn-info add-to-cart">Add to cart</button>);

        console.log(this.state.product);
        const product = this.state.product ? (
            <div style={{margin: 50}}>
                <Row>
                    <Col span={16} >
                        <h2>{this.state.product.name}</h2>
                        <p>Price: ${this.state.product.price}</p>
                        {this.props.auth ? addButton : ''}
                    </Col>
                </Row>
                    <div>
                        {comments.length > 0 && <CommentList comments={comments} />}
                        <Comment
                            avatar={
                                <Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                    alt="Han Solo"
                                />
                            }
                            content={
                                <Editor
                                    onChange={this.handleChange}
                                    onSubmit={this.handleSubmit}
                                    submitting={submitting}
                                    value={value}
                                />
                            }
                        />
                    </div>
            </div>

        ):(<div className="center">Loading...</div>);

        return (
            <Fragment>
                <div>
                    {product}
                </div>
            </Fragment>
        );
    }
}


const mapStateToProps = state => ({
    username: state.auth.username,
    auth: state.auth.isAuth
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookDetail));


