function CurrentBalance(props) {
    return (
        <div class="shadow-lg px-4 py-6 w-52 bg-white relative">
            <p class="text-2xl text-black font-bold text-center">
                { `${props.balance} GBP` }
            </p>
            <p class="text-gray-400 text-sm text-center">
                Current Balance
            </p>
        </div>
    );
}

export default CurrentBalance;