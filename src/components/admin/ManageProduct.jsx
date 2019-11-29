import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {SideBar} from './SideBar'
import { CustomInput} from 'reactstrap';
import {API_URL} from '../../supports/api_url'


class ManageProduct extends Component {
     state= { 
        productList: [],
        selectedProductId: 0, 
      
        value: '', 
        categoryList: [],
        listAllCategory: [],
        
        AddProductImage: 'Pilih Gambar', 
        EditProductImage: 'Pilih Gambar' 
        
        }

        componentDidMount() {
            this.getProduct();
            this.getCategoryList();
    } 

    getProduct = () => {
        axios.get(API_URL +'/product/getlistproduct')
        .then((res) => {
            console.log(res.data)
            this.setState({
                productList: res.data,
                selectedProductId: 0 
            });   
          
        }).catch((err) => {
            console.log(err);
        })
        
    }

        getCategoryList = () => {
            axios.get(API_URL + '/category/getlistcategory')
            .then((res) => {
            console.log(res.data)
            this.setState({ 
                categoryList: res.data, 
                listAllCategory: res.data})
            }).catch((err) => {
            console.log (err)
            })
            }

        renderCategory = (categoryId) => {
            var listJSXCategory = this.state.categoryList.map((item) => {
                if(categoryId === item.categoryId) {
                    return item.namaCategory;
                } else return false;
            })
            return listJSXCategory;
        }
        
        
        renderAllCategory = () => {
            var listJSXAllCategory = this.state.listAllCategory.map((item) => {
                return (
                    <option key={item.id} value={item.namaCategory}>{item.namaCategory}</option>  
                )
            })
            return listJSXAllCategory;
        }

 

    onBtnAddClick = () => {
        if(document.getElementById("AddProductImage").files[0] !== undefined) {
            var formData = new FormData()
            var headers = {
                headers: 
                {'Content-Type': 'multipart/form-data'}
            }

            var data = {
                nama            : this.refs.AddProductName.value,
                harga           : this.refs.AddProductPrice.value,
                namaCategory    : this.refs.AddProductCategory.value,
                description     : this.refs.AddProductDesc.value,
            }

            if(document.getElementById('AddProductImage')){
                formData.append('image', document.getElementById('AddProductImage').files[0])
            }
            formData.append('data', JSON.stringify(data))

            axios.post(API_URL + '/product/addproduct', formData, headers)
            .then((res) => {
                alert("Add Product Success")
                this.setState({ productList: res.data })
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

    onBtnDeleteClick = (id) => {
        console.log(id)
        if(window.confirm('Are you sure to delete?')) {
            axios.delete(API_URL + '/product/deleteproduct/' + id)
            .then((res) => {
                alert('Delete Success');
                this.getProduct();
            })
            .catch((err) => {
                alert('Error, tidak berhasil delete')
                console.log(err);
            })
        }
    }

    onBtnUpdateClick = (id) => {
        console.log(id)
        var formData = new FormData()
        var headers = {
            headers: 
            {'Content-Type': 'multipart/form-data'}
        }

        var data = {
            nama            : this.refs.EditProductName.value,
            harga           : this.refs.EditProductPrice.value,
            namaCategory    : this.refs.EditProductCategory.value,
            description     : this.refs.EditProductDesc.value
        }

        if(document.getElementById('EditProductImage')){
            formData.append('image', document.getElementById('EditProductImage').files[0])
        }
        formData.append('data', JSON.stringify(data))
        console.log(data);
        
        axios.put(API_URL + '/product/editproduct/' + id, formData, headers)
        .then((res) => {
            console.log(data);
            alert("Edit Product Success")
            this.setState({ productList: res.data,
                 selectedProductId: 0 })
        })
        .catch((err) =>{
            console.log('data tidak terupdate')
        })
.catch((err) => {
        console.log(err);
    })
}


    onAddFileImageChange = () => {
        if(document.getElementById("AddProductImage").files[0] !== undefined) {
            this.setState({AddProductImage: document.getElementById("AddProductImage").files[0].name})
        }
        else {
            this.setState({AddProductImage: 'Pilih Gambar'})
        }
    }

    onEditFileImageChange = () => {
        if(document.getElementById("EditProductImage").files[0] !== undefined) {
            this.setState({EditProductImage: document.getElementById("EditProductImage").files[0].name})
        }
        else {
            this.setState({EditProductImage: 'Pilih Gambar'})
        }
    }


    renderProductList = () => {
        var listJSX = this.state.productList.map((item) => {
        if(item.id === this.state.selectedProductId) {
            return (
                <tr key={item.id}>
                        <td>{item.id}</td>          
                    <td><input type="text" ref="EditProductName" defaultValue={item.nama} /></td>
                    <td><select ref="EditProductCategory" className="custom-select" style={{ fontSize: "12px" }}>
                    <option defaultValue=""> {item.namaCategory}</option>
                            {this.renderAllCategory()}
                        </select></td>
                    <td><input type="number" ref="EditProductPrice" defaultValue={item.harga} /></td>
                    <td><CustomInput type="file" id="EditProductImage" name="EditProductImage" label={this.state.EditProductImage} onChange={this.onEditFileImageChange} /></td>
                    <td><textarea name="description" rows="5" cols="40" ref="EditProductDesc" defaultValue={item.description} /></td>
                    <td><input type="button" className="btn btn-primary" value="Save" onClick={() => this.onBtnUpdateClick(item.id)} /></td>
                    <td><input type="button" className="btn btn-primary" value="Cancel" onClick={() => this.setState({ selectedProductId: 0 })} /></td>
                </tr>
            )
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.namaCategory}</td>
                    <td>Rp. {item.harga.toLocaleString()}</td>
                    <td><img src={`${API_URL}${item.image}`} alt={item.nama}  width={100} /></td>
                    <td>{item.description}</td>
                    <td><input type="button" className="btn btn-primary" value="Edit" onClick={() => this.setState({selectedProductId:item.id})} /></td>
                    <td><input type="button" className="btn btn-danger" value="Delete" onClick={() => this.onBtnDeleteClick(item.id)} /></td>  
                </tr>
            )
        })
        return listJSX;
    }


    render() {
        if(this.props.username !== "" ){
        return (
            <div className="card bg-light" style={{ padding: "20px", fontSize: "13px" }}>
            <div className="row">
            <div className="col-lg-2" style={{ marginBottom: "20px" }}>
               <SideBar/> 
            </div>
            <div className="card bg-light col-10" style={{ padding: "20px" }}>
            <h4>Manage Product</h4>
            <hr/> 
            <div className="table-responsive card shadow p-3 mb-3 bg-white rounded">
            <div className="table-responsive-lg">
            <table className="table table-bordered table-hover">
            <thead className="thead-dark">
                <tr>
                <th>Id</th>
                <th>Nama </th>
                <th>Category</th>
                <th>Harga</th>
                <th>Image</th>
                <th>Description</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {this.renderProductList()}
            </tbody>
            <tfoot>
                <tr>
                <th scope="row"></th>
                    <td><input type="text" ref="AddProductName" /></td>
                    <td><select ref="AddProductCategory" className="custom-select" style={{ fontSize: "12px" }}> {this.renderAllCategory()} </select></td>                               
                    <td><input type="number" ref="AddProductPrice" /></td>
                    <td><CustomInput type="file" id="AddProductImage" name="AddProductImage" label={this.state.AddProductImage} onChange={this.onAddFileImageChange} /></td>
                    <td><textarea name="description" rows="5" cols="40" ref="AddProductDesc" /></td>
                    <td><input type="button" className="btn btn-success" value="Add" onClick={this.onBtnAddClick} /></td>
                    <td></td>
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
        
        

export default connect(mapStateToProps)(ManageProduct)
