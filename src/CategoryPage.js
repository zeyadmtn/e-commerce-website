import React from 'react';
import './categoryPageStyles.css';
import { Link } from "react-router-dom";
import GetPrice from './GetPrice';


class CategoryProductsPage extends React.Component {
    constructor(props) {
        super(props);

        this.redirectToPDP = this.redirectToPDP.bind(this);
        this.productCategoryFilter = this.productCategoryFilter.bind(this);
    }

    redirectToPDP(singleProduct) {
        this.props.updateSelectedProduct(singleProduct);
    }

    productCategoryFilter() {
        switch (this.props.activeCategory) {
            case "all":
                return this.props.dataFetched.data.fetchReducer.allProducts;
            default:
                return this.props.dataFetched.data.fetchReducer.allProducts.filter((item) => {
                    return item.category === this.props.activeCategory;
                })
        }
    }


    render() {
        const filteredProducts = this.productCategoryFilter();
        return (
            <div>
                <h2 className='categoryName'>{this.props.activeCategory.toUpperCase()}</h2>
                <div className='productDisplay'>

                    {filteredProducts.map((singleProduct) =>
                        <div onClick={() => this.redirectToPDP(singleProduct)} key={singleProduct.id}>
                            <Link to="/product-page">

                                <div className="productItem">
                                    <div className="productImage">
                                        <img className="productImage" src={singleProduct.gallery[0]} alt="prod-image" />
                                    </div>
                                    <h1>{singleProduct.name}</h1>
                                    <div className='productPrice'>
                                    
                                    <GetPrice singleProduct={singleProduct} currencySymbol={this.props.currencySymbol} />

                                </div>


                                </div>
                            </Link>
                        </div>
                    )}
                </div>

            </div>);
    }
}


export default CategoryProductsPage;