import React from 'react';
import Display from './displayaccordion';
import FilterData from './filterData';
import FilterConcept from './filterConcept';
import Pager from 'react-pager';
import processQuestion from '../../../../webserver/routes/getReply/functions/processQuestion';
import {Grid} from 'semantic-ui-react';
import Style from '../../../css/style.css';
import './questionanswer.css';

export default class Pagination extends React.Component {
      constructor(props) {
        super(props);
        this.handlePageChanged = this.handlePageChanged.bind(this);
        this.state = {
            total: Math.ceil(this.props.data.length / 4),
            current: 0,
            visiblePage: 4,
            data: [],
            showData: [],
            filterData: []
        };
    }
    // to divide data into smaller arrays for pagination
    componentWillMount() {
        let lengthOfData = this.props.data.length;
        let splitData = [];
        for (var i = 0; i < lengthOfData; i = i + 4) {
            splitData.push(this.props.data.slice(i, i + 4))
        }
        this.setState({data: splitData})
    }
    // to Display 1st page of Pagination
    componentDidMount() {
        this.state.data[0].map((data) => {
            this.state.showData.push(
              <Display questions={data.questions} answers={data.answers}/>);
        });
        this.setState({showData: this.state.showData});
        this.state.showData = [];
    }
    //handle pagination when page changed
    handlePageChanged(newPage) {
        this.state.showData = [];
        console.log(newPage);
        this.state.current = newPage;
        this.state.data[this.state.current].map((data1) => {
        this.state.showData.push(<Display questions={data1.questions} answers={data1.answers}/>);
        });
        this.setState({showData: this.state.showData});
    }
    // to filter data according to intents
    handleDropResponse = (intent) => {
        this.state.showData = this.state.data[this.state.current];
        this.state.showData.map((data) => {
            let intentOfQuestion = processQuestion(data.questions).intents[0];
            if (intentOfQuestion === intent) {
          this.state.filterData.push(<Display questions={data.questions} answers={data.answers}/>);
            }
        });
        this.setState({showData: this.state.filterData});
        this.state.showData = [];
        this.state.filterData = [];
    }
    // to filter data according to concepts
    handleConcept = (concept) => {
        concept = concept.split(" ").join("");
        this.state.showData = this.state.data[this.state.current];
        this.state.showData.map((data) => {
            let conceptOfQuestion = processQuestion(data.questions).keywords;
            conceptOfQuestion.map((con) => {
                if (con === concept) {
          this.state.filterData.push(<Display questions={data.questions} answers={data.answers}/>);
                }
            });
        });
        this.setState({showData: this.state.filterData});
        this.state.showData = [];
        this.state.filterData = [];
    }
    render() {
        return (
          <div >
<Grid vertically>
    <Grid.Row columns={3}>
      <Grid.Column width={2}/>
      <Grid.Column width={7}>
        <Grid vertically>
            <Grid.Row columns={2}>
              <Grid.Column width={4}/>
              <Grid.Column width={12}>
            <FilterData intent={this.handleDropResponse}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
              <Grid.Column width={7}>
                      <Grid.Column width={16}>
        <FilterConcept concept={this.handleConcept}/>
        </Grid.Column>
  </Grid.Column>
</Grid.Row>
    <Grid.Row>
      <Grid vertically>
          <Grid.Row>
            <Grid.Column width={16}>
          {this.state.showData}
</Grid.Column>
</Grid.Row>
</Grid>
</Grid.Row>
<Grid.Row>
          <Grid.Column width={16} id="pager">
          <Pager style={Style}
                total={this.state.total}
                current={this.state.current}
                visiblePages={this.state.visiblePage}
                titles={{ first: '<|', last: '|>' }}
                className="pagination-sm pull-right"
                onPageChanged={this.handlePageChanged} />

</Grid.Column>
</Grid.Row>
</Grid>
            </div>

        );
    }
}
