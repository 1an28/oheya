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
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>{JSON.stringify(this.props.data)}</h2>
                    <div>asdf</div>
                    <button onClick={() => this.props.closeFunc()}> close </button>
                </Modal>
            </div>
        );
    }
}

export default ModalWindow;