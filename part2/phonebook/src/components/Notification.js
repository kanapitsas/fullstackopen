import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {return null}    
  let error = false
  if (message.toLowerCase().startsWith('error')) {error = true}
  const style = {
    color: error ? 'red': 'green',
    borderStyle: 'dotted',
    fontSize: 16,
  }
  return <div style={style}>{message}</div>
}

export default Notification
