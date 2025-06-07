const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    else if (message.includes('deleted') || message.includes('removed')){
      return(
        <div className="delete">
          {message}
        </div>
      )
    }
    
    else{
        return (
            <div className="notification">
                {message}
            </div>
        )
    }
  }

export default Notification