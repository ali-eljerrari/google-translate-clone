'use client';

import { useState } from 'react';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { Button } from './ui/button';
import TranslationHistory from './TranslationHistory';
import { v4 as uuidv4 } from 'uuid';

const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
const endpoint = process.env.NEXT_PUBLIC_AZURE_ENDPOINT;
const location = process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME;

function TranslationForm({ languages }: { languages: any }) {
  const [text, setText] = useState('');
  const [to, setTo] = useState('ar');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any>([]);

  const fetchData = async () => {
    if (!text || !to) return;

    try {
      setLoading(true);
      const response = await axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
        },
        params: {
          'api-version': '3.0',
          to: to,
        },
        data: [
          {
            text: text,
          },
        ],
        responseType: 'json',
      });

      setTranslatedText(response.data[0].translations[0].text);

      const historyData = [
        ...history,
        {
          _id: uuidv4(),
          from: response.data[0].detectedLanguage.language,
          to: to,
          text: text,
          translatedText: response.data[0].translations[0].text,
        },
      ];

      setHistory(historyData.reverse());
      setText('');

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const translate = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchData();
  };

  const handleValueChange = (value: string) => {
    setTo(value);
    setTranslatedText('');
  };

  return (
    <>
      <form onSubmit={translate}>
        <div className='flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2'>
          <div className='flex-1 space-y-2'>
            <Select
              name='inputLanguage'
              defaultValue='auto'
            >
              <SelectTrigger className='w-[280px] border-none text-blue-500 font-bold'>
                <SelectValue placeholder='Select a language' />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>

                  <SelectItem
                    key='auto'
                    value='auto'
                  >
                    Auto-Detection
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {Object.entries(languages.translation).map(
                    ([key, value]: [string, any]) => (
                      <SelectItem
                        key={key}
                        value={key}
                      >
                        {value.name}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Textarea
              placeholder='Type your message here.'
              className='min-h-32 text-xl'
              name='input'
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (!e.target.value) {
                  setTranslatedText('');
                }
              }}
            />
          </div>

          <div className='flex-1 space-y-2'>
            <div className='flex items-center justify-between'>
              <Select
                name='outputLanguage'
                defaultValue='ar'
                onValueChange={handleValueChange}
              >
                <SelectTrigger className='w-[280px] border-none text-blue-500 font-bold'>
                  <SelectValue placeholder='Select a language' />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    {Object.entries(languages.translation).map(
                      ([key, value]: [string, any]) => (
                        <SelectItem
                          key={key}
                          value={key}
                        >
                          {value.name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              className={`min-h-32 text-xl bg-gray-50 border-none text-black ${
                to === 'ar' && translatedText && text ? 'text-right' : ''
              }`}
              style={{
                opacity: '1 !important',
                color: '#000000',
                direction: to === 'ar' ? 'rtl' : 'ltr',
              }}
              placeholder={
                to === 'ar'
                  ? 'ستظهر الترجمة هنا...'
                  : 'Translation will appear here...'
              }
              name='output'
              disabled
              value={translatedText}
              onChange={(e) => setTranslatedText(e.target.value)}
            />
          </div>
        </div>

        <div className='mt-5 flex justify-end'>
          <Button
            type='submit'
            disabled={loading}
            className='bg-blue-500 hover:bg-blue-600 w-full lg:w-fit'
          >
            {loading ? 'Translating...' : 'Translate'}
          </Button>
          <button
            type='submit'
            hidden
          />
        </div>
      </form>
      <TranslationHistory history={history} />
    </>
  );
}

export default TranslationForm;
