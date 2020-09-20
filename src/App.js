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
            newTasks: [],
            areaForm: "",
            textForm: ""
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

    filter() {
        let updateList = this.state.tasks;
        updateList =  updateList.filter(( task ) => {
            return task.basicInfo.name.toLowerCase().search( this.state.textForm.toLowerCase()) !== -1;
        })
        updateList = updateList.filter((task) => task.basicInfo.area > this.state.areaForm);
        this.setState({newTasks: updateList});
        console.log("after filter object : " + updateList);
    }

    filterList = (e) => {
        this.setState({
            textForm: e.target.value
        }, () => {
            this.filter()
        })
        console.log("NEW TEXT: " + this.state.textForm);
    }
    

    filterArea = (e) => {
        this.setState({
            areaForm: e.target.value
        }, () => {
            this.filter()
        })
        console.log("NEW AREA: " + this.state.areaForm);
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    openModal( task ) {
        this.setState({modalIsOpen: true});
        this.setState({modalData: task});
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
                                <li className="task" key={ task.id } onClick={() => this.openModal(task)}> { task.basicInfo.name } : {task.basicInfo.area}</li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="formArea">
                    <form className="searchForm">
                        <input className="searchInput" type="text" placeholder="Search form" onChange={this.filterList}/>
                    </form>
                    <form className="refineSearch">
                        <input className="searchInput" type="text" placeholder="Minimum Area (m^2)" onChange={this.filterArea}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;