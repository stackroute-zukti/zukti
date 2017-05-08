import React from 'react';
import Embedly from 'react-embedly';

export default class UnfurlLink extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Embedly url={this.props.url} apiKey="ff6dc30026d7471787fd22c4bc23eef6"/>
    );
  }
}
