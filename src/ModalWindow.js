import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
        top         : '50%',
        left        : '50%',
        right       : 'auto',
        bottom      : 'auto',
        marginRight : '-50%',
        transform   : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root')

class ModalWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: this.props.isOpen
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }
    closeModal() {
        this.setState({modalIsOpen: false});
        this.props.closeFunc();
    }

    render() {
        return (
            <div>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onAfterOpen={this.state.afterOpenModal}
                  onRequestClose={this.state.closeModal}
                  style={customStyles}
                  contentLabel="Exsample Modal"
                  shouldCloseOnOverlayClick={true}
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}> { this.props.data.basicInfo.name } </h2>
                    <ul>
                        <li> address : {this.props.data.basicInfo.address} </li>
                        <li> layout : {this.props.data.basicInfo.layout} </li>
                        <li> area : {this.props.data.basicInfo.area} m^2</li>
                        <li> type : {this.props.data.basicInfo.type} </li>
                        <li> floor : {this.props.data.basicInfo.floor.thisFloor} / {this.props.data.basicInfo.floor.wholeFloor} </li>
                    </ul>

                    <button onClick={() => this.props.closeFunc()}> close </button>
                </Modal>
            </div>
        );
    }
}

export default ModalWindow;