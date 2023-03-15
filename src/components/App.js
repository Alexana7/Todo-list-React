import React from 'react';
import Header from './Header';
import Search from './Search';
import List from './List';
import Footer from './Footer';

class App extends React.Component {
	state = {
		todoData: [
			{ id: 0, title: 'Выпить кофе', important: false, done: false },
			{ id: 1, title: 'Сделать React приложение', important: true, done: false },
			{ id: 2, title: 'Позавтракать', important: false, done: true },
		],
	};
	
	onToggleImportant = (id) => {
		this.setState((state)=> {
			//  находим индекс задачи в массиве todoData
			const index = state.todoData.findIndex((el) => el.id === id);

			// формируем новый {} с обратным значением important

			const oldItem = state.todoData[index];
			const newItem = { ...oldItem, important: !oldItem.important };
			
			// формируем новый массив todoData, добавляя в него новый {} с задачей на то же метсто, где был пердыдущий (изменяемый) объект
			const part1 = state.todoData.slice(0, index);
			const part2 = state.todoData.slice(index + 1);
			const newArray = [...part1, newItem, ...part2];
			
			return {todoData: newArray}
		})
	}

	onToggleDone = (id) => {
		this.setState((state)=> {
			
			const index = state.todoData.findIndex((el) => el.id === id);

			const oldItem = state.todoData[index];
			const newItem = { ...oldItem, important: false, done: !oldItem.done };
			
			const part1 = state.todoData.slice(0, index);
			const part2 = state.todoData.slice(index + 1);
			
			const newArray = [...part1, newItem, ...part2];
			
			return {todoData: newArray}
		})
	}
	deleteItem = (id) => {
		this.setState((state) => {
			const index = state.todoData.findIndex((el) => el.id === id);
			const part1 = state.todoData.slice(0, index);
			const part2 = state.todoData.slice(index + 1);
			const newArray = [...part1, ...part2];
			return {todoData: newArray};
		})
	}


	render(){
		return (
			<div>
				<Header />
				<Search />
				<List 
					data = {this.state.todoData}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
					deleteItem={this.deleteItem} />
				<Footer />
			</div>
		)
	}
}
export default App;
