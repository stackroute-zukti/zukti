import React from 'react';
import {Label, Icon} from 'semantic-ui-react';
export default class SameAsIntents extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Label color='grey'>
          {this.props.intent}
        <Icon name='delete'/>
      </Label>
    );
  }
}
