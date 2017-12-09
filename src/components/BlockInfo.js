import React, { Component } from "react";
import Key from "./Key";

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
            <td>
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "200px", height: "100px" }}
                value={this.props.block.parentHash}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>+</td>
          </tr>
          <tr>
            <td>Coinbase Beneficiary</td>
            <td>
              <Key value={this.props.block.coinbaseBeneficiary} />
            </td>
          </tr>
          <tr>
            <td />
            <td>+</td>
          </tr>
          <tr>
            <td>Combined Transactions Hash </td>
            <td>
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "200px", height: "100px" }}
                value={this.props.block.combinedTransactionsHash()}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>+</td>
          </tr>
          <tr>
            <td>Nonce</td>
            <td>
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "200px", height: "100px" }}
                value={this.props.block.nonce}
                readOnly
              />
            </td>
            <td />
          </tr>
          <tr>
            <td />
            <td>) =</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>
              <textarea
                className="pt-input"
                spellCheck={false}
                style={{ width: "200px", height: "100px" }}
                value={this.props.block.hash}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
