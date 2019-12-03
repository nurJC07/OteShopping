import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {SideBar} from './SideBar';
import {Col, Button, CustomInput, FormGroup, FormText, Form,Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import {API_URL} from '../../supports/api_url'


class ManageProduct extends Component {
     state= { 
        productList: [],
        selectedProductId: 0, 
      
        value: '', 
        categoryList: [],
        listAllCategory: [],
        
        AddProductImage: 'Pilih Gambar', 
        EditProductImage: 'Pilih Gambar',

        activePage: 1, 
        tampilPerPage: 4, 
        totalItem: 0, 
        totalPage: null, 
        startIndex: 0, 
        finishIndex: 0, 
        listPage: []   
        
        }

        componentDidMount() {
            this.getProduct();
            this.getCategoryList();
    } 

    getProduct = () => {
        axios.get(API_URL +'/product/getlistproduct')
        .then((res) => {
            console.log(res.data.namaCategory)
            this.setState({
                productList: res.data,
                selectedProductId: 0 
            });  
            this.setState({totalItem: this.state.productList.length});
            //console.log(this.state.totalItem);
            this.setState({totalPage: Math.ceil(this.state.totalItem / this.state.tampilPerPage)}) 
           
          
        }).catch((err) => {
            console.log(err);
        })
        
    }
    renderPagination = () => {
        const pageNumber =[]
        if(this.state.totalPage !== null){
            for (let i = 1; i <= this.state.totalPage; i++) {
                pageNumber.push(i)
        }

        }
       

        var listPageJSX = pageNumber.map((item) => {

            
            return <li key={item} className="page-item" onClick={() => this.setState({activePage: item})}>
                <button className="page-link" >{item}</button></li>
        }) 
       
        return listPageJSX;
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
                this.setState({ productList: res.data });
                this.getProduct();
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

        axios.put(API_URL + '/product/editproduct/'+id, formData, headers)
        .then((res) => {
            alert("Edit Product Success")
            this.setState({ productList: res.data, 
            selectedProductId: 0 })
        })
        .catch((err) =>{
            console.log(err)
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

        var { activePage, tampilPerPage } = this.state
        var listJSX = this.state.productList.slice( (activePage-1)*tampilPerPage, (activePage*tampilPerPage)).map((item) => {

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
                    <td><button className="btn btn-primary" onClick={() => this.onBtnUpdateClick(item.id)} style={{ fontSize: "14px" }}><i className="fa fa-save fa-lg" aria-hidden="true"></i> Save</button></td>
                    <td><button className="btn btn-secondary" onClick={() => this.setState({ selectedProductId: 0 })}style={{ fontSize: "14px" }}><i className="fa fa-undo fa-lg" aria-hidden="true"></i> Cancel</button></td>                 
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
                        <td><button className="btn btn-success" onClick={() => this.setState({selectedProductId:item.id})} style={{ fontSize: "14px" }}><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i> Edit</button></td>
                    <td><button className="btn btn-danger" onClick={() => this.onBtnDeleteClick(item.id)} style={{ fontSize: "14px" }}><i className="fa fa-trash-o fa-lg" ></i> Delete</button></td>
               </tr>
            )
        })
        return listJSX;
    }


    render() {
        var { activePage, totalPage,productList } = this.state
        if(this.props.username !== "" && this.props.role==="Admin"){
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
                <th>Category </th>
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
            
            </table>
          
            </div>
            <div className= "mr-auto">
                        <button className="btn btn-info"  onClick={(e)=>{this.setState({isOpen:true})}}><i className="fa fa-align-justify fa-lg" ></i> Add New Product
                   </button> 
                        </div>
                       
            </div>
           
            <div>
             
            </div>
            <div>
           
            <Modal isOpen={this.state.isOpen} className={'modal-success ' + this.props.className}>
          <ModalHeader  
            toggle   = {(e) =>{this.setState({isOpen:true})}}
            onClick  ={(e)=>{this.setState({isOpen:false})}}>Add New Product</ModalHeader>
          <ModalBody> 
          <Form  className="form-horizontal">
          <FormGroup row>                  
          </FormGroup>
          <FormGroup row>
          <Col md="3">
          <Label htmlFor="text-input">Product Name</Label>
          </Col>
          <Col xs="12" md="9">
          <input type="text" ref="AddProductName" placeholder="Please Enter Product Name" />
          </Col>
        </FormGroup>               
        <FormGroup row>
        <Col md="3">
        <Label htmlFor="select">Category Type</Label>
        </Col>
        <Col xs="12" md="9">
        <select  ref="AddProductCategory" >
        <option value="">Select Category</option> {this.renderAllCategory()}
        </select>
        </Col>
        </FormGroup>  
        <FormGroup row>
        <Col md="3">
          <Label htmlFor="text-input">Value</Label>
        </Col>
        <Col xs="12" md="4">
          <input type="number" ref="AddProductPrice"  name="text-input"  /> 
        </Col>
      </FormGroup>                  
      <FormGroup row>
      <Col md="3">
        <Label htmlFor="text-input">Image</Label>
        </Col>
        <Col xs="12" md="4">
        <CustomInput type="file" id="AddProductImage" name="AddProductImage" label={this.state.AddProductImage} onChange={this.onAddFileImageChange} />
        </Col>
      </FormGroup>    
      <FormGroup row>
        <Col md="3">
          <Label>Description</Label>
        </Col>
        
        <Col xs="12" md="4">
        <textarea name="description" rows="5" cols="40" ref="AddProductDesc" />
        </Col>
          
        </FormGroup> 
        </Form>
          </ModalBody>
          <ModalFooter>
              <Button color="success" onClick={this.onBtnAddClick}>Create Alert</Button>{' '}
          </ModalFooter>
          </Modal>

            <div className="row">
                <div className="col">
            <ul className="pagination">
            <li className="page-item">
                        <button className="page-link" href="#" onClick={() => this.setState({activePage: 1})}><span aria-hidden="true">first</span></button>
                    </li>
                
                    <li className="page-item">
                        <button className="page-link" href="#" onClick={() => this.setState({activePage: activePage-1})}aria-label="Previous"><span aria-hidden="true">&laquo;</span></button>
                    </li>
                    {this.renderPagination()}
                    <li className="page-item">
                        <button className="page-link" href="#" aria-label="Next" onClick={() => this.setState({activePage: activePage+1})}><span aria-hidden="true">&raquo;</span></button>
                    </li>
                    <li className="page-item">
                        <button className="page-link" href="#" onClick={() => this.setState({activePage: totalPage})}aria-label="last"><span aria-hidden="true">last</span></button>
                    </li>
                    
                    
                    
                    
                </ul>
                </div>
                
            
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