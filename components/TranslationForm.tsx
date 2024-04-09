'use client';

import SubmitButton from './SubmitButton';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

function TranslationForm({ languages }: { languages: any }) {
  return (
    <>
      <form>
        <div className='flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2'>
          <div className='flex-1 space-y-2'>
            <Select
              name='inputLanguage'
              defaultValue='auto'>
              <SelectTrigger className='w-[280px] border-none text-blue-500 font-bold'>
                <SelectValue placeholder='Select a language' />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>

                  <SelectItem
                    key='auto'
                    value='auto'>
                    Auto-Detection
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  {Object.entries(languages.translation).map(
                    ([key, value]: [string, any]) => (
                      <SelectItem
                        key={key}
                        value={key}>
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
            />
          </div>

          <div className='flex-1 space-y-2'>
            <div className='flex items-center justify-between'>
              <Select
                name='outputLanguage'
                defaultValue='es'>
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
                          value={key}>
                          {value.name}
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              className='min-h-32 text-xl bg-gray-50 border-none'
              placeholder='Translation will appear here...'
              name='output'
            />
          </div>
        </div>

        <div className='mt-5 flex justify-end'>
          <SubmitButton />
          <button
            type='submit'
            hidden
          />
        </div>
      </form>
    </>
  );
}

export default TranslationForm;
