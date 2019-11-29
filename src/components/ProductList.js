import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProductItem from './ProductItem';
import {API_URL} from '../supports/api_url';
import { InputGroup, Row, Col } from 'reactstrap';


class ProductList extends Component {
     state= { 
        productList: [],
        selectedProductId: 0, 
        searchListProduct: [], 
        filterForm: '', 
        value: '', 
        categoryList: [],
        listAllCategory: [],
        categoryId: 0
        }

        componentDidMount() {
            axios.get(API_URL +'/product/getlistproduct')
            .then((res) => {
                console.log(res.data)
                this.setState({
                    productList: res.data,
                    searchListProduct: res.data, 
                    selectedProductId: 0 
                }); 
                this.getCategoryList();
                
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
                if(categoryId === item.id) {
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

        onSearch = () => {
            var namaCategory = this.refs.categorySearch.value;
            var nama = this.refs.namaSearch.value
            var hargaMin = parseInt(this.refs.HargaMinSearch.value);
            var hargaMax = parseInt(this.refs.HargaMaxSearch.value);

            var arrSearch = this.state.productList.filter((item) => {
                return  item.nama.toLowerCase().includes(nama.toLowerCase())
                        &&  item.harga >= hargaMin
                        &&  item.harga <= hargaMax
                        &&  item.namaCategory.includes(namaCategory)
            })
                    this.setState({ searchListProduct: arrSearch })   
        }


  renderListProduct = () => {
    var listJSXProduk = this.state.searchListProduct.map((item) => {
        return (
            <ProductItem  key={item.id} product={item} />
        )   
    })
    return listJSXProduk;
}

    render (){
        if(this.props.username !== "" && this.props.status!=="Admin" && this.props.status ==="Verified"){
     
        if(this.props.product.id !== 0) {
       
            return <Redirect to = {`/ProductDetail?product_id=${this.props.product.id}`}/>
        
        }
        return (
            <div>
            <section className="bg-light" id="portfolio">
            <div className="container">
            <div className="row">
            <div className="col mt-3 mx-auto">
            <form id="searchForm">
            <Row>
            <Col lg="2">
                <select ref="categorySearch" className="custom-select" style={{ fontSize: "12px" }}
                onChange={() => {this.onSearch()}}>
                    <option value="">All Category</option>
                    {this.renderAllCategory()}
                </select>
            </Col>
            <Col lg="2">
                <input type="text" className="form-control" 
                placeholder="Search" style={{ fontSize: "12px" }}
                ref="namaSearch" onKeyUp={() => {this.onSearch()}} />
            </Col>
            <Col lg="3">
            <InputGroup>
                <div className="input-group-prepend">
                <div className="input-group-text" style={{ fontSize: "12px" }}>Rp</div>
                </div>
                <input type="number" className="form-control" 
                ref="HargaMinSearch" defaultValue="0" style={{ fontSize: "12px" }}
                onKeyUp={() => {this.onSearch()}} />
            </InputGroup>
            </Col>
            <Col lg="3">
            <InputGroup>
                <div className="input-group-prepend">
                <div className="input-group-text" style={{ fontSize: "12px" }}>Rp</div>
                </div>
                <input type="number" className="form-control" 
                ref="HargaMaxSearch" defaultValue="99999999" style={{ fontSize: "12px" }} 
                onKeyUp={() => {this.onSearch()}} />
            </InputGroup>
            </Col>
            </Row>
            </form>
            </div>
            </div>
            <div className="row">
            <div className="col-lg-12 text-center"></div>
            { this.renderListProduct()}  
            </div>     
             </div> 
            </section>
            </div>           
  );
}

return <Redirect to ='/login'/>
    }
}


const mapStateToProps = (state) => {
  return {
    username : state.auth.username, 
    status: state.auth.status,
    role : state.auth.status,
    product : state.selectedProduct}
}


export default connect (mapStateToProps)(ProductList);