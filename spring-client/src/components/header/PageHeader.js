import React, {useState, useEffect} from "react";
import { Link, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import Badge from "@material-ui/core/Badge";
import SignupModal from '../auth/signup'
import LoginModal from '../auth/login'
import { Menu, Dropdown, Input } from 'antd';
import { logOut } from "../../actions";
import './header.css';


const {Search} = Input

const ConnectedHeader = (props) => {

    const [modalSignupVisible, setModalSignupVisible] = useState(false)
    const [modalLoginVisible, setModalLoginVisible] = useState(false)
    const openLoginModal = () => {
        setModalLoginVisible(true)
    }

    const closeLoginModal = () => {
        setModalLoginVisible(false)
    }

    const openSignupModal = () => {
        setModalSignupVisible(true)
    }

    const closeSignupModal = () => {
        setModalSignupVisible(false)
    }

    const closeSignupOpenLogin = () => {
        closeSignupModal()
        openLoginModal()
    }

    const closeLoginOpenSignup = () => {
        closeLoginModal()
        openSignupModal()
    }

    const onSearch = (value) => {
        props.filterBooks(value)

    }

    const onChange = (e) => onSearch(e.target.value)



    useEffect(() => {
        if(props.signUpSuccess) {
            closeSignupOpenLogin()
        }
        if(props.isAuth) {
            closeLoginModal()
        }

    }, [props.signUpSuccess, props.isAuth])


    const unAuthMenu = (
        <Menu>
            <Menu.Item onClick={openLoginModal}>
                Login
            </Menu.Item>
            <Menu.Item onClick={openSignupModal}>
                Sign Up
            </Menu.Item>
        </Menu>
    );

    const authMenu = (
        <Menu>
            <Menu.Item onClick={props.logOut}>
                Logout
            </Menu.Item>
        </Menu>
    );



        let totalPrice = props.items.reduce((accumulator, item) => {
            return accumulator + item.total;
        }, 0);

        return (
            <div className="page-header">
            <Menu mode="horizontal" theme="light">
                <Menu.Item key="2" >
                    <Link to="/books">Books Store</Link>
                </Menu.Item>

                <Menu.Item className="space" key="5">
                    <Link to="/contactus">Contact us</Link>
                </Menu.Item>

                    <Search
                        placeholder="input search text"
                        onChange={onChange}
                        onSearch={onSearch}
                        style={{ width: 200 }}
                    />

                {/*<Menu.Item className="space" key="6">*/}
                {/*    <Link to="/profile">Profile</Link>*/}
                {/*</Menu.Item>*/}
                <Link to="/cart" className="shopping-cart">
                    <Badge badgeContent={props.nrOfItemsInCard} color="primary">
                        <i className="cart-icon fa fa-shopping-cart" />
                    </Badge>
                    (${totalPrice})
                </Link>
                <Dropdown className="auth" overlay={props.isAuth ? authMenu : unAuthMenu} trigger={['click']}>
                    <i className="fas fa-user" style={{color: "black"}}></i>
                </Dropdown>
            </Menu>

                <SignupModal modalSignupVisible={modalSignupVisible} close={closeSignupModal} openLogin={closeSignupOpenLogin}/>
                <LoginModal modalLoginVisible={modalLoginVisible} close={closeLoginModal} openSignup={closeLoginOpenSignup}/>
            </div>


        );


}

const mapStateToProps = ({ shoppingCart: { cartItems, orderTotal}, auth: {isAuth, signUpSuccess, currentUserId} }) => {
    return {
        items: cartItems,
        nrOfItemsInCard: cartItems.length,
        isAuth: isAuth,
        signUpSuccess: signUpSuccess,
        currentUserId: currentUserId
    }
};



const mapDispatchToProps = {
    logOut

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedHeader))
