//#Pradeep kumar.R(10-5-2017){Modal window for deciding the test type of assessment}
import React, {Component} from 'react'
import {
    Popup,
    Button,
    Header,
    Image,
    Modal,
    Icon,
    Card
} from 'semantic-ui-react'
import {hashHistory} from 'react-router';

class TestInstruction extends Component {
    state = {
        open: true
    }

    show = (dimmer) => () => this.setState({dimmer, open: true})
    close() {
        hashHistory.push('/chat/react');
    }

    render() {
        const {open, dimmer} = this.state

        return (
            <div>
                <Modal dimmer={dimmer} open={open} onClose={this.close.bind(this)} onMount={this.fetchValuesFromDatabase} closeOnRootNodeClick={false} size="tiny" closeIcon='close' id='modallogincss'>
                    <Modal.Header>Instructions!</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='large' src='../images/readins.jpg'/>
                        <Modal.Description>
                            <Card fluid color='orange'>
                                <Card.Content>

                                    <div className='carddisp'>
                                        <Card.Description>
                                            <Header>Read the instructions below carefully:</Header>
                                            <p>1.)Malpractice is strictly prohibited.</p>
                                            <p>2.)This is an SINGLE WAY test(User cannot return back to the attended questions again).</p>
                                            <p>3.)Usage of any type of electronic gadgets(pendrive,mobileb,bluetooth,etc.,)during the exam time is an punishable offence.</p>
                                            <p>4.)Feel free to ask your doubts only to the examiner at any point of time during exam.</p>
                                            <br/>
                                        </Card.Description>
                                    </div>
                                </Card.Content>
                                <Card.Content extra>
                                    <a href="#timer">
                                        <Button animated='fade' color='blue' floated='right' onClick={this.props.restartQuiz}>
                                            <div clasName='buttoncenter'>
                                                <Button.Content visible>Start</Button.Content>
                                            </div>
                                            <Button.Content hidden>
                                                <Icon name='edit'/>
                                            </Button.Content>
                                        </Button>
                                    </a>

                                </Card.Content>
                            </Card>
                        </Modal.Description>

                    </Modal.Content>

                </Modal>
            </div>
        )
    }
}

export default TestInstruction
