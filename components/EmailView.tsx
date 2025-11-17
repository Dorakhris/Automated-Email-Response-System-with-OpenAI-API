
import React, { useState, useEffect, useCallback } from 'react';
import type { Email, Settings, Message } from '../types';
import { generateReply } from '../services/geminiService';
import { SparklesIcon, SentIcon, LoadingSpinner } from './icons';

interface EmailViewProps {
  email: Email;
  settings: Settings;
  onUpdateEmail: (email: Email) => void;
}

const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const time = new Date(message.timestamp).toLocaleString();
  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <div className="font-semibold text-gray-800 dark:text-gray-200">{message.sender}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{time}</div>
      </div>
      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{message.body}</div>
    </div>
  );
};

export const EmailView: React.FC<EmailViewProps> = ({ email, settings, onUpdateEmail }) => {
  const [replyText, setReplyText] = useState(email.draft || '');
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    setReplyText(email.draft || '');
  }, [email]);

  const handleGenerateReply = useCallback(async () => {
    setIsGenerating(true);
    try {
      const generatedText = await generateReply(email, settings);
      setReplyText(generatedText);
    } catch (error) {
      setReplyText("Failed to generate reply.");
    } finally {
      setIsGenerating(false);
    }
  }, [email, settings]);

  const handleSaveDraft = () => {
    onUpdateEmail({ ...email, draft: replyText, status: 'draft' });
  };

  const handleSend = () => {
    const newThreadMessage: Message = {
      sender: email.recipient,
      body: `Hi ${email.sender.split(' ')[0]},\n\n${replyText}\n\n${settings.signature}`,
      timestamp: new Date().toISOString()
    };
    onUpdateEmail({
      ...email,
      status: 'sent',
      draft: '',
      thread: [...email.thread, newThreadMessage]
    });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{email.subject}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">From: {email.sender}</p>
      </header>
      <div className="flex-1 p-4 overflow-y-auto">
        {email.thread.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="font-semibold text-gray-600 dark:text-gray-300 mb-2">Reply</div>
        <textarea
          className="w-full h-40 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="AI will draft a reply here..."
        />
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handleGenerateReply}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isGenerating ? <LoadingSpinner /> : <SparklesIcon className="h-5 w-5 mr-2" />}
            {isGenerating ? 'Generating...' : 'Generate Reply'}
          </button>
          <div className="flex gap-2">
            <button
                onClick={handleSaveDraft}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Save Draft
            </button>
            <button
              onClick={handleSend}
              disabled={!replyText}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <SentIcon className="h-5 w-5 mr-2" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
