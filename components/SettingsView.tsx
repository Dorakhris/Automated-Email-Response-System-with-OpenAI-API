
import React from 'react';
import type { Settings, Tone } from '../types';

interface SettingsViewProps {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSettingsChange }) => {
  const tones: Tone[] = ['Professional', 'Friendly', 'Direct', 'Casual'];

  return (
    <div className="p-8 h-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Settings</h2>
      <div className="space-y-8 max-w-lg">
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Response Tone
          </label>
          <select
            id="tone"
            value={settings.tone}
            onChange={(e) => onSettingsChange({ ...settings, tone: e.target.value as Tone })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {tones.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Set the default personality for AI-generated replies.</p>
        </div>

        <div>
          <label htmlFor="signature" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Signature
          </label>
          <textarea
            id="signature"
            rows={3}
            value={settings.signature}
            onChange={(e) => onSettingsChange({ ...settings, signature: e.target.value })}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Your signature will be automatically appended to all replies.</p>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="approvalMode"
              type="checkbox"
              checked={settings.approvalMode}
              onChange={(e) => onSettingsChange({ ...settings, approvalMode: e.target.checked })}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="approvalMode" className="font-medium text-gray-700 dark:text-gray-300">
              Manual Approval Mode
            </label>
            <p className="text-gray-500 dark:text-gray-400">
              When enabled, AI replies are saved as drafts for you to review before sending. When disabled, replies would be sent automatically (feature simulated).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
