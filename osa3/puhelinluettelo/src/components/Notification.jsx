const Notification = ({ message, isBad }) => {
    if (message === null) {
      return null
    }
    else if (isBad){
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