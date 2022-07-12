import React from 'react';

class Checkout extends React.Component {
  render() {
    return (
      <>
        <label htmlFor="checkout-fullname">
          Nome Completo:
          <input type="text" data-testid="checkout-fullname" id="checkout-fullname" />
        </label>

        <label htmlFor="checkout-email">
          Email:
          <input type="email" data-testid="checkout-email" id="checkout-email" />
        </label>

        <label htmlFor="checkout-cpf">
          CPF:
          <input type="text" data-testid="checkout-cpf" id="checkout-cpf" />
        </label>

        <label htmlFor="checkout-phone">
          Telefone:
          <input type="text" data-testid="checkout-phone" id="checkout-phone" />
        </label>

        <label htmlFor="checkout-cep">
          CEP:
          <input type="text" data-testid="checkout-cep" id="checkout-cep" />
        </label>

        <label htmlFor="checkout-address">
          Endereço:
          <input type="text" data-testid="checkout-address" id="checkout-address" />
        </label>
      </>

    );
  }
}

export default Checkout;
