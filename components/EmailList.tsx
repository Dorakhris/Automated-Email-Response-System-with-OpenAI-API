
import React from 'react';
import type { Email } from '../types';

interface EmailListItemProps {
  email: Email;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({ email, isSelected, onSelect }) => {
  const time = new Date(email.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <li
      onClick={() => onSelect(email.id)}
      className={`cursor-pointer p-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-150 ${
        isSelected ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
    >
      <div className="flex justify-between items-start">
        <p className={`font-semibold text-gray-800 dark:text-gray-200 ${!email.read && 'font-bold'}`}>
          {email.sender}
        </p>
        <time className="text-xs text-gray-500 dark:text-gray-400">{time}</time>
      </div>
      <p className={`text-sm text-gray-700 dark:text-gray-300 truncate mt-1 ${!email.read && 'font-bold'}`}>{email.subject}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">{email.body}</p>
    </li>
  );
};

interface EmailListProps {
  emails: Email[];
  onSelectEmail: (id: string) => void;
  selectedEmailId: string | null;
}

export const EmailList: React.FC<EmailListProps> = ({ emails, onSelectEmail, selectedEmailId }) => {
  if (emails.length === 0) {
    return <div className="p-4 text-center text-gray-500">No emails here.</div>
  }
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {emails.map(email => (
        <EmailListItem
          key={email.id}
          email={email}
          isSelected={email.id === selectedEmailId}
          onSelect={onSelectEmail}
        />
      ))}
    </ul>
  );
};
