import React from 'react';
import {Accordion, Icon, Segment} from 'semantic-ui-react';
import Embedly from 'react-embedly';
import CardDisplay from './cardDisplay';
import './questionanswer.css';

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texts: [],
            videos: [],
            blogs: []
        };
    }

    componentDidMount() {
        let texts = this.props.answers.texts.map((data, index) => {
            this.state.texts.push(<CardDisplay key = {index} data ={data} type='text'/>);
        });
        this.setState({texts: this.state.texts});
        let videos = this.props.answers.videos.map((data, index) => {
            this.state.videos.push(<Embedly key = {index} url={data} apiKey="ff6dc30026d7471787fd22c4bc23eef6"/>)
        });
        this.setState({videos: this.state.videos});
        let blogs = this.props.answers.blogs.map((data, index) => {
            this.state.blogs.push(<Embedly key = {index} url={data} apiKey="ff6dc30026d7471787fd22c4bc23eef6"/>)
        });
        this.setState({blogs: this.state.blogs});
    }
    componentWillReceiveProps(nextProps) {
      this.state.texts = [];
      this.state.videos = [];
      this.state.blogs = [];
      if(this.props !== nextProps) {
        let texts = nextProps.answers.texts.map((data, index) => {
            this.state.texts.push(<CardDisplay key = {index} data ={data} type='text'/>)
        });
        this.setState({texts: this.state.texts});


        let videos = nextProps.answers.videos.map((data, index) => {
            this.state.videos.push(<Embedly key = {index} url={data} apiKey="ff6dc30026d7471787fd22c4bc23eef6"/>)
        });
        this.setState({videos: this.state.videos});


        let blogs = nextProps.answers.blogs.map((data, index) => {
            this.state.blogs.push(<Embedly key = {index} url={data} apiKey="ff6dc30026d7471787fd22c4bc23eef6"/>)
        });
        this.setState({blogs: this.state.blogs});
    }
  }
    render() {
        return (
            <div>
              <Segment style={{width: '900px', marginLeft: '10%'}}>
                <Accordion exclusive={true} styled style={{
                    marginLeft: '0%',
                    width: '100%'
                }}>
                    <Accordion.Title id="title" >
                        <Icon name='dropdown'/>
                        {this.props.questions}
                    </Accordion.Title>
                    <Accordion.Content>
                      <h3 style={{color: 'orange',
                        textDecoration: 'underline', fontWeight: 'bold', fontSize: '20px'}}>
                        TEXTS</h3> {this.state.texts}
                      <h3 style={{color: 'orange', textDecoration: 'underline',
                        fontWeight: 'bold', fontSize: '20px'}}>
                        BLOGS</h3> {this.state.blogs}
                      <h3 style={{color: 'orange', textDecoration: 'underline',
                        fontWeight: 'bold', fontSize: '20px'}}>
                        VIDEOS</h3> {this.state.videos}
                    </Accordion.Content>
                </Accordion>
              </Segment>
            </div>
        );
    }
}
