//#Pradeep kumar.R(10-5-2017){Modal window for deciding the test type of assessment}
import React, {Component} from 'react'
import {
    Popup,
    Button,
    Header,
    Image,
    Modal,
    Grid,
    Icon,
    Card
} from 'semantic-ui-react'
import {hashHistory} from 'react-router';

class SecondDecider extends Component {
    state = {
        open: true
    }

    show = (dimmer) => () => this.setState({dimmer, open: true})
    //close = () => this.setState({open: false})
    close() {
        hashHistory.push('/chat/react');
    }

    render() {
        const {open, dimmer} = this.state

        return (
            <div>
                <Modal dimmer={dimmer} open={open} onClose={this.close.bind(this)} onMount={this.fetchValuesFromDatabase} closeOnRootNodeClick={false} size="tiny" closeIcon='close' id='modallogincss'>
                    <Modal.Header>Timed Test Decider</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Grid columns={2} padded='horizontally'>
                                <Grid.Column>
                                    <Card.Group>
                                        <Card centered>
                                            <Card.Content>
                                                <Card.Header>
                                                    <Image shape='circular' wrapped size='small' src='../images/timedtest.jpg'/>
                                                 <br/><strong>TIME-Bounded </strong>
                                                    <br/>
                                                </Card.Header>
                                                <div className='carddisp'>
                                                    <Card.Description>
                                                        <br/>
                                                        A time limit will be given to you for the completetion of given 5 questions on your selected domain REACT
                                                        <br/>
                                                        <br/>
                                                    </Card.Description>
                                                </div>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <a href="#testinstruction">
                                                    <Button animated='fade' color='red' floated='right' onClick={this.props.restartQuiz}>
                                                        <Button.Content visible>Start</Button.Content>
                                                        <Button.Content hidden>
                                                            <Icon name='hourglass start'/>
                                                        </Button.Content>
                                                    </Button>
                                                </a>

                                            </Card.Content>
                                        </Card>
                                    </Card.Group>

                                </Grid.Column>
                                <Grid.Column>
                                    <Card.Group>

                                        <Card centered>
                                            <Card.Content>
                                                <Card.Header>
                                                    <Image shape='circular' align-items='centered' wrapped size='small' src='../images/notime.jpg'/><br/>
                                                    <strong>TIME-UnBounded </strong>
                                                    <br/>
                                                </Card.Header>
                                                <div className='carddisp'>
                                                    <Card.Description><br/>
                                                        No time limit is given to you for the completetion of 5 questions on your selected domain REACT
                                                        <br/><br/>
                                                    </Card.Description>
                                                </div>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <a href="#timer1">
                                                    <Button animated='fade' color='blue' floated='right' onClick={this.props.restartQuiz}>
                                                        <Button.Content visible>Start</Button.Content>
                                                        <Button.Content hidden>
                                                            <Icon name='hourglass empty'/>
                                                        </Button.Content>
                                                    </Button>
                                                </a>
                                            </Card.Content>

                                        </Card>
                                    </Card.Group>

                                </Grid.Column>
                            </Grid>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>

                        <br/>
                    </Modal.Actions>

                </Modal>
            </div>
        )
    }
}

export default SecondDecider
