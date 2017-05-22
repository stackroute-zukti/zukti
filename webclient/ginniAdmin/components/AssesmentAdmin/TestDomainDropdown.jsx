import React from 'react';
import {Form, Dropdown, Input ,Grid} from 'semantic-ui-react';

export default class TestDomainDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleTestDomain = this.handleTestDomain.bind(this);
    }
    handleTestDomain(e, {value}) {
        this.props.handleTestDomain(value);
    }
    //Dropdown for testdomain
    render() {
        return (
          <Grid>
          <Grid.Row >
              <Grid.Column >
            <Form>
                <Form.Field >
                  <label>
                      <h4>Choose Test-Domain</h4>
                  </label>
                  <Input>
                      <Dropdown fluid options={this.props.TestDomain}
                       placeholder='Test Domain Name'
                        search selection onChange={this.handleTestDomain}
                        value={this.props.value}/>
                  </Input>
                </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
        );
    }
}
