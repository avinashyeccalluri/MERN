import React, {useEffect, useState} from 'react'
import { emptyCart, loadCart } from '../../admin/helper/cartHelper'
import { isAutheticated } from '../../auth/helper'
import {Link} from 'react-router-dom'

function StripeCheckout({ products, setReload = f => f, reload =undefined}) {

    const [data, setData] = useState({
        loading : false,
        success : false,
        error : "",
        address : ""
    })

    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;

    const getFinalPrice = ()=>{
        let amount = 0;
        products.map( p=>{
            amount+= p.price
        })
        return amount;
    }


    const showStripeButton = ()=>{
        return isAutheticated() ? (
            <button className="btn btn-success">Pay with stripe</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sign in</button>
            </Link>
        )
    }
    
    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout
