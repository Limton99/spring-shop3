// import React from "react";
// import {Button} from "antd";
// import {bookAddedToCart, deleteArticle, fetchBooks} from "../actions";
// import {connect} from "react-redux";
//
//
// const Add = () => {
//     if (isAuth) {
//         return (
//             <Button className="add-new" type="primary" block size="small" style={{margin: 10}} onClick={openModal}>
//                 <i className="fa fa-plus" aria-hidden="true"/>
//             </Button>)
//     }
//
// }
//
//
// const mapStateToProps = ({ productList: { products, loading, error}, auth: {isAuth} }) => {
//     return { products, loading, error, isAuth }
// };
//
//
//
// const mapDispatchToProps = {
//     fetchBooks,
//     bookAddedToCart,
//     deleteArticle
//
//     // onAddedToCart: (id) => dispatch(bookAddedToCart(id))
//
//
//     // return bindActionCreators({
//     //     booksLoaded
//     // }, dispatch);
//     // booksLoaded: (newBooks) => {
//     //     dispatch(booksLoaded(newBooks));
//     // }
//
// };
//
//
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(Add);
//
// // export default withBookstoreService()(connect(mapStateToProps, mapDispatchToProps)(BookList));
//
//
// export default add