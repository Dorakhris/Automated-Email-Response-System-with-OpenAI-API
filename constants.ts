
import type { Email } from './types';

export const initialEmails: Email[] = [
  {
    id: '1',
    sender: 'Client Inc.',
    recipient: 'you@example.com',
    subject: 'Contract and Reschedule Request',
    body: 'Hi, Can you send me the contract and reschedule our call to Friday?',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: false,
    status: 'inbox',
    thread: [
      { sender: 'Client Inc.', body: 'Hi, Can you send me the contract and reschedule our call to Friday?', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() }
    ],
  },
  {
    id: '2',
    sender: 'Sarah (Team)',
    recipient: 'you@example.com',
    subject: 'Quick question about the project deadline',
    body: 'Hey, I was just looking at the project timeline. Do we have any flexibility on the Q3 deadline? A key dependency might be delayed.',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: false,
    status: 'inbox',
    thread: [
       { sender: 'Sarah (Team)', body: 'Hey, I was just looking at the project timeline. Do we have any flexibility on the Q3 deadline? A key dependency might be delayed.', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() }
    ],
  },
  {
    id: '3',
    sender: 'Upwork Notification',
    recipient: 'you@example.com',
    subject: 'New Job Invitation: AI Email Automation Setup',
    body: 'You have been invited to a new job. A client is looking for an expert to set up an automated email response system, similar to the one you built.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    status: 'inbox',
    thread: [
        { sender: 'Upwork Notification', body: 'You have been invited to a new job. A client is looking for an expert to set up an automated email response system, similar to the one you built.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() }
    ],
  },
    {
    id: '4',
    sender: 'Lead from Website',
    recipient: 'you@example.com',
    subject: 'Inquiry about your services',
    body: 'Hello, I found your profile online and was very impressed. We are a small consulting firm struggling with email volume. Could you tell me more about your email automation service and your pricing?',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    status: 'inbox',
    thread: [
        { sender: 'Lead from Website', body: 'Hello, I found your profile online and was very impressed. We are a small consulting firm struggling with email volume. Could you tell me more about your email automation service and your pricing?', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() }
    ],
  },
   {
    id: '5',
    sender: 'James (Past Client)',
    recipient: 'you@example.com',
    subject: 'Re: Final Report',
    body: 'Thanks for the report, it looks great! No revisions needed from my side. It was a pleasure working with you.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    status: 'inbox',
    thread: [
        { sender: 'You', body: 'Hi James, Please find the final project report attached. Let me know if you have any questions.', timestamp: new Date(Date.now() - 3.1 * 24 * 60 * 60 * 1000).toISOString() },
        { sender: 'James (Past Client)', body: 'Thanks for the report, it looks great! No revisions needed from my side. It was a pleasure working with you.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
    ],
  }
];
