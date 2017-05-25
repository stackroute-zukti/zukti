import React from 'react';
import ReactDOM from 'react-dom';
import {
    Grid,
    Form,
    Input,
    Button,
    Dropdown,
    Container,
    Label,
    Icon
} from 'semantic-ui-react';
import Axios from 'axios';
import Cookie from 'react-cookie';
import Dropzone from 'react-dropzone';
import Config from '../../../../config/url';
import './readBook.css';
import ReadBooksPage from '../../../Multi_Lingual/Wordings.json';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
var fs=require('fs');
var path=require('path');
export default class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            allFiles: [],
            articlename: '',
            zynlaBook:[],
            bookOptions:[],
            bookname:'',
        };
        this.getZynlaBook=this.getZynlaBook.bind(this);
        this.handleUserBookInput = this.handleUserBookInput.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.keywordAlert = this.keywordAlert.bind(this);
        this.domainAlert = this.domainAlert.bind(this);
        this.generateBook = this.generateBook.bind(this);
        this.getUserBook = this.getUserBook.bind(this);
        this.handleBookDropdownChange=this.handleBookDropdownChange.bind(this);
        //this.onDocxDrop=this.onDocxDrop.bind(this);
    }
      keywordAlert()
    {
        this.refs.container.warning('Give proper article', '', {
            timeOut: 3000,
            extendedTimeOut: 100
        });
    }
    domainAlert(data)
    {
        this.refs.container.success('Pdf Created', '', {
            timeOut: 3000,
            extendedTimeOut: 100
        });

    }
    conceptAlert(data)
    {
        this.refs.container.warning('No concept found/different Domain', '', {
            timeOut: 3000,
            extendedTimeOut: 100
        });
    }
    limitAlert(data)
    {
        this.refs.container.info(data, '', {
            timeOut: 3000,
            extendedTimeOut: 100
        });
    }
    getZynlaBook()
  {
    Axios({
       method:'get',
       url :'http://localhost:8081/book/sendFileLength',
         }).then((response) => {
     let books =response.data.filearr ;
         console.log(books);
      books.forEach((books) => {
          this.state.bookOptions.push({text: books, value: books});
        console.log(response.data);
      }).
    catch((error) => {
        console.log(error);
   });
   });
   }

  handleBookDropdownChange(e, {value}) {
  this.setState({bookname:value});
  this.setState({articlename:''});
}
    componentDidMount() {
        this.getUserBook();
        this.getZynlaBook();
    }
    handleUserBookInput(e)
    {
        e.preventDefault();
        let message = {};
        var domain = Cookie.load('domain').toLowerCase();
        message.value = ReactDOM.findDOMNode(this.refs.userInput).value;
        var time = new Date();
        var dd = time.getDate();
        var mm = time.getMonth() + 1;
        var yy = time.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '-' + mm + '-' + yy;
        message.time = today;
        ReactDOM.findDOMNode(this.refs.userInput).value = '';
        console.log(message);
        let url = '/book/verifyQuestion';
        Axios.post(url, {
            domain: domain,
            question: message
        }).then((response) => {

            if (response.data.isValidQuestion == '') {
                this.keywordAlert();
            } else {
                console.log("keywords:" + response.data.isValidQuestion);
                let keyword = response.data.isValidQuestion;
                let time = response.data.time;
                this.generateBook(keyword, time);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    generateBook(keyword, time)
    {
        var domain = Cookie.load('domain').toLowerCase();
        var username = Cookie.load('email');
        Axios({
            method: 'post',
            url: Config.url + '/book',
            data: {
                domain: domain,
                k: keyword,
                time: time,
                username: username
            }
        }).then((response) => {
            console.log(response.data);
            if (response.data.data == "pdf created successfully....it will take some time to open") {
                console.log("inside domaiiaaisisidsi");
                this.domainAlert(response.data.data);
                this.getUserBook();
            } else if (response.data.data == "exceeded the limit") {
                this.limitAlert(response.data.data);
            } else {
                this.conceptAlert(response.data.data);
            }
        }).catch((error) => {
            console.log(error);

        });
    }
    handleDropdownChange(e, {value}) {
        this.setState({articlename: value});
        this.setState({bookname:''});
    }
    getUserBook()
    {
        var username = Cookie.load('email');
        Axios({
            method: 'post',
            url: Config.url + '/book/getBook',
            data: {
                username: username
            }
        }).then((response) => {
            let books = response.data.book_arr;
          //  if (books.length > 0) {
                books.forEach((books) => {
                    this.state.options.push({text: books, value: books});
                    //console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                });
            // } else {
            //     let data = 'Books are not available'
            //     this.domainAlert(data);
            // }
        });

    }

    render() {
        return (
            <div id="back">
                <Form id='form'>
                    <input autoComplete="off" type='text' id='textinput' style={{
                        width: "700"
                    }} name='userInput' ref='userInput' placeholder='Enter article name here.....'/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button id="button" size='medium' inverted onClick={this.handleUserBookInput} color='green'>create PDF</Button>
                </Form>
                <Form>

                        <Label id='label' color='violet' size='large'>
                            Choose article/Book here &nbsp;&nbsp;
                            <Icon name='clone'/>
                        </Label>  &nbsp;
                        <Input>
                            <Dropdown id="dd" text='Article' search selection onChange={this.handleDropdownChange} options={this.state.options}/>
                        </Input>
                        <Input>
          <Dropdown id="dd" text='book' search selection onChange={this.handleBookDropdownChange}  options={this.state.bookOptions} />
    </Input>

                </Form>
                <div>
                    {this.state.articlename!=''?
                        <object id="object" data={require('../../../../PDF/' + this.state.articlename)} width='900' height='580' type="application/pdf">
                                {/* <iframe src={require('../../../../PDF/'+this.state.articlename)} width='900' height='500' title={this.state.articlename}  type='application/pdf'/> */}
                            </object>

                        :  ''}
                </div>
                <div>
                  {this.state.bookname!=''?
                      <object id="object" data={require('../../../../../../zynlaCopy/BookDocs/pdf/'+this.state.bookname)} width='900' height='580' type="application/pdf">
                              {/* <iframe src={require('../../../../PDF/'+this.state.articlename)} width='900' height='500' title={this.state.articlename}  type='application/pdf'/> */}
                          </object>

                      :  ''}


                </div>


                {/* <div>
           {this.state.articlename?
           <a href={require('../../../../PDF/'+this.state.articlename)} download={this.state.articlename}>Click to Open and Download</a>
            :''}
       </div> */}
                <div>
                    <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>
                </div>
            </div>
        );
    }
}
