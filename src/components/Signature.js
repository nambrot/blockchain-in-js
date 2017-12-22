import React, { Component } from "react";
import { Icon, Button, Dialog } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/labs";
import AddIdentity from "./AddIdentity";
import { sign, verifySignature } from "../crypto";
import { state } from "../store";
import classnames from "classnames";
import Key from "./Key";
import {
  Tooltip,
  advanceTo,
  hideWalkthrough,
} from "./walkthrough";
export default class Signature extends Component {
  static defaultProps = {
    isEditable: true,
    signature: "",
    messageToSign: "",
    publicKey: "",
    onChangeSignature: () => {},
    onOpenSignatureDialog: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isAddingSignature: false,
      privateKey: ""
    };
  }
  openSignature = () => {
    this.setState({ isAddingSignature: true });
    this.props.onOpenSignatureDialog();
  };
  closeSignature = () => this.setState({ isAddingSignature: false });
  submitSignature = () => {
    this.props.onChangeSignature(this.calculatedSignature());
    this.closeSignature();
  };

  changePrivateKey = evt => {
    hideWalkthrough();
    this.setState({ privateKey: evt.target.value });
  };
  calculatedSignature() {
    return sign(this.props.messageToSign, this.state.privateKey);
  }
  isSignatureValid() {
    return verifySignature(
      this.props.messageToSign,
      this.props.signature,
      this.props.publicKey
    );
  }

  isCalculatedSignatureValid() {
    return verifySignature(
      this.props.messageToSign,
      this.calculatedSignature(),
      this.props.publicKey
    );
  }

  selectPrivateKey = privateKey => {
    return () => {
      advanceTo(12);
      this.setState({ privateKey });
    };
  };
  render() {
    return (
      <div>
        <div className="pt-control-group">
          <div className="pt-input-group">
            <textarea
              className={classnames("pt-input", {
                "pt-intent-danger": !this.isSignatureValid()
              })}
              placeholder="Signature"
              style={{
                height: "75px",
                width: "150px"
              }}
              readOnly={true}
              value={this.props.signature}
            />
            {this.props.isEditable && (
              <div className="pt-input-action">
                <Button
                  iconName="pt-icon-add"
                  className="pt-intent-primary"
                  text={this.props.signature === "" ? "Add" : "Update"}
                  onClick={this.openSignature}
                />
              </div>
            )}
          </div>
        </div>
        <Dialog
          isOpen={this.state.isAddingSignature}
          title="Add signature"
          onClose={this.closeSignature}
          style={{ width: "70%" }}
        >
          <div style={{ padding: "10px" }}>
            <p>
              Signatures are used to prove ownership over a public key. Only the
              corresponding private key can yield a valid signature. Updates to
              transaction data require an updated signature.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Public Key</th>
                  <th>Message to Sign</th>
                  <th />
                  <th>Private Key</th>
                  <th />
                  <th>Signature</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Key value={this.props.publicKey} />
                  </td>
                  <td>
                    <textarea
                      className="pt-input"
                      placeholder="Signature"
                      style={{
                        height: "75px",
                        width: "150px"
                      }}
                      readOnly={true}
                      value={this.props.messageToSign}
                    />
                  </td>
                  <td>+</td>
                  <td>
                    <Popover2 defaultIsOpen={true}>
                      <textarea
                        className="pt-input"
                        placeholder="Private Key"
                        style={{
                          height: "75px",
                          width: "150px"
                        }}
                        onChange={this.changePrivateKey}
                        value={this.state.privateKey}
                      />
                      <div style={{ padding: "10px" }}>
                      <Tooltip
                      content={
                        <p style={{ maxWidth: "250px" }}>
                         Pick the right private key for the originating public key
                        </p>
                      }
                      step={11}
                      nextButtonVisible={false}
                    >
                          <h6>Identities you control</h6>
                          </Tooltip>
                        {Object.values(state.identities).map(identity => {
                          return (
                            <a
                              key={identity.publicKey}
                              onClick={this.selectPrivateKey(
                                identity.privateKey
                              )}
                            >
                              <li>{identity.name}</li>
                            </a>
                          );
                        })}
                        <AddIdentity />
                      </div>
                    </Popover2>
                  </td>
                  <td>
                    <Icon iconName="pt-icon-arrow-right" />
                  </td>
                  <td>
                    <textarea
                      className="pt-input"
                      placeholder="Signature"
                      style={{
                        height: "75px",
                        width: "150px"
                      }}
                      value={this.calculatedSignature()}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="pt-dialog-footer">
              <div className="pt-dialog-footer-actions">
                <Button text="Cancel" onClick={this.closeSignature} />
                <Tooltip
                  content={
                    <p style={{ maxWidth: "250px" }}>Add the signature here.</p>
                  }
                  nextLabel="Update"
                  next={this.submitSignature}
                  step={12}
                >
                  <Button
                    iconName="pt-icon-add"
                    className="pt-intent-primary"
                    onClick={this.submitSignature}
                    text="Update Signature"
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
