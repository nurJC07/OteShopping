import React, { Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {SideBar} from './SideBar';
import {API_URL} from '../../supports/api_url'
import { CustomInput } from 'reactstrap';


class ManageCategory extends Component {
    state= { 
        categoryList: [],
        AddCategoryImage: 'Choose Image',
        EditCategoryImage: 'Choose Image',
        selectedCategoryId: 0,
       }

    componentDidMount() {
        this.getCategoryList();
        }
     
    getCategoryList = () => {
        axios.get(API_URL + '/category/getlistcategory')
        .then((res) => {
        console.log(res.data)
        this.setState({ categoryList: res.data})
        }).catch((err) => {
        console.log (err)
        })
        }
    
    onBtnAddClick = () => {
        if(document.getElementById("AddCategoryImage").files[0] !== undefined) {
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            namaCategory: this.refs.AddCategory.value,
        }

        if(document.getElementById('AddCategoryImage')){
            formData.append('image', document.getElementById('AddCategoryImage').files[0])
        }
        formData.append('data', JSON.stringify(data))

        axios.post(API_URL + '/category/addcategory/', formData, headers)
        .then((res) => {
            alert("Add Category Image Success")
            this.setState({ categoryList: res.data })
            console.log(data)
        })
        .catch((err) =>{
            console.log(err)
        })
        }
        else {
            alert('Image harus diisi!')
        }
    }
    
    onBtnUpdateClick = (id) => {
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }
        var data = {
            namaCategory: this.refs.EditCategory.value,
        }

        if(document.getElementById('EditCategoryImage')){
            formData.append('image', document.getElementById('EditCategoryImage').files[0])
            }
            formData.append('data', JSON.stringify(data))

        axios.put(API_URL + '/category/editcategory/'+id, formData, headers)
        .then((res) => {
            alert("Edit Category Success")
            this.setState({ categoryList: res.data, 
            selectedCategoryId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }
    onAddFileImageChange = () => {
        if(document.getElementById("AddCategoryImage").files[0] !== undefined) {
            this.setState({AddCategoryImage: document.getElementById("AddCategoryImage").files[0].name})
        }
        else {
            this.setState({AddCategoryImage: 'Choose Image'})
        }
    }

    onEditFileImageChange = () => {
        if(document.getElementById("EditCategoryImage").files[0] !== undefined) {
            this.setState({EditCategoryImage: document.getElementById("EditCategoryImage").files[0].name})
        }
        else {
            this.setState({EditCategoryImage: 'Choose Image'})
        }
    }

    onBtnDeleteClick = (id) => {
        if(window.confirm('Are sure want to delete this item?')){
            axios.delete(API_URL + '/category/deletecategory/' + id)
            .then((res) => {
                this.getCategoryList();
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
   
    renderCategoryList = () => {
        var listJSX = this.state.categoryList.map((item) => {
            if(item.id !== this.state.selectedCategoryId) {
                return (
                    <tr key={item.id}>        
                        <td>{item.id}</td>
                        <td>{item.namaCategory}</td>
                        <td><img src={`${API_URL}${item.image}`} alt={item.nama} width={100} /></td>
                        <td><button className="btn btn-success" onClick={() => this.setState({ selectedCategoryId: item.id })} style={{ fontSize: "14px" }}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i> Edit</button></td>
                        <td><button className="btn btn-danger"onClick={() => this.onBtnDeleteClick(item.id)} style={{ fontSize: "14px" }}><i className="fa fa-trash-o fa-lg" ></i> Delete</button></td>
                    </tr>
                )
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td><input type="text" ref="EditCategory" defaultValue={item.namaCategory} /></td>
                    <td><CustomInput type="file" id="EditCategoryImage" name="EditCategoryImage" label={this.state.EditCategoryImage} onChange={this.onEditFileImageChange} /></td>
                    <td><img src={`${API_URL}${item.image}`} alt={item.nama} width={100} /></td>
                    <td><button className="btn btn-primary" onClick={() => this.onBtnUpdateClick(item.id)} style={{ fontSize: "14px" }}><i className="fa fa-save fa-lg" aria-hidden="true"></i> Save</button></td>
                    <td><button className="btn btn-secondary"  onClick={() => this.setState({selectedCategoryId:0})}style={{ fontSize: "14px" }}><i className="fa fa-undo fa-lg" aria-hidden="true"></i> Cancel</button></td>
                </tr>
            )
        })
        return listJSX;
    }
      
    render() {
        if(this.props.username !== "" ){
        return ( 
            <div className="card bg-light" style={{ padding: "20px", fontSize: "13px" }}>
            {/* <style>{"tr{border-top: hidden;}"}</style> */}
            <div className="row">
            <div className="col-lg-2" style={{ marginBottom: "20px" }}>
            <SideBar/>
            </div>
            <div className="card bg-light col-10" style={{ padding: "20px" }}>
            <h4>Manage Category</h4>
            <hr/>        
            <div className="table-responsive card shadow p-3 mb-3 bg-white rounded">
            <div className="table-responsive-lg">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
            <tr>
                <th>Id</th>
                <th>Category</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
               
            </tr>
            </thead>
            <tbody>
                {this.renderCategoryList()}
            </tbody>
            <tfoot>
                <tr>
                <td></td>
                    <td><input type="text" ref="AddCategory" /></td>
                    <td><CustomInput type="file" id="AddCategoryImage" name="AddCategoryImage" label={this.state.AddCategoryImage} onChange={this.onAddFileImageChange} /></td>
                    <td></td>
                    <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
            </tr>
            </tfoot>
            </table>
           
            </div>
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
        
        

export default connect(mapStateToProps)(ManageCategory)
