function StatusBar(props) {

    const buttons = [
        {status: 'all', name: 'Все'},
        {status: 'active', name: 'Активные'},
        {status: 'done', name: 'выполненные'}
    ];

    const renderButtons = buttons.map((btn) => {
        const cssClass = props.status === btn.status ? 'btn btn-primary' : 'btn btn-light';
        return (
            <button
            key={btn.status}
            onClick={() => props.changeStatus(btn.status)} 
            type="button" 
            className={cssClass}>
                {btn.name}
            </button>
        );
    })

    return (  
        <div className="btn-group" role="group" >
            {renderButtons}
        </div>
    );
}

export default StatusBar;