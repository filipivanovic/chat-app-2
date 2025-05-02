import { create } from 'zustand/react'

const useConversation = create(set => ({
  selectedConversation: null,
  setSelectedConversation: selectedConversation => set({ selectedConversation }),
  messages: [],
  setMessages: messages => set({ messages })
}))

export default useConversation