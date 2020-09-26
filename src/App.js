import React, { Component } from 'react';
import './App.css';
import ModalWindow from './ModalWindow';
import Modal from "./Modal";
class App extends Component {
    constructor () {
        super();
        this.state = {
            selectedElement: {},
            modalData: {},
            tasks: [],
            newTasks: [],
            areaForm: "",
            textForm: "",
            miniFloor: null,
            maxFloor: null,
        };
        this.ModalRef = React.createRef();
        this.openModal = this.openModal.bind(this);
    }
    
    raiseModal(element) {
        this.setState({selectedElement: element});
        this.openModal();
    }

    openModal() {
        this.ModalRef.current.handleOpenModal();
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
        if (Number.isInteger(parseInt(this.state.miniFloor))) {
            updateList = updateList.filter((task) => task.basicInfo.floor.thisFloor >= this.state.miniFloor);
        }
        if (Number.isInteger(parseInt(this.state.maxFloor))) {
            updateList = updateList.filter((task) => task.basicInfo.floor.thisFloor <= this.state.maxFloor);
        }   
        
        this.setState({newTasks: updateList});
        console.log("after filter object : " + updateList);
        console.log("mini floor: " + this.state.miniFloor + ", max floor: " + this.state.maxFloor);
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

    filterMiniFloor = (e) => {
        this.setState({
            miniFloor: e.target.value
        }, () => {
            this.filter()
        })
    }

    filterMaxFloor = (e) => {
        this.setState({
            maxFloor: e.target.value
        }, () => {
            this.filter()
        })
    }

    render() {
        return (
            <div className="App">
                <Modal ref={this.ModalRef} data={this.state.selectedElement}/>
                <div className="tasksArea">                   
                    <ul className="tasks">
                        {
                            this.state.newTasks.map( task => {
                                return(
                                <li className="task" key={ task.id } onClick={() => this.raiseModal(task)}> { task.basicInfo.name } : {task.basicInfo.area} : {task.basicInfo.floor.thisFloor}</li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="formArea">

                    <form className="textSearch">
                        <input className="searchInput" type="text" placeholder="Search form" onChange={this.filterList}/>
                        <div className="subText">を含む</div>
                    </form>

                    <form className="refineSearch">
                        <input className="searchInput" type="text" placeholder="Minimum Area (㎡)" onChange={this.filterArea}/>
                        <div className="subText">㎡以上の面積</div> 
                    </form>

                    <form className="refineSearch">
                        <input className="searchInput" type="text" placeholder="minimum floor." onChange={this.filterMiniFloor}/>
                        <div className="subText">階以上</div> 
                    </form>

                    <form className="refineSearch">
                        <input className="searchInput" type="text" placeholder="maximum floor." onChange={this.filterMaxFloor}/>
                        <div className="subText">階以下</div> 
                    </form>

                </div>
            </div>
        );
    }
}

export default App;