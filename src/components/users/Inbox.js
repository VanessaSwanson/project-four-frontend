import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import TimeAgo from 'react-timeago'
import Loading from '../common/Loading'
import { getSingleUser, getProfile, sendMessage } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import message from '../common/resources/message.png'

function Inbox() {
  const { userId } = useParams()
  const [user, setUser] = React.useState(null)
  const [mergedChats, setMergedChats] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !user && !isError
  const history = useHistory()
  const [formData, setFormData] = React.useState(
    {
      message: '',
    }
  )

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfile(getUserId())
        setCurrentUser(res.data)
        const response = await getProfile(getUserId())
        return setCurrentUser(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  }, [getUserId()])

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const res = await getSingleUser(userId)
        setUser(res.data)
        // Was having issues with undefined data on refresh of page, so moved it into state
        setMergedChats([...res.data.messagesMade, ...res.data.messagesReceived])
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[userId])


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const receiverId = e.target.name
      await sendMessage(receiverId, formData)
      const res = await getSingleUser(userId)
      setUser(res.data)
      setMergedChats([...res.data.messagesMade, ...res.data.messagesReceived])
      setFormData({ ...formData, message: '' })
      history.push(`/auth/${userId}/inbox/`)
      // location.reload()
    } catch (err) {
      console.log(err)
    }
  }


  // Reduce function that loops through each message the user has made and sorts them by recipient/threads
  const currentChatUser = currentUser?.username

  const createdChats = mergedChats?.reduce((chats, currentMessage) => {
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

  // fuction to sort chats alphabetically by username 
  const sortedChats = createdChats?.sort(function(a, b){
    if (a.user.username?.toLowerCase() < b.user.username?.toLowerCase()) {
      return -1 
    }
    if (a.user.username?.toLowerCase() > b.user.username?.toLowerCase()) {
      return 1 
    }
    return 0
  })

  return (
    <div>
      {isLoading && <Loading />}
      {user &&
      <div className="inbox-section">
        {
          currentUser?.id !== user?.id ?
            <h1>Oops I think you took a wrong turn!</h1>
            :
            <>
              <div className="messages-container">
                {sortedChats.length === 0 ? 
                  <div className="unpopulated-messages-container">
                    <h3>No messages yet!</h3>
                  </div> 
                  :
                  <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                    {sortedChats?.map(chat =>
                      <Row className="tab-row" key={chat.id}>
                        <Col sm={3} className="message-container-left">

                          <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                              <Nav.Link eventKey={sortedChats.indexOf(chat)}>
                              
                                <div className="navlink-left">
                                  <img src={chat.user.profileImage} alt={chat.user.username}/> 
                                </div>              
                                {chat.user.username}
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </Col>
                      
                        <Col sm={9} className="message-container-right">                    
                          <Tab.Content>
                            <Tab.Pane eventKey={sortedChats.indexOf(chat)} className="tab-pane">
                              <div className="message-container" key={chat.id}>
                              
                                <div className="chat-title">
                                  <img src={chat.user.profileImage} alt={chat.user.username}/>
                                  <p><strong>{chat.user.username}</strong></p>
                                </div> 
                                {chat.messages.sort(function(a,b){
                                  if (a.createdAt > b.createdAt) return 1
                                  if (a.createdAt < b.createdAt) return -1
                                  return 0
                                }).map(message=>
                                  <div className="message" key={message.id}>
                                    {message.isSender ? 
                                      <div className="message-right">
                                        <p>{message.message}</p>
                                        <p className="send-time"><TimeAgo date={message.createdAt}/></p>
                                      </div>
                                      :
                                      <div className="message-left" key={message.id}>
                                        <p>{message.message}</p>
                                        <p className="send-time"><TimeAgo date={message.createdAt}/></p>
                                      </div>
                                    }
                                  </div>
                                )}
                              </div>
                              <div className="create-message">
                                <form
                                  className="form"
                                  name={chat.user.id}
                                  onSubmit={handleSubmit}
                                >                
                                  <textarea
                                    className="input"
                                    value={formData.message}
                                    placeholder="Message..."
                                    name="message"
                                    onChange={handleChange}
                                  />
                                  <button type="submit">
                                    <img src={message} alt="Send message"/> 
                                  </button>
                                </form>
                              </div>
                            </Tab.Pane>
                          </Tab.Content>
                        </Col>
                      </Row>
                    )}
                  </Tab.Container>
                }
              </div>
            </>
        }
      </div>
      }
    </div>
    
  )
}

export default Inbox