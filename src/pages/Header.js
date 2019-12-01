import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
    }from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { onUserLogout } from '../actions/AuthActions'
import logo from '../supports/img/Logo OteShop.jpeg';
   
const cookies = new Cookies();

class Header extends 
Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    onLogoutSelect = () => {
        if(window.confirm('Are you sure want to Logout?')) {
            if(this.props.onUserLogout()) {
            cookies.remove('userCookie', 'roleCookie');
        }
    }
}
render() {
    if(this.props.username === "") {
        return (
            <div style={{ margin: '0 0 90px 0' }}>
                <Navbar color="light" light expand="md" fixed="top" className="shadow">
                <NavbarBrand href="/" style={{ fontSize: "35px", marginBottom: "10px" }}>
                <img src={logo} alt="store logo" height={50} width={250} />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar style={{ fontSize: "14px", fontWeight: "bold" }}>
                    <NavItem>
                 
                   <NavLink href="/login"><i className="fa fa-sign-in"></i> Login</NavLink>
                    </NavItem>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <NavItem>
                    <NavLink href="/register"><i className="fa fa-user-plus"></i> Register</NavLink>
                    </NavItem>

                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    } if(this.props.username!=="" && this.props.role==="Admin") {
        console.log(this.props.username)
        return (
            <div style={{ margin: '0 0 90px 0' }}>
                <Navbar color="light" light expand="md" fixed="top" className="shadow">
                <NavbarBrand href="/" style={{ fontSize: "16px" }}>
                <img src={logo} alt="logo" height={50} width={250} />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar style={{ fontSize: "14px", fontWeight: "bold" }}>
                    <NavItem>
                        <NavLink href="/admin/Dashboard">
                        <i className="fa fa-cogs"></i> Dashboard Admin 
                        </NavLink>
                        </NavItem>
                       
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                            <p className="text-capitalize" style={{display:"inline"}}> Hello,{this.props.username}</p>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={this.onLogoutClick}>
                                <Link to="#" onClick={this.onLogoutSelect}>
                                <i className="fa fa-sign-out"></i>
                        &nbsp;Logout</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <NavItem>
                        <NavLink href="#" onClick={this.onLogoutSelect}>
                        <i className="fa fa-sign-out fa-lg"></i>
                        &nbsp;Logout
                        </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }


     else {
        return (
            
            <div style={{ margin: '0 0 90px 0' }}>
                <Navbar color="light" light expand="md" fixed="top" className="shadow">
                <NavbarBrand href="/" style={{ fontSize: "16px" }}>
                <img src={logo} alt="logo" height={50} width={250} />
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar style={{ fontSize: "14px", fontWeight: "bold" }}>
                    <NavItem>
                        <NavLink href="/productlist">
                        <i className="fa fa-home fa-lg"></i>&nbsp;Product
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink href="/cart">
                        <i className="fa fa-shopping-cart fa-lg"></i>
                        &nbsp;Cart&nbsp;<span className="badge badge-primary"></span>
                        </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Hello, <p className="text-capitalize" style={{display:"inline"}}>{this.props.username}</p>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem><Link to="/history" className="text-secondary"><i className="fa fa-history"></i> History Belanja </Link></DropdownItem>
                                <DropdownItem><Link to="/confirmationpayment" className="text-secondary"><i className="fa fa-money"></i> Konfirmasi Bayar</Link> </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem onClick={this.onLogoutClick}>
                                <Link to="#" onClick={this.onLogoutSelect}>
                                <i className="fa fa-sign-out"></i>
                                &nbsp;Logout</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <NavItem>
                        {/* <NavLink href="#" onClick={this.onLogoutSelect}>Logout</NavLink> */}
                        <NavLink href="#" onClick={this.onLogoutSelect}>
                        <i className="fa fa-sign-out fa-lg"></i>
                        &nbsp;Logout
                        </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
        )
    }
    

}
}



const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        role : state.auth.role,
        status : state.auth.status
    }
}

export default connect(mapStateToProps, { onUserLogout})(Header);
