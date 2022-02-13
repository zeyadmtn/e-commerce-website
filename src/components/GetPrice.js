import React from "react";

class GetPrice extends React.PureComponent {
  render() {
    return (
      <div>
        {this.props.singleProduct.prices
          .filter((price) => {
            return price.currency.symbol === this.props.currencySymbol;
          })
          .map((el, index) => {
            return (
              <div className="productPrice" key={index}>
                {el.currency.symbol}
                {el.amount.toFixed(2)}
              </div>
            );
          })}
      </div>
    );
  }
}

export default GetPrice;
