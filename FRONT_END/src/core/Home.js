import React, {useState, useEffect} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false);

  const loadAllProducts = ()=>{
      getProducts().then(res =>{
        if(res.error){
          setError(true);
        }
        else{
          setProducts(res)
        }
      })
  }

  useEffect(()=>{
    loadAllProducts()
  }, [])
  

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row text-center">
        <h1 className="text-white">All of tshirts</h1>
          <div className="row">
            {products.map((product, index)=>{
              return(
                <div key={index} className="col-4 mt-4">
                  <Card product = {product}></Card>
                </div>
              )
            })}
          </div>
      </div>
    </Base>
  );
}
