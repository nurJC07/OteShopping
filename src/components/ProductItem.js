import React, { Component } from 'react';
import { connect } from 'react-redux';
import { select_product} from '../actions/ProductsActions';
// import styled from "styled-components";
import {API_URL} from '../supports/api_url'

class ProductItem extends Component {

    onItemClick = () => {
        this.props.select_product(this.props.product);
    }

    render() {
        const { image, nama, harga } = this.props.product;
        return (
            // <div className="col-6" style={{ marginBottom: 20 }}>
            // <div className="card">
            //     <div className="card-header">
            //     <div className="row">
            //         <div className="col-3">
            //         <img className="img-responsive" src={props.restaurant.thumb} alt="" style={{ borderRadius: 5, width: 100 }} ></img>
            //         </div>
            //         <div className="col-9">
            //         <h4 className="text-success" style={{ fontWeight: 800 }}>{props.restaurant.name}</h4>
            //         <h6>{props.restaurant.location.locality}</h6>
            //         <h6 className="text-muted">{props.restaurant.location.address}</h6>
            //         </div>
            //     </div>
            //     </div>
            <div className="col-10 mx-auto col-sm-8 col-md-6 col-lg-4 my-3">
            <div className="card">
              <div className="img-container" onClick={this.onItemClick}>
                <img
                  src={`${API_URL}${image}`}
                  className="card-img-top p-3"
                  alt="product"
                  style={{ height: "300px" }}
                />
                <div className="card-footer">    
                <div className="card-body justify-content-between" >
                <div className="text-uppercase font-weight-bold mb-0">{nama}</div>
                <p className="mb-0 text-main">Rp. {harga.toLocaleString()}</p>
               
              </div>
             
            </div>
        </div>
        </div>
        </div>
    );
          
    }
    
}


export default connect(null, { select_product })(ProductItem);

/* pada src, description dan nama ada proses descruction.
Seharusnya this.props.product.img, this.props.product.nama, this.props.product.description */


// const ProductWrapper = styled.div`
//   .card {
//     transition: var(--mainTransition);
//     box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.31);
//     height: 100%;
//   }
//   .card:hover {
//     box-shadow: 7px 10px 5px 0px rgba(0, 0, 0, 0.51);
//     cursor: pointer;
//   }

//   .card-img-top {
//     transition: var(--mainTransition);
//   }
//   .card:hover .card-img-top {
//     transform: scale(1.15);
//     opacity: 0.2;
//   }
//   .img-container {
//     position: relative;
//   }
//   .product-icons {
//     transition: var(--mainTransition);
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     opacity: 0;
//     .icon {
//       font-size: 2.5rem;
//       margin: 1rem;
//       padding: 0.5rem;
//       color: var(--primaryColor);
//       background: var(--mainBlack);
//       border-radius: 0.5rem;
//     }
//   }
//   .card:hover .product-icons {
//     opacity: 1;
//   }
//   .card-body {
//     transition: var(--mainTransition);
//     font-weight: bold;
//     font-size: 1.5rem;
//     letter-spacing: 1px;
//     text-transform: uppercase;
//   }
//   .card-body h3{
//     font-size: 1.5rem;
//     color: blue
//   }
//   .card-body p{
//     font-size: 1.5rem;
//   }
// `;