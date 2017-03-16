import React from 'react';
import {Sigma, NeoCypher, EdgeShapes} from 'react-sigma';

class ViewGraph extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Sigma style={{
                maxWidth: 'inherit',
                height: '1500px'
            }} settings={{
                drawEdgeLabels: true,
                minArrowSize: 5
            }}>
                <EdgeShapes default="curvedArrow" />
                <NeoCypher
                  url="http://192.168.1.137:7474"
                  user="neo4j"
                  password="neo4js"
                  query="match (n)-[r]->(m) return n,r,m" />
            </Sigma>
        );
    }
}

export default ViewGraph;
