import React from 'react';
import {Checkbox, Icon, Table} from 'semantic-ui-react';
import AddNewRole from './AddNewRole'
var temp = [];
export default class AclUI extends React.Component {
    constructor() {
        super();
        this.state = {

        };

    }

    render() {

        return (
            <div>
                <AddNewRole />

            </div>
        );
    }
} //end of class
