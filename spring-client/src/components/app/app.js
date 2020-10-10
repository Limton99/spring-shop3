import React from "react";
import { Route } from "react-router-dom";
import CartPage from "../pages/cart-page";
import BookDetail from "../pages/book-detail-page";
import BookListContainer from "../book-list/book-list";
import Footer from "../Footer";
import ContactPage from "../pages/contact-us";
import {bookAddedToCart, fetchBooks} from "../../actions";
import {connect} from "react-redux";
import ConnectedHeader from "../header/PageHeader";
import Misc from "../pages/edit-item-form";

const App = () => {
    return (
            <div>
                <ConnectedHeader numItems={5} total={210}/>

                    <main className="container">
                    <Route path="/books" component={BookListContainer} exact/>
                    <Route path="/cart" component={CartPage}/>
                    <Route path="/books/:id" component={BookDetail} exact/>
                    <Route path="/books/edit/:id" component={Misc}/>

                    </main>
                <Route path="/contactus" component={ContactPage}/>

                <Footer />
            </div>

    );
};

const mapStateToProps = ({ productList: { products, loading, error} }) => {
    return { products, loading, error }
};

const mapDispatchToProps = (dispatch, { bookstoreService }) => {
    return{
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }


};

export default connect(mapStateToProps, mapDispatchToProps)(App);


// export default withBookstoreService()(App);