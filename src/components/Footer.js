import {Component} from 'react';

class Footer extends Component {

	state = {
		taskTitle: ''
	}
	
	onInputChange = (e) => {
		this.setState({
			taskTitle: e.target.value
		});
	}


	onSubmitForm = (e) => {
		e.preventDefault();

		if(this.state.taskTitle.trim()) {
			this.props.addItem(this.state.taskTitle);
		}
		
		this.setState({
			taskTitle: ''
		})

	}


	render () {
		return (
			<form onSubmit={this.onSubmitForm} className="footer">
				<input
				value={this.state.taskTitle}
				onChange={this.onInputChange}
				type="text" 
				placeholder="Что необходимо сделать" 
				className="form-control me-2" />
				<button type="submit" className="btn btn-primary">
					Добавить
				</button>
			</form>
		);
	}    
}

export default Footer;