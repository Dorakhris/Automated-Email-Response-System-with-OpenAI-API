
export interface Message {
  sender: string;
  body: string;
  timestamp: string;
}

export type EmailStatus = 'inbox' | 'sent' | 'draft';

export interface Email {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  status: EmailStatus;
  thread: Message[];
  draft?: string;
}

export type Tone = 'Professional' | 'Friendly' | 'Direct' | 'Casual';

export interface Settings {
  tone: Tone;
  signature: string;
  approvalMode: boolean;
}

export type Folder = EmailStatus | 'settings';
