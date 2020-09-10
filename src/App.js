import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            tasks: [
                {
                    id: 1,
                    basicInfo: {
                        name: "asdf"
                    }
                }
            ]
        }
    }

    componentWillMount() { // just before App displays on the page.
        this.fetchData()
    }

    fetchData() {
        fetch("http://localhost:3001/sampleData") // get a data
        .then( response => response.json() ) // json to object
        .then( json => {
            this.setState({ tasks: json }) // update a state
        })
    }

    render() {
        return (
            <div className="App">
                <div className="tasks">
                    {
                        this.state.tasks.map( task => {
                            return <div className="task" key={ task.id } > { task.basicInfo.name }</div>
                        })
                    }
                </div>
                <form>
                    <input type="search"></input>
                </form>
            </div>
        );
    }
}

export default App;