import React from 'react';
import {Form, Dropdown, Input ,Grid} from 'semantic-ui-react';

export default class TestQuestionDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleTestQuestion = this.handleTestQuestion.bind(this);
    }
    handleTestQuestion(e, {value}) {
        this.props.handleTestQuestion(value);
    }
    // Dropdown for TestQuestion
    render() {
        return (
          <Grid>
          <Grid.Row >
              <Grid.Column>
                <Form>
                  <Form.Field >
                    <label>
                      <h4>Choose Test-Question</h4>
                    </label>
                    <Input>
                      <Dropdown fluid options={this.props.TestQuestion}
                       placeholder='Test Questions'
                        search selection onChange={this.handleTestQuestion}
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
