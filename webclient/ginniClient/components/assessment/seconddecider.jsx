//#Pradeep kumar.R(10-5-2017){Modal window for deciding the test type of assessment}
import React, {Component} from 'react'
import {Popup, Button, Header, Image, Modal} from 'semantic-ui-react'
import {hashHistory} from 'react-router';

class SecondDecider extends Component {
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
                    <Modal.Header>Timed test decider!</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='large' src='../images/timedtest.jpg'/>
                        <Modal.Description>
                            <p><strong>TIMEed Test</strong>:A time limit of 5 minutes will be given to you for the completetion of 10 questions on your selected domain REACT </p><br/>
                            <p><strong>TIMEless Test</strong>:No time limit is given to you for the completetion of 10 questions on your selected domain REACT </p><br/>

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <a href="#testinstruction">
                            <Button icon='time' color='red' onClick={this.close}>TIMEed('x' mins)</Button>
                        </a>

                        <a href="#timer1">
                            <Button color='blue' icon='time' labelPosition='left' onClick={this.close}>TIMEless</Button>
                        </a>

                        <br/>
                    </Modal.Actions>

                </Modal>
            </div>
        )
    }
}

export default SecondDecider
