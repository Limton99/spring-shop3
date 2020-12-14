import React, {Component} from "react";
import BookListItem from "../book-list-item";
import './book-list.css';
import { connect } from "react-redux";
import { fetchBooks, bookAddedToCart, deleteArticle } from "../../actions";
import Spinner from "../../spinner";
import ErrorIndicator from "../error-indicator";
import {CardGroup} from "react-bootstrap";
import {Button, Col, Row} from "antd";
import ModalBook from "../book-modal";

const BookList = ({ products, bookAddedToCart, deleteArticle }) => {
    return (
        <CardGroup>
            {
                products.map((product) => {
                    return (
                        <li key={product.id}
                            className="book-item">
                            <BookListItem product={product}
                                  bookAddedToCart={() => bookAddedToCart(product.id)}
                                  deleteArticle={() => deleteArticle(product.id)}
                            />
                        </li>
                    );
                })
            }
        </CardGroup>
    );
};

class BookListContainer extends Component{

    state = {
        modalBlogVisible: false
    }

    componentDidMount() {
        this.props.fetchBooks();
    }

    render() {

        const openModal = () => {
            this.setState({
                modalBlogVisible: true
            })
        }

        const closeModal = () => {
            this.setState({
                modalBlogVisible: false
            })
        }
        const { products, loading, error, bookAddedToCart, deleteArticle, isAuth } = this.props;
        if(loading) {
            return <Spinner />
        }


        const AddButton = (
            <Button className="add-new" type="primary" block size="small" style={{margin: 10}} onClick={openModal}>
                <i className="fa fa-plus" aria-hidden="true"/>
            </Button>);

        if(error){
            return <ErrorIndicator />
        }
        return (
            <React.Fragment>
                {isAuth ? AddButton : ''}
                         <BookList  products={products} bookAddedToCart={bookAddedToCart} deleteArticle={deleteArticle} isAuth={isAuth}/>
                <ModalBook modalBlogVisible={this.state.modalBlogVisible} close={closeModal}/>

            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ productList: { products, loading, error}, auth: {isAuth} }) => {
    return { products, loading, error, isAuth }
};

const mapDispatchToProps = {
    fetchBooks,
    bookAddedToCart,
    deleteArticle

    // onAddedToCart: (id) => dispatch(bookAddedToCart(id))


    // return bindActionCreators({
    //     booksLoaded
    // }, dispatch);
    // booksLoaded: (newBooks) => {
    //     dispatch(booksLoaded(newBooks));
    // }

};




export default connect(mapStateToProps, mapDispatchToProps)(BookListContainer);
