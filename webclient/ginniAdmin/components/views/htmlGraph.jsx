import React from 'react';

export default class Graph extends React.Component {
  constructor() {
      super();
  }

  componentWillMount() {
    // localStorage.setItem('query', 'match (n)-[r]-(m) return n,r,m');
    localStorage.setItem("query", "match (n)-[r]-(m) return n,r,m");
  }

    render() {
      return(
        <div>
            <frameset>
              <frame src = 'http://localhost:8080/graphie'/>
            </frameset>
        </div>
      );
  }
}
