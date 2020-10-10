import React, { Component } from 'react';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom'
import { Select, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { saveBook, updateProduct} from "../../actions";
import {connect} from 'react-redux'

class Misc extends Component {
    state = {
        data: {
            name: '',
            price: '',
            count: ''
        },
        loading: true,
        error: false,
    }


    componentDidMount() {

        axios.get('/api/v1/admin/products/' + this.props.match.params.id)
            .then(res => {
                const data = res.data; // get the data array instead of object
                this.setState({ data, loading: false });
                console.log(data);
            })
            .catch(err => { // log request error and prevent access to undefined state
                this.setState({ loading: false, error: true });
                console.error(err);
            })
    }


    render() {

        const handleChange = (e) => {
            console.log(e.target.value)
            this.setState({
                data: {...this.state.data, [e.target.name]: e.target.value}
            })
        }

        const handleOk = (e) => {

            this.props.updateProduct(this.state.data, this.props.match.params.id)
            return <Redirect to="/books" />
        };

        const onFinish = values => {
            console.log(values);
        };

        if (this.state.loading) {
            return(
                <div>
                    <p> Loading... </p>
                </div>
            )
        }
        if (this.state.error || !this.state.data) { // if request failed or data is empty don't try to access it either
            return(
                <div>
                    <p> An error occured </p>
                </div>
            )
        }
        return (
            <form onSubmit={handleOk}>
                <h2 className="center" >Change data</h2>
                <h5>Title:</h5>
                <input type="text" name="name" value={ this.state.data.name } onChange={handleChange}/>
                <h5>Price:</h5>
                <input type="text" name="price" value={ this.state.data.price } onChange={handleChange}/>
                <h5>Count:</h5>
                <input type="text" name="count" value={ this.state.data.count } onChange={handleChange}/>


                <input type="submit" className="btn-large waves-effect waves-light xbutton" value="Save"/>
            </form>



        );
    }
}


const mapStateToProps = null;



const mapDispatchToProps = {
    updateProduct


};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Misc));