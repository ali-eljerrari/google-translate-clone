'use client';

import { Button } from './ui/button';

function SubmitButton() {
  return (
    <Button
      type='submit'
      className='bg-blue-500 hover:bg-blue-600 w-full lg:w-fit'>
      Translate
    </Button>
  );
}

export default SubmitButton;
