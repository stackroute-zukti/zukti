//#Pradeep kumar.R(10-5-2017){Modal window for deciding the test type of assessment}
import React, {Component} from 'react'
import {Popup, Button, Header, Image, Modal} from 'semantic-ui-react'
import {hashHistory} from 'react-router';

class TestInstruction extends Component {
    state = {
        open: true
    }

    show = (dimmer) => () => this.setState({dimmer, open: true})
    close = () => this.setState({open: false})

    render() {
        const {open, dimmer} = this.state

        return (
            <div>
                <Modal dimmer={dimmer} open={open} onClose={this.close} onMount={this.fetchValuesFromDatabase} closeOnRootNodeClick={false} size="tiny" closeIcon='close' id='modallogincss'>
                    <Modal.Header>Instructions!</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='large' src='../images/readins.jpg'/>
                        <Modal.Description>
                            <Header>Read the instructions below</Header>
                            <p>1.)Malpractice is strictly forbidden</p>
                            <p>2.)This is an ADAPTIVE TEST(User cannot return back to the attended questions again</p>
                            <p>3.)Usage of any type of electronic gadgets(pendrive,mobileb,bluetooth,etc.,)during the exam time</p>
                            <p>4.)Feel free to ask your doubts only to the examiner at any point of time during exam</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <a href="#timer">
                            <Button color='blue' icon='time' labelPosition='left' onClick={this.close}>Start Test</Button>
                        </a>

                        <br/>
                    </Modal.Actions>

                </Modal>
            </div>
        )
    }
}

export default TestInstruction
