import React from "react";
import ReactModal from "react-modal";

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({showModal: true});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    render() {
        return(
            <div>
                <ReactModal
                  isOpen={this.state.showModal}
                >
                    {this.props.data}
                    <button onClick={this.handleCloseModal}>Close Modal</button>
                </ReactModal>
            </div>
        );
    }
}

export default Modal;