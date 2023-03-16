import {Component} from 'react';
import Header from './Header';
import Search from './Search';
import StatusBar from './StatusBar';
import List from './List';
import Footer from './Footer';

class App extends Component {
	state = {
		todoData: [
			{ id: 0, title: 'Выпить кофе', important: false, done: false },
			{ id: 1, title: 'Сделать React приложение', important: true, done: false },
			{ id: 2, title: 'Позавтракать', important: false, done: true },
		],
		term: '',
		status: 'all'
	};

	toggleParam = (id, param) => {
		this.setState((state)=> {
			const newArray = state.todoData.map((task) => {
				return {
					...task,
					[param]: id === task.id ? !task[param] : task[param]
				};
			})
			return {
				todoData: newArray
			}
		})
	}
	onToggleImportant = (id) => {
		this.toggleParam(id, 'important');
	};
	
	onToggleDone = (id) => {
		this.toggleParam(id, 'done');
	};

	deleteItem = (id) => {
		this.setState((state) => {
			const newArray = state.todoData.filter((task) => task.id !== id)
			return  {
				todoData: newArray
			}
		})
	}

	addItem = (title) => {
		this.setState((state) => {
			const ID = state.todoData[state.todoData.length -1]['id'] + 1; 
			const newItem = {
				id: ID,
				title: title,
				important: false,
				done: false
			}
			const newArray = [...state.todoData, newItem]
			return {
				todoData: newArray
			}
		})
	}

	search = (items, term) => {
		if(term.trim().length === 0) {
			return items
		}
		return items.filter((item) => {
			if(item.title.toLowerCase().indexOf(term.toLowerCase().trim()) > -1){
				return true
			}
		})
	}

	changeTerm = (term) => {
		this.setState({
			term: term
		})

	}

	filterByStatus = (items, status) => {
		switch (status){
			case 'all':
				return items;

			case 'active':
				return items.filter((item) => item.done === false);

			case 'done':
				return items.filter((item) => item.done === true);

			default:
				return items;
		}
	}

	changeStatus = (status) => {
		this.setState({status: status})
	}

	render(){
		const filteredBySearchItems = this.search(this.state.todoData, this.state.term);
		const filteredByStatusItems = this.filterByStatus(filteredBySearchItems, this.state.status)
		return (
			<div>
				<Header />
				<div className="search">
					<Search term={this.state.term}  changeTerm={this.changeTerm}/>
					<StatusBar changeStatus={this.changeStatus} status={this.state.status}/>
				</div>
				
				<List 
					data = {filteredByStatusItems}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
					deleteItem={this.deleteItem} />
				<Footer addItem={this.addItem} />
			</div>
		)
	}
}
export default App;
