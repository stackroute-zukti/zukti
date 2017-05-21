import React from 'react';
import {Form, Dropdown, Input ,Grid} from 'semantic-ui-react';

export default class TestConceptDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleTestConcept = this.handleTestConcept.bind(this);
    }

    handleTestConcept(e, {value}) {
        this.props.handleTestConcept(value);
    }
    // Dropdown for testconcept
    render() {
        return (
          <Grid>
          <Grid.Row >

              <Grid.Column>
            <Form>
                <Form.Field >
                  <label>
                      <h4>Choose Test-Concept</h4>
                  </label>
                  <Input>
                      <Dropdown fluid options={this.props.TestConcept}
                       placeholder=' Test Concept Name'
                        search selection onChange={this.handleTestConcept}
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
