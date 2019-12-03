import React, { Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {SideBar} from './SideBar'
import {API_URL} from '../../supports/api_url'
import moment from 'moment';

class ManageHistory extends Component {
    state= { 
        historyList: [],
    }

    componentDidMount() {
        axios.get(API_URL + '/transaction/getlisthistory')
        .then((res) => {
        console.log(res.data)
        this.setState({ historyList: res.data})
        }).catch((err) => {
        console.log (err)
        })
        }
     
    renderHistoryList = () => {
        var listJSX = this.state.historyList.map((item,index) => {
            return (
                <tr key={index}>
                <td>{item.trxId}</td>
                <td>{item.username}</td>
                <td>Rp. {item.totalPrice.toLocaleString()}</td>
                <td>{item.totalQty}</td>
                <td>{moment(item.trxDate).format('DD MMM Y')}</td>
                <td>{moment(item.payDate).format('DD MMM Y')}</td>
                <td>{item.status}</td>
            </tr> 
            )   
        })
            return listJSX   
        }

    render() {
        if(this.props.username !== "" && this.props.role==="Admin"){
        return ( 
            <div className="card bg-light" style={{ padding: "20px", fontSize: "13px" }}>
            {/* <style>{"tr{border-top: hidden;}"}</style> */}
            <div className="row">
            <div className="col-lg-2" style={{ marginBottom: "20px" }}>
            <SideBar/>         
            </div>
            <div className="card bg-light col-10" style={{ padding: "20px" }}>
            <h4>Manage History</h4>
            <hr/>        
            <div className="table-responsive card shadow p-3 mb-5 bg-white rounded">
            <table className="table">
            <thead className="thead-dark">
          
            <tr>
                <th>trxId</th>
                <th>Username</th>
                <th>Total Price</th>
                <th>Total Qty</th>
                <th>Transaction Date</th>
                <th>Payment Date</th>  
                <th>Status</th>
                </tr>
                </thead>
            <tbody>  
            {this.renderHistoryList()}
            </tbody>
        </table>                
            </div>
            </div>
            </div>
            </div>
            
          
            );
        }
        return <Redirect to ='/login'/>
            }
        }
        const mapStateToProps = (state) => {
            return { 
                username: state.auth.username,
                role: state.auth.role
            };
        }
        
        

export default connect(mapStateToProps)(ManageHistory)
