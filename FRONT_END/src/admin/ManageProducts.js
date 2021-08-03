import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base'
import { getProducts, deleteProduct } from './helper/adminapicall';
function ManageProducts() {

    const [products, setProducts]= useState([]);
    const {user, token} = isAutheticated();

    useEffect(()=>{
      preLoad()
    },[])

    const preLoad = ()=>{
      getProducts().then((response)=>{
        if(response.error){
          console.log(response.error);
        }
        else{
          setProducts(response)
        }
      })
    }

    const deleteAProduct = (productId)=>{
      deleteProduct(productId, user._id, token).then((response)=>{
        if(response.error){
          console.log(response.error);
        }
        else{
          preLoad()
        }
      })
    }
    
    return (
    <Base title="Welcome admin" description="Manage products here">
    <h2 className="mb-4">All products:</h2>
    <Link className="btn btn-info" to={`/admin/dashboard`}>
      <span className="">Admin Home</span>
    </Link>
    <div className="row">
      <div className="col-12">
        <h2 className="text-center text-white my-3">Total {products.size} products</h2>
        {products.map((product, index)=>{
          return(
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {deleteAProduct(product._id)}} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  </Base>
    )
}

export default ManageProducts
