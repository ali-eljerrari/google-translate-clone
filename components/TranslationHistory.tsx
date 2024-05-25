const TranslationHistory = ({ history }: any) => {
  return (
    <div className=''>
      <h1 className='text-3xl my-5'>History</h1>

      {/* Show a message if there are no translations */}
      {history.length === 0 && (
        <p className='mb-5 text-black'>No translations yet</p>
      )}

      {/* Show a list of translations */}
      <ul className='divide-y border rounded-md'>
        {history.map((translation: any) => (
          <li
            key={translation._id}
            className='flex justify-between items-center p-5 hover:bg-gray-50 relative'
          >
            <div>
              <p className='text-sm mb-5 text-gray-600'>
                {translation.from}
                {' -> '}
                {translation.to}
              </p>

              <div className='space-y-2 pr-5'>
                <p className='text-black'>{translation.text}</p>
                <p className='text-black'>{translation.translatedText}</p>
              </div>
            </div>

            <p className='text-sm text-gray-300 absolute top-2 right-2'></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TranslationHistory;
