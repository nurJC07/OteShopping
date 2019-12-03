import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Carouselku from './Carouselku';
import Jumbotron from './Jumbotron';


class HomePage extends Component {

  render() {
          if(this.props.username !== "" && this.props.role === "Admin") {
            return <Redirect to="/admin/dashboard" />
          } 
          if(this.props.role === 'User' && this.props.status === "Unverified") {
            return <Redirect to="/WaitingVerification" />
          
          }
           else {
            return (
              <div style={{padding: "30px" }}>
                 <div className="card bg-light" style={{ fontSize: "13px", padding: "30px" }}>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <Carouselku />
                    </div>
                </div>
            </div>
            <br/>
            <div className="card bg-light" style={{ fontSize: "13px", padding: "30px" }}>
                <div className="row justify-content-center">
                <h1>Sensasi Belanja Cuma Di sini</h1></div>
            </div>
            <br/>
            <div className="card bg-light" style={{ fontSize: "13px", padding: "30px" }}>
                <div className="row justify-content-center"><Jumbotron /></div>
            </div>
            </div>
            )
          }

      }
  }


const mapStateToProps = (state) => {
  return { 
    username: state.auth.username, 
    role: state.auth.role,
    status: state.auth.status }
}

export default connect(mapStateToProps)(HomePage);

