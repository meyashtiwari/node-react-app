function CurrentBalance(props) {
    return (
        <div className="shadow-lg px-4 py-6 w-52 bg-white relative">
            <p className="text-2xl text-black font-bold text-center">
                { `${props.balance} GBP` }
            </p>
            <p className="text-gray-400 text-sm text-center">
                Current Balance
            </p>
        </div>
    );
}

export default CurrentBalance;