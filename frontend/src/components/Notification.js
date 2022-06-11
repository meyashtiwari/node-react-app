function Notification(props) {

    function applyClass(type) {
        switch (type) {
            case 'success': 
                return 'bg-green-200 border-green-600 text-green-600 border-l-4 p-4';
            case 'error':
                return 'bg-red-200 border-red-600 text-red-600 border-l-4 p-4';
        }
    }

    if(!props.show) {
        return;
    }

    return (
        <div className={applyClass(props.type)} role="alert">
            <p class="font-bold">
                { props.message }
            </p>
        </div>
    );
}

export default Notification;