
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { EmailList } from './components/EmailList';
import { EmailView } from './components/EmailView';
import { SettingsView } from './components/SettingsView';
import { WelcomeView } from './components/WelcomeView';
import type { Email, Settings, Folder } from './types';
import { initialEmails } from './constants';

const App: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [settings, setSettings] = useState<Settings>({
    tone: 'Professional',
    signature: 'Best regards,\nDorathy C.',
    approvalMode: true,
  });
  const [activeFolder, setActiveFolder] = useState<Folder>('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);

  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === id ? { ...email, read: true } : email
      )
    );
  };

  const handleUpdateEmail = (updatedEmail: Email) => {
    setEmails(prevEmails =>
      prevEmails.map(email => (email.id === updatedEmail.id ? updatedEmail : email))
    );
    if (updatedEmail.status !== activeFolder) {
      setSelectedEmailId(null);
    }
  };
  
  const unreadCount = useMemo(() => emails.filter(e => e.status === 'inbox' && !e.read).length, [emails]);

  const filteredEmails = useMemo(() => emails.filter(email => email.status === activeFolder).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), [emails, activeFolder]);
  const selectedEmail = useMemo(() => emails.find(email => email.id === selectedEmailId), [emails, selectedEmailId]);

  const MainView: React.FC = () => {
    if (activeFolder === 'settings') {
      return <SettingsView settings={settings} onSettingsChange={setSettings} />;
    }
    if (selectedEmail) {
      return <EmailView email={selectedEmail} settings={settings} onUpdateEmail={handleUpdateEmail} />;
    }
    if(filteredEmails.length > 0) {
       return <WelcomeView message="Select an email to read" />;
    }
    return <WelcomeView message={`Your ${activeFolder} is empty.`} />;
  };

  return (
    <div className="flex h-screen font-sans text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800">
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} unreadCount={unreadCount} onClearSelection={() => setSelectedEmailId(null)} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 xl:w-1/4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <EmailList emails={filteredEmails} onSelectEmail={handleSelectEmail} selectedEmailId={selectedEmailId} />
        </div>
        <main className="flex-1 flex flex-col overflow-y-auto">
          <MainView />
        </main>
      </div>
    </div>
  );
};

export default App;
