import React from 'react';
import Modal from 'react-bootstrap-modal';

const _eventCode = 'mw2Asjv9B7pl419yd3imj3uu1DMP6TT7';

export default class RegisterModal extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            open : false
        }
    }
    componentDidUpdate(){
        this.setState({
            open : this.props.stateOfModal
        })
    }
    render(){
        let closeModal = () => this.setState({ open: false });
        let resetForm = () => {
            $('.selectpicker').selectpicker('deselectAll');
        }
        return (
            <div>

            </div>
        )
    }
}