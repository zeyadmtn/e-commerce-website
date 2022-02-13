import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import activeCategoryAction from "../actions/activateCategoryAction";
import updateSelectedProductAction from "../actions/selectProductAction";
import GetPrice from "../components/GetPrice";
import "../styles/categoryPageStyles.css";

class CategoryProductsPage extends React.PureComponent {
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
        return this.props.allProducts;
      default:
        return this.props.allProducts.filter((item) => {
          return item.category === this.props.activeCategory;
        });
    }
  }

  render() {
    const filteredProducts = this.productCategoryFilter();
    return (
      <div>
        <h2 className="categoryName">
          {this.props.activeCategory.toUpperCase()}
        </h2>
        <div className="productDisplay">
          {filteredProducts.map((singleProduct) => (
            <div
              onClick={() => this.redirectToPDP(singleProduct)}
              key={singleProduct.id}
            >
              <Link to="/product-page">
                <div className="productItem">
                  <div className="productImage">
                    <img
                      className="productImage"
                      src={singleProduct.gallery[0]}
                      alt="prod-img"
                    />
                  </div>
                  <h1>{singleProduct.name}</h1>
                  <div className="productPrice">
                    <GetPrice
                      singleProduct={singleProduct}
                      currencySymbol={this.props.activeCurrencySymbol}
                    />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allProducts: state.fetchReducer.allProducts,
    activeCategory: state.activeCategoryReducer.activeCategory,
    activeCurrencySymbol: state.activeCurrencyReducer.activeCurrencySymbol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSelectedProduct: (selectedProduct) => {
      dispatch(updateSelectedProductAction(selectedProduct));
    },

    updateActiveCategory: (activeCategory) => {
      dispatch(activeCategoryAction(activeCategory));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryProductsPage);
