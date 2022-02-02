import React from 'react';
import './styles.css';
import ProductPage from './ProductPage';
import { Link } from "react-router-dom";
import {Navigate} from 'react-router-dom';



class CategoryProductsPage extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToPDP = this.redirectToPDP.bind(this);
    }

    redirectToPDP(singleProduct) {
        this.props.updateSelectedProduct(singleProduct);
    }

    render() {
        return (
            <div>
                <h2 className='categoryName'>Category Name</h2>
                <div className='productDisplay'>

                    {this.props.dataFetched.data.fetchReducer.allProducts.map((singleProduct) =>
                        <div onClick={() => this.redirectToPDP(singleProduct)}  key={singleProduct.id}>
                            <Link to="/product-page">

                                <div className="productItem">
                                    <div className="productImage">
                                        <img src={singleProduct.gallery[0]} alt="prod-image" />
                                    </div>
                                    <h1>{singleProduct.name}</h1>
                                    <p>${Math.floor(singleProduct.prices[0].amount)}</p>

                                </div>
                            </Link>
                        </div>
                    )}
                </div>

            </div>);
    }
}


export default CategoryProductsPage;