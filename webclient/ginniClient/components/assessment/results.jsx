import React from 'react';
import {
    Card,
    Button,
    Segment,
    Grid,
    Table,
    Header,
    Label,
    Icon
} from 'semantic-ui-react';
import ResultPie from './resultpie';
import tally from './helpers/tally';
var triesTotal = [0];
var temp = 0;
export default class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleMount = this.handleMount.bind(this);
    }
    componentWillMount()
    {
        this.handleMount();
    }
    handleMount = function handleMount() {
        // body...
        triesTotal = tally(this.props.userAnswers);
        temp = this.props.flukeCount(triesTotal[3], triesTotal[4]);
    }
    render() {
        let tries1 = 0;
        let tries2 = 0;
        let tries3 = 0;
        let tries4 = 0;
        if (triesTotal[1])
            tries1 = triesTotal[1];
        if (triesTotal[2])
            tries2 = triesTotal[2];
        if (triesTotal[3])
            tries3 = triesTotal[3];
        if (triesTotal[4])
            tries4 = triesTotal[4];
        return (
            <div >
                <Card raised centered>
                    <Card.Content extra>
                        <Segment inverted fluid>
                            <Header as='h4' inverted color='teal'>Assessment Result</Header>
                        </Segment>
                        <Table color='violet' inverted>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>User Name</Table.Cell>
                                    <Table.Cell>{this.props.firstname}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Domain Name</Table.Cell>
                                    <Table.Cell>React</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                        {this.props.flag1 == 'practice'
                            ? <div>
                                    <ResultPie tries={triesTotal}/></div>

                            : ''}

                        <Label align='center' inverted color='purple'>Your total Score is:{this.props.score}/{this.props.totalQuestions}</Label>
                    </Card.Content>

                    <Card.Content extra>
                        <div >
                            <a href="#/chat/react">
                                <Button animated='fade' color='teal'>
                                    <Button.Content visible>End Assessment</Button.Content>
                                    <Button.Content hidden><Icon name='power'/></Button.Content>
                                </Button>
                            </a>
                            <a>
                                <Button animated='fade' color='teal' floated='right' onClick={this.props.restartQuiz}>
                                    <Button.Content visible>Restart</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='repeat'/>
                                    </Button.Content>
                                </Button>
                            </a>
                        </div>
                    </Card.Content>

                </Card>
            </div>

        );
    }
}
