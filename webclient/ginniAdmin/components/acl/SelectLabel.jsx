import React from 'react';
import {
    Button,
    Segment,
    Form,
    Header,
    Modal,
    Input,
    Icon,
    Grid,
    Label,
    Table,
    Checkbox,
    Dropdown
} from 'semantic-ui-react';

export default class SelectedLabel extends React.Component {
    constructor(props) {
        super(props);
this.state={default:true};
this.deleteLabel=this.deleteLabel.bind(this);
}
deleteLabel()
{
this.props.toDelete(this.props.resource);
this.setState({default:true});
}
    render() {
        return (
            <div>
              <Label color='olive' size="large">
                        {this.props.resource}
                      <Icon color='red' onClick={this.deleteLabel} name='delete'/>
                    </Label>
            </div>
        );
    }
}
