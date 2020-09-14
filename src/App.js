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
            ],
            newTasks: []
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
            this.setState({ newTasks: json })
        })
    }

    filterList = (e) => {
        const updateList = this.state.tasks.filter(( task ) => {
            return task.basicInfo.name.toLowerCase().search( e.target.value.toLowerCase()) !== -1;
        })
        this.setState({newTasks: updateList})
    }

    render() {
        return (
            <div className="App">
                <div className="tasksArea">
                    <ul className="tasks">
                        {
                            this.state.newTasks.map( task => {
                                return(
                                    <li className="task" key={ task.id }> { task.basicInfo.name } </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="formArea">
                    <form className="searchForm">
                        <input type="text" placeholder="Search form" onChange={this.filterList}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;