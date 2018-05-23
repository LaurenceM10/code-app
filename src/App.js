import React, {Component} from 'react';
import logo from './logo.svg'
import './App.css';

import gql from 'graphql-tag';
import {graphql} from 'react-apollo';


class App extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-intro">
                    {
                        this.props.data.loading === true
                            ? "Loading"
                            : this.props.data.search.edges.map(data =>
                                <ul key={data.node.id}>
                                    <li style={{fontWeight: 'bold'}}>
                                        <a href={data.node.url}>{data.node.name}</a>
                                    </li>
                                    <li>{data.node.description}</li>
                                </ul>
                            )
                    }
                </div>
            </div>
        );
    }
}


// language=GraphQL
const repoQuery = gql`
    query ($name: String!) {
        search(query: $name, last: 10, type: REPOSITORY) {
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        description
                        url
                    }
                }
            }
        }
    }
`;

const AppWithData = graphql(
    repoQuery,
    {
        options: {
            variables: {
                name: "react"
            }
        }
    }
)(App);

export default AppWithData;
