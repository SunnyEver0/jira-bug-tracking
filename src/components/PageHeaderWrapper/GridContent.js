import React, { PureComponent } from 'react';
import styles from './GridContent.less';

export class GridContent extends PureComponent {
  render() {
    const { contentWidth, children } = this.props;
    return <div className={`main${contentWidth === 'Fixed' ? ' wide' : ''}`}>{children}</div>;
  }
}
