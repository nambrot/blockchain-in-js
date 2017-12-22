import { state, action } from "../store";
import React, { Component } from "react";
import { Tooltip2 } from "@blueprintjs/labs";
import { Dialog, Button, Intent, Classes } from "@blueprintjs/core";
import classNames from "classnames";

function isAtStepAndActive(number) {
  return (
    state.walkthrough.enabled && state.walkthrough.show && isAtStep(number)
  );
}

export function isAtStep(number) {
  return state.walkthrough.step === number;
}

export function hideWalkthrough() {
  action({ type: "HIDE_WALKTHROUGH" });
}

export function disableWalkthrough() {
  action({ type: "DISABLE_WALKTHROUGH" });
}

export function advanceTo(step) {
  action({ type: "ADVANCE_WALKTHROUGH", step });
}

export class Tooltip extends Component {
  static defaultProps = {
    nextLabel: "Next",
    nextButtonVisible: true,
    quitWalkthroughVisible: false
  };
  next = () => {
    if (this.props.next !== undefined) this.props.next();
    else advanceTo(this.props.step + 1);
  };
  render() {
    return (
      <Tooltip2
        isOpen={isAtStepAndActive(this.props.step)}
        content={
          <div>
            <button
              aria-label="Hide"
              title="Hide"
              className={classNames(
                Classes.DIALOG_CLOSE_BUTTON,
                Classes.iconClass("small-cross")
              )}
              style={{ float: "right", padding: "0px 0px 6px 6px" }}
              onClick={hideWalkthrough}
            />
            <div>{this.props.content}</div>
            {this.props.nextButtonVisible && (
              <div className="pt-dialog-footer">
                <div className="pt-dialog-footer-actions">
                  <Button
                    intent={Intent.PRIMARY}
                    onClick={this.next}
                    text={this.props.nextLabel}
                  />
                  {this.props.quitWalkthroughVisible && (
                    <Button
                      intent={Intent.WARNING}
                      onClick={disableWalkthrough}
                      text="Quit"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        }
      >
        {this.props.children}
      </Tooltip2>
    );
  }
}

class WalkthroughDialog extends Component {
  static defaultProps = {
    nextLabel: "Next",
    quitWalkthroughVisible: false
  };
  render() {
    return (
      <Dialog
        isOpen={isAtStepAndActive(this.props.step)}
        onClose={advanceTo.bind(this, this.props.step + 1)}
        {...this.props}
      >
        <div>
          <div style={{ padding: "10px" }}>{this.props.children}</div>

          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button
                intent={Intent.PRIMARY}
                onClick={advanceTo.bind(this, this.props.step + 1)}
                text={this.props.nextLabel}
              />
              {this.props.quitWalkthroughVisible && (
                <Button
                  intent={Intent.WARNING}
                  onClick={disableWalkthrough}
                  text="Quit"
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export { WalkthroughDialog as Dialog };
