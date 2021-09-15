import React from 'react'
import { useParams } from 'react-router'
import TimeAgo from 'react-timeago'
import Loading from '../common/Loading'
import { getSingleUser, getProfile } from '../../lib/api'

function Inbox() {
  const { userId } = useParams()
  const [user, setUser] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !user && !isError

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleUser(userId)
        setUser(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[userId])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfile()
        return setCurrentUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  console.log(user)

  const mergedChats = []
  mergedChats.push(...user.messagesMade)
  mergedChats.push(...user.messagesReceived)
  console.log(mergedChats)

  // Reduce function that loops through each message the user has made and sorts them by recipient/threads
  const currentChatUser = currentUser?.username

  const createdChats = mergedChats.reduce((chats, currentMessage) => {
    const isSender = currentMessage.sender.username === currentChatUser
    const currentChat = chats.find(chat => {
      return (
        chat.user.username === currentMessage.receiver.username ||
        chat.user.username === currentMessage.sender.username
      )
    })
    if (!currentChat) {
      const user = isSender ? currentMessage.receiver : currentMessage.sender
      return [...chats, { user, messages: [{ message: currentMessage.message, createdAt: currentMessage.createdAt, sender: currentMessage.sender,
        receiver: currentMessage.receiver, isSender }] }]
    }
    return chats.map(chat => {
      if (chat !== currentChat) return chat
  
      return {
        ...chat,
        messages: [
          ...chat.messages,
          {
            message: currentMessage.message,
            createdAt: currentMessage.createdAt,
            sender: currentMessage.sender,
            receiver: currentMessage.receiver,
            isSender,
          }
        ],
      }
    })
  }, [])

  console.log(createdChats)


  return (
    <div className="inbox-section">
      {isLoading && <Loading />}
      {
        currentUser?.id !== user?.id ?
          <h1>Oops I think you took a wrong turn!</h1>
          :
          <>
            <div className="messages-container">
              <h3>Created chats</h3>
              {createdChats?.map(chat =>
                <div className="message-container" key={chat.id}>
                  <p>{chat.user.username}</p>
                  {chat.messages.map(message=>
                    <div className="message" key={message.id}>
                      <p>{message.message}</p>
                      {message.isSender ? 'You' : <p>{message.sender.username}</p>}
                      <p><TimeAgo date={message.createdAt}/></p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
      }
    </div>
    
  )
}

export default Inbox