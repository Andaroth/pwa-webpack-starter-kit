import { PageViewElement } from '@components/page-view-element';
import { customElement, property } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';

// This element is connected to the Redux store.
import { RootState, store } from '@store';

// These are the actions needed by this element.
import { decrement, increment } from '@actions/counter';

// We are lazy loading its reducer.
import counter from '@reducers/counter';
store.addReducers({ counter });

import styles from './my-view2.styles';
import template from './my-view2.template';

// These are the shared styles needed by this element.
import sharedStyles from '@components/shared.styles';

@customElement('my-view2')
export class MyView2 extends connect(store)(PageViewElement) {
  public static styles = [sharedStyles, styles];

  @property({type: Number})
  protected _clicks = 0;

  @property({type: Number})
  protected _value = 0;

  // This is called every time something is updated in the store.
  public stateChanged(state: RootState) {
    this._clicks = state.counter!.clicks;
    this._value = state.counter!.value;
  }

  protected _counterIncremented() {
    store.dispatch(increment());
  }

  protected _counterDecremented() {
    store.dispatch(decrement());
  }

  protected render() {
    return template.call(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-view2': MyView2;
  }
}
