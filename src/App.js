import React, { Component } from 'react';
import './App.css';
import ModalWindow from './ModalWindow';

class App extends Component {
    constructor() {
        super()
        this.state = {
            modalIsOpen: false,
            modalData: {},
            tasks: [],
            newTasks: []
        }
    }

    componentDidMount() { /* just before App displays on the page.*/
        this.fetchData()
    }

    fetchData() {
        fetch("http://localhost:3001/sampleData") /* get a data*/
        .then( response => response.json() ) /* json to object*/
        .then( json => {
            this.setState({ tasks: json }) /* update a state*/
            this.setState({ newTasks: json })
        })
    }

    filterList = (e) => {
        const updateList = this.state.tasks.filter(( task ) => {
            return task.basicInfo.name.toLowerCase().search( e.target.value.toLowerCase()) !== -1;
        })
        this.setState({newTasks: updateList})
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openModal( task ) {
        this.setState({modalIsOpen: true});
        this.setState({modalData: task});
        console.log(toString.call(task.id));
        console.log(task.id);
        console.log(JSON.stringify(task));

    }   
    

    render() {
        return (
            <div className="App">
                <div className="tasksArea">
                    {
                        this.state.modalIsOpen &&
                            <ModalWindow isOpen={true} closeFunc={() => {this.closeModal()}} data={this.state.modalData}></ModalWindow>
                        
                    }
                    <div></div>
                    
                    <ul className="tasks">
                        {
                            this.state.newTasks.map( task => {
                                return(
                                    <li className="task" key={ task.id } onClick={() => this.openModal(task)}> { task.basicInfo.name } </li>
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