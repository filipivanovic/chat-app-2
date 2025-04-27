import Conversation from '../backend/models/conversation.model.js'
import Message from '../backend/models/message.model.js'

export const sendMessage = async (req, res) => {
  console.log(req.body, 'req.body')
  console.log(req.params, 'req.params')
  // console.log(req.user, 'req.user')
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    // SOCKET.IO FUNCTIONALITY WILL GO HERE

    // await conversation.save()
    // await newMessage.save()

    await Promise.all([conversation.save(), newMessage.save()])

    res.status(201).json({ newMessage })
  } catch (error) {
    console.log(`Error in sendMessage controller: ${error.message || error}`)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params
    const senderId = req.user
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChat] }
    }).populate('messages') // not reference but actual messages

    const messages = conversation?.messages

    res.status(200).json(messages)
  } catch (error) {
    console.error(`Error in getMessages controller: ${error.message || error}`)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
