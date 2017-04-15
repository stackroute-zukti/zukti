/* @santhosh: upload csv to add question and answers to neo4j graph */
import React from 'react';
import {Form, Input, Button, Grid, Icon} from 'semantic-ui-react';
import Cookie from 'react-cookie';

class IndexComponent extends React.Component {
  constructor() {
     super();
 }
 render() {
    let domain = Cookie.load('domain');
    let email = Cookie.load('email');
    domain = domain.toLowerCase();
     domain = domain.replace(' ', '_');
    let act = `/uploadcsv?domain=${domain}&email=${email}`;
       return (
            <div style={{'marginLeft': '30%', 'marginTop': '5%'}}>
              <h1 style={{'marginLeft': '35%'}}>Upload File</h1>
                <Form method='post' encType='multipart/form-data' action={act} >
                  <input type='file' name='uploadedFile' accept='.csv' required />
                   <Button color = 'red' type = 'submit' ><Icon name='upload'/>Upload</Button>
                 </Form>
            </div>
       );
   }
}
export default IndexComponent;
