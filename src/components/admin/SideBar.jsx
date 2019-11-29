import React, { Component } from 'react'

export class SideBar extends Component {
    render() {
        return (
            <div>
              <div className="list-group">
                <a href="/admin/dashboard" className="list-group-item active">Dashboard</a>
                    <a href="/admin/manageproducts" className="list-group-item">Manage Products</a>
                    <a href="/admin/manageusers" className="list-group-item">Manage Users</a>
                    <a href="/admin/managecategory" className="list-group-item">Manage Category</a>
                    <a href="/admin/verifyorder" className="list-group-item">Verify Order</a>
                    <a href="/admin/managehistory" className="list-group-item">Manage History</a>
                </div>  
            </div>
        )
    }
}

export default SideBar
