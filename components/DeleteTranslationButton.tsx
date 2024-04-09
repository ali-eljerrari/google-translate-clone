'use client';

import { TrashIcon } from 'lucide-react';
import { Button } from './ui/button';

function DeleteTranslationButton({ id }: { id: string }) {
  return (
    <form>
      <Button
        type='submit'
        variant='outline'
        size='icon'
        className='border-red-500 text-red-500 hover:bg-red-400 hover:text-white'>
        <TrashIcon size={16} />
      </Button>
    </form>
  );
}

export default DeleteTranslationButton;
