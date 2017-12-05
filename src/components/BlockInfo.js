import React, { Component } from "react";

export default class BlockInfo extends Component {
  render() {
    return (
      <table className="pt-table .modifier">
        <tbody>
          <tr>
            <td />
            <td>SHA256(</td>
          </tr>
          <tr>
            <td>Parent Hash</td>
            <td>"{this.props.block.parentHash}"</td>
          </tr>
          <tr>
            <td />
            <td>+</td>
          </tr>
          <tr>
            <td>Coinbase Beneficiary</td>
            <td>"{this.props.block.coinbaseBeneficiary}"</td>
          </tr>
          <tr>
            <td />
            <td>+</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>"{this.props.block.nonce}"</td>
            <td />
          </tr>
          <tr>
            <td />
            <td>) =</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>"{this.props.block.hash}"</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
