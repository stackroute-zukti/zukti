//#Pradeep kumar.R(10-5-2017){Modal window for deciding the test type of assessment}
import React, {Component} from 'react'
import {Popup, Button, Header, Image, Modal} from 'semantic-ui-react'
import {hashHistory} from 'react-router';


class ModalExampleDimmer extends Component {
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
                    <Modal.Header>All the best!</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='large' src='../images/taketest.jpg'/>
                        <Modal.Description>
                            <Header>Decide your assessment type here</Header>
                            <p>
                                <strong>Practice Test:</strong>Here a set of 5 questions will be given and results for that test will be displayed with graphical representation in dashboard
                            </p><br/>
                            <p>
                                <strong>Take test:</strong>Here two options are available[TIMEbound & TIMEless] based on your choice test will be conducted</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                     <a href="#assess">   <Button icon='edit' labelPosition='left' content="PracticeTest" onClick={this.close}>PracticeTest</Button></a>
                      <a href="#decider">   <Button color='blue' icon='time' labelPosition='left'  onClick={this.close}>TakeTest</Button></a>

                        <br/>
                    </Modal.Actions>

                </Modal>
            </div>
        )
    }
}

export default ModalExampleDimmer
