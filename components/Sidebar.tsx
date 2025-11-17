
import React from 'react';
import type { Folder } from '../types';
import { InboxIcon, SentIcon, DraftIcon, SettingsIcon } from './icons';

interface SidebarProps {
  activeFolder: Folder;
  setActiveFolder: (folder: Folder) => void;
  unreadCount: number;
  onClearSelection: () => void;
}

// FIX: Export the Sidebar component so it can be imported in App.tsx.
export const Sidebar: React.FC<SidebarProps> = ({ activeFolder, setActiveFolder, unreadCount, onClearSelection }) => {
  
  const handleFolderChange = (folder: Folder) => {
    setActiveFolder(folder);
    onClearSelection();
  }

  const navItems = [
    { id: 'inbox', label: 'Inbox', icon: InboxIcon, count: unreadCount },
    { id: 'sent', label: 'Sent', icon: SentIcon },
    { id: 'draft', label: 'Drafts', icon: DraftIcon },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="w-16 md:w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="flex items-center justify-center md:justify-start md:px-4 h-16 border-b border-gray-200 dark:border-gray-700">
        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <h1 className="hidden md:block ml-3 text-xl font-bold text-gray-800 dark:text-white">Email AI</h1>
      </div>
      <ul className="flex-1 py-4">
        {navItems.map(item => (
          <li key={item.id} className="px-2 md:px-4">
            <button
              onClick={() => handleFolderChange(item.id as Folder)}
              className={`flex items-center justify-center md:justify-start w-full h-12 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeFolder === item.id
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="hidden md:block ml-4 flex-1 text-left">{item.label}</span>
              {item.count && item.count > 0 ? (
                <span className="hidden md:block bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
