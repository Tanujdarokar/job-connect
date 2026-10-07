import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Send, User, Bot, Sparkles, MessageSquare, Clock } from 'lucide-react';
import Card from '../../../core/components/Card';
import Button from '../../../core/components/Button';
import chatService from '../services/chatService';

export const ChatPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      chatService.getUserChats(user.id).then((data) => {
        setChats(data);
        if (data.length > 0 && !activeChat) {
          setActiveChat(data[0]);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChat) return;

    const textToSend = messageText;
    setMessageText('');

    try {
      const { chat: updatedChat } = await chatService.sendMessage(
        activeChat.id,
        user.id,
        textToSend
      );

      setActiveChat({ ...updatedChat });
      setChats(chats.map((c) => (c.id === updatedChat.id ? updatedChat : c)));

      // Trigger simulated recruiter/seeker auto-reply
      const otherParticipant = activeChat.participants.find((p) => p !== user.id);
      if (otherParticipant) {
        setIsTyping(true);
        setTimeout(async () => {
          const { chat: repliedChat } = await chatService.simulateAutoReply(
            activeChat.id,
            otherParticipant
          );
          setIsTyping(false);
          setActiveChat({ ...repliedChat });
          setChats(chats.map((c) => (c.id === repliedChat.id ? repliedChat : c)));
        }, 1200);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-10rem)] rounded-3xl bg-white dark:bg-dark-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
      {/* Left Conversations List */}
      <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-600" />
            Messages
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {chats.map((chat) => {
            const isActive = activeChat?.id === chat.id;
            return (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                  isActive
                    ? 'bg-brand-50/60 dark:bg-brand-950/40'
                    : 'hover:bg-slate-50 dark:hover:bg-dark-850'
                }`}
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {chat.jobTitle.slice(0, 1)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {chat.jobTitle}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {new Date(chat.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Window */}
      {activeChat ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {activeChat.jobTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Direct Candidate & Recruiter Messaging Channel
              </p>
            </div>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {activeChat.messages?.map((msg) => {
              const isMe = msg.senderId === user?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-md rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md rounded-br-none'
                        : 'bg-slate-100 dark:bg-dark-850 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/60 dark:border-slate-800'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span
                      className={`text-[10px] block mt-1 ${
                        isMe ? 'text-brand-200 text-right' : 'text-slate-400'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-dark-850 px-3.5 py-2 rounded-2xl text-xs text-slate-400 flex items-center gap-1.5 animate-pulse">
                  <span>Typing reply...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-dark-850 px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            />
            <Button type="submit" variant="primary" size="md" icon={Send}>
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-slate-400">
          Select a conversation from the left to start messaging.
        </div>
      )}
    </div>
  );
};

export default ChatPage;
