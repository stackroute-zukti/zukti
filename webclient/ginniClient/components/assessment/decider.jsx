//#Pradeep kumar.R(10-5-2017){Modal window for deciding the test type of assessment}
import React, {Component} from 'react'
import {
    Popup,
    Button,
    Header,
    Image,
    Modal,
    Icon,
    Grid,
    Card
} from 'semantic-ui-react'
import {hashHistory} from 'react-router';

class DecideDimmer extends Component {
    state = {
        open: true
    }

    show = (dimmer) => () => this.setState({dimmer, open: true})

    close()
    {
        window.location.reload();
    }
    render() {
        const {open, dimmer} = this.state

        return (
            <div>
                <Modal dimmer={dimmer} open={open} onClose={this.close.bind(this)} closeOnRootNodeClick={false} size="tiny" closeIcon='close' id='modallogincss'>
                    <Modal.Header>Decide Your Assessment Type Here</Modal.Header>
                    <Modal.Content image>

                        <Modal.Description>
                            <Grid columns={2} padded='horizontally'>
                                <Grid.Column>
                                    <Card.Group>

                                        <Card centered>
                                            <Card.Content>
                                                <Card.Header>
                                                    <Image shape='circular' wrapped size='small' src='../images/practest.jpg'/>
                                                    <strong>Practice </strong>
                                                    <br/>
                                                </Card.Header>
                                                <div className='carddisp'>
                                                    <Card.Description>
                                                        <br/>
                                                        Here a set of 5 questions will be given and results for that test will be displayed with graphical representation in dashboard
                                                        <br/>
                                                        <br/>
                                                    </Card.Description>
                                                </div>

                                            </Card.Content>
                                            <Card.Content extra>
                                                <div classname='buttoncenter'>

                                                    <a href="#assess">
                                                        <Button animated='fade' color='brown' floated='right'>
                                                            <Button.Content visible>Start</Button.Content>
                                                            <Button.Content hidden>
                                                                <Icon name='edit'/>
                                                            </Button.Content>
                                                        </Button>
                                                    </a>
                                                </div>

                                            </Card.Content>
                                        </Card>
                                    </Card.Group>

                                </Grid.Column>
                                <Grid.Column>
                                    <Card.Group>

                                        <Card centered>
                                            <Card.Content>
                                                <Card.Header>
                                                    <Image shape='circular' align='center' wrapped size='small' src='../images/taketest.jpg'/><br/>
                                                    <strong>Graded</strong>
                                                    <br/>
                                                </Card.Header>
                                                <div className='carddisp'>
                                                    <Card.Description><br/>
                                                        Here two options are available [TIME-Bound & TIME-UnBound] based on your selected choice test will be conducted
                                                        <br/>
                                                    </Card.Description>
                                                </div>
                                            </Card.Content>
                                            <Card.Content extra>
                                                <div classname='buttoncenter'>

                                                    <a href="#decider">
                                                        <Button animated='fade' align='center' color='teal' floated='right' onClick={this.props.restartQuiz}>
                                                            <Button.Content visible>Start</Button.Content>
                                                            <Button.Content hidden>
                                                                <Icon name='time'/>
                                                            </Button.Content>
                                                        </Button>
                                                    </a>
                                                </div>
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

export default DecideDimmer
