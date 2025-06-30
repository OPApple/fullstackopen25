const Notification = ({ message }) => {
    console.log(message)
    if (message === null){
        return null
    } else if (message.includes('error')){
        return (
            <div className="error">
                {message.replace('error ', '')}
            </div>
        )
    } else {
        return (
            <div className="notification">
                {message}
            </div>
        )
    }

}

export default Notification