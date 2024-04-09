import TranslationForm from '@/components/TranslationForm';
import TranslationHistory from '@/components/TranslationHistory';

export default async function Home() {
  const response = await fetch(
    'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0',
    {
      next: {
        revalidate: 60 * 60 * 24
      }
    }
  );

  const languages = await response.json();

  return (
    <main className='flex flex-col'>
      <div className='px-10 xl:px-0 mb-20'>
        <TranslationForm languages={languages} />
        <TranslationHistory />
      </div>
    </main>
  );
}
