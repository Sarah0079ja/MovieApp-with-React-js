import React, { Fragment, Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';

// import {Link} from 'react-router-dom';
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

import { connect } from "react-redux";
import PropTypes from "prop-types"; 

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
       const { isAuthenticated, user } = this.props.auth;
       const authLinks = (
         <Fragment>
           <NavItem>
             <span className="navbar-text mr-3">
               <strong>{user ? `Welcome ${user.first_name}` : ""}</strong>
             </span>
           </NavItem>
           <Logout />
         </Fragment>
       );
       
        const guestLinks = (
          <Fragment>
            <NavItem>
              <RegisterModal />
            </NavItem>
            <NavItem>
              <LoginModal />
            </NavItem>
          </Fragment>
        );

    return (
      <div>
        <Navbar color="danger" dark expand="sm" className="">
          <Container>
            <NavbarBrand href="/">MovieApp</NavbarBrand>
             {/* <Nav className='mr-auto' color='blue'> <a href='/favorite' key='favorite'></a></Nav> */}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
                 <NavItem>
                  
                </NavItem>
                <NavItem>
                  
                </NavItem> 
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

  const mapStateToProps = state => ({
    auth: state.auth
  });
export default connect(mapStateToProps, null)(AppNavbar);