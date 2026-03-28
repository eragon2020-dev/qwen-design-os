import React, { useState } from 'react'
import type { StudentPlatformProps, Message } from '@/../product/sections/student-platform/types'
import { Send, Search, MessageSquare, ChevronLeft } from 'lucide-react'

/**
 * Messages - Conversation view with lecturers
 */
export function Messages({
  messages,
  enrollments,
  onSendMessage,
  onViewMessages,
}: StudentPlatformProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [newSubject, setNewSubject] = useState('')

  // Group messages by course
  const conversations = enrollments?.map((enrollment) => {
    const courseMessages = messages?.filter((m) => m.courseId === enrollment.courseId) || []
    const lastMessage = courseMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
    const unreadCount = courseMessages.filter((m) => !m.isRead && m.recipientRole === 'student').length
    return {
      enrollment,
      messages: courseMessages,
      lastMessage,
      unreadCount,
    }
  }).filter((c) => c.messages.length > 0) || []

  const currentConversation = selectedCourse
    ? conversations.find((c) => c.enrollment.courseId === selectedCourse)
    : conversations[0]

  const handleSend = () => {
    if (newMessage.trim() && currentConversation) {
      onSendMessage?.({
        courseId: currentConversation.enrollment.courseId,
        subject: newSubject || 'Re: ' + (currentConversation.lastMessage?.subject || 'Question'),
        content: newMessage,
        recipientId: 'lec_001', // Would get from lecturer data
      })
      setNewMessage('')
      setNewSubject('')
    }
  }

  if (!currentConversation) {
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No messages yet
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Start a conversation with your lecturer from any course page
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations List */}
      <div className={`w-80 border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden flex flex-col ${selectedCourse ? 'hidden lg:flex' : ''}`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-bold text-slate-900 dark:text-white">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <ConversationItem
              key={conv.enrollment.courseId}
              conversation={conv}
              isSelected={currentConversation?.enrollment.courseId === conv.enrollment.courseId}
              onClick={() => setSelectedCourse(conv.enrollment.courseId)}
            />
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className={`flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 ${!selectedCourse ? 'hidden lg:flex' : ''}`}>
        {/* Thread Header */}
        <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
          <button
            onClick={() => setSelectedCourse(null)}
            className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {currentConversation.enrollment.courseTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {currentConversation.enrollment.lecturerName}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentConversation.messages.map((message, index) => {
            const isFromStudent = message.senderRole === 'student'
            const showAvatar = index === 0 || currentConversation.messages[index - 1].senderRole !== message.senderRole
            return (
              <MessageBubble
                key={message.id}
                message={message}
                isFromStudent={isFromStudent}
                showAvatar={showAvatar}
              />
            )
          })}
        </div>

        {/* Reply Input */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Subject (optional)"
              className="hidden sm:block w-48 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white text-sm"
            />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ConversationItemProps {
  conversation: {
    enrollment: { courseId: string; courseTitle: string; lecturerName: string; courseThumbnail: string }
    lastMessage?: Message
    unreadCount: number
  }
  isSelected: boolean
  onClick?: () => void
}

function ConversationItem({ conversation, isSelected, onClick }: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer transition-colors ${
        isSelected
          ? 'bg-indigo-50 dark:bg-indigo-900/20'
          : 'hover:bg-slate-50 dark:hover:bg-slate-700'
      }`}
    >
      <div className="flex items-start gap-3">
        <img
          src={conversation.enrollment.courseThumbnail}
          alt={conversation.enrollment.courseTitle}
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-slate-900 dark:text-white truncate text-sm">
              {conversation.enrollment.courseTitle}
            </h4>
            {conversation.unreadCount > 0 && (
              <span className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                {conversation.unreadCount}
              </span>
            )}
          </div>
          {conversation.lastMessage && (
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {conversation.lastMessage.content}
            </p>
          )}
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {conversation.enrollment.lecturerName}
          </p>
        </div>
      </div>
    </div>
  )
}

interface MessageBubbleProps {
  message: Message
  isFromStudent: boolean
  showAvatar: boolean
}

function MessageBubble({ message, isFromStudent, showAvatar }: MessageBubbleProps) {
  return (
    <div className={`flex gap-3 ${isFromStudent ? 'flex-row-reverse' : ''}`}>
      {showAvatar ? (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isFromStudent ? 'bg-indigo-600' : 'bg-emerald-600'
        }`}>
          <span className="text-white text-xs font-medium">
            {isFromStudent ? 'Y' : message.senderName.charAt(0)}
          </span>
        </div>
      ) : (
        <div className="w-8" />
      )}
      <div className={`max-w-[70%] ${isFromStudent ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isFromStudent
              ? 'bg-indigo-600 text-white rounded-br-md'
              : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-md'
          }`}
        >
          {!isFromStudent && message.subject && !message.parentMessageId && (
            <p className="text-xs font-semibold mb-1 opacity-75">{message.subject}</p>
          )}
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-2">
          {new Date(message.timestamp).toLocaleString()}
        </span>
      </div>
    </div>
  )
}
