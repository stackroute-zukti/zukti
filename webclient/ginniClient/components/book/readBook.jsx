import React from 'react';
//import ReactPDF from 'react-pdf';
import {Grid} from 'semantic-ui-react';
import Axios from 'axios';
//import PropTypes from 'prop-types'
//var pdf=require('../../../../PDF/react.pdf');
///import PDF from 'react-pdf-js';
import Cookie from 'react-cookie';
import Config from '../../../../config/url'
import ReadBooksPage from '../../../Multi_Lingual/Wordings.json';

export default class Books extends React.Component{

      componentDidMount()
      {
       var domain=Cookie.load('domain').toLowerCase();
         Axios({
            method:'post',
            url : Config.url+'/book',
            data:{
              filename1:'react',
              filename2:'design_pattern',
              //content:'my first pdf contents are here',
              domain:domain
            },
        }).then((response) => {
            console.log(response.data);
          }).
        catch((error) => {
            console.log(error);

    });

}

render() {
return (
          <div style={{
              backgroundImage: "url('../../images/background.jpg')",
              marginTop: '1%',
              height: '100%'
          }}>
{/*
                <Grid>
                  <div style={{
                      width: '98%',
                      height: '50%'
                  }}>
                      <h3 style={{color:'black',textAlign:'center'}}>{ReadBooksPage.ReadBooks.Heading}</h3>
                  </div>
                </Grid> */}
                 <div>
               <embed src={require('../../../../PDF/design_pattern.pdf')} width='1200' height='600' type='application/pdf'/>
             </div>
             {/* <div>
               <a href={require('../../../../PDF/design_pattern.pdf')} download="design_pattern.pdf">Click to Download</a>
           </div> */}
            </div>
        );
    }
}
//module.exports = Books;
