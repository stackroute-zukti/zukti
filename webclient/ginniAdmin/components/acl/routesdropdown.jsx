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

import SelectedLabel from './SelectLabel.jsx';
export default class RoutesDropDown extends React.Component {
    constructor(props) {
        super(props);
this.dropdownSelectRoutes=this.dropdownSelectRoutes.bind(this);
this.deleteLabel=this.deleteLabel.bind(this);
}

dropdownSelectRoutes(e,data){
this.props.selectedRoutes(e,data);
}
deleteLabel(data){
this.props.toDelete(data);
}
    render() {
var text=this.props.ResourceSelected.map((data,index)=>{
return <SelectedLabel resource={data} toDelete={this.deleteLabel}/>
})

        return (
            <div>
            {text}
            <Dropdown placeholder='Select resources'   onChange={this.dropdownSelectRoutes} fluid multiple search selection options={this.props.routes}/>
            </div>
        );
    }
}
