import React, {Fragment} from "react";
import './book-list-item.css';
import {Link} from "react-router-dom";
import {Card, CardImg} from "react-bootstrap";
import {connect} from 'react-redux'

const BookListItem = ({ product, bookAddedToCart, deleteArticle, isAuth }) => {
    // console.log(book);

    const { id, name, price, count } = product;


    const EditButthon = (<Link to={`/books/edit/${id}`} className="btn btn-primary">Edit item</Link>);
    const DeleteButthon = (<button onClick={deleteArticle} className="btn btn-info add-to-cart">Delete</button>);
    const AddButthon = (<button onClick={bookAddedToCart} className="btn btn-info add-to-cart">Add to cart</button>);

    return (
        <Fragment>


            <Card className="book-list-item" style={{width: 200 }}>
                <Card.Body>
                    <Link to={`/books/${id}`} >

                    <Card.Title>{name}</Card.Title>
                        <img src="https://via.placeholder.com/150"/>

                    </Link>
                    <Card.Text>
                        <div className="book-price">Price: ${price}</div>
                        <div className="book-price">Count: {count}</div>

                    </Card.Text>
                    {isAuth ? AddButthon : ''}
                    {isAuth ? EditButthon : ''}
                    {isAuth ? DeleteButthon : ''}
                </Card.Body>
                {/*<button onClick={deleteArticle} className="btn btn-info add-to-cart">Delete</button>*/}




            </Card>



        </Fragment>
    );
};

const mapStateToProps = ({ auth: {isAuth} }) => {
    return { isAuth }
};




export default connect(mapStateToProps)(BookListItem);