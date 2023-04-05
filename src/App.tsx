import { useState } from 'react';
import { fetchData } from './api/fetchData';

type returnedWord = {
  word: string;
  score: number;
};

function App() {
  const [keyword, setKeyword] = useState('');
  const [returnedWords, setReturnedWords] = useState<returnedWord[]>([]);
  const [isloading, setIsloding] = useState(false);

  const handleFetchWords = (e: React.FormEvent) => {
    e.preventDefault();
    // https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript
    // cast e.target to make sure it has .value attribute
    const con = (e.target as HTMLInputElement).value;
    setIsloding(true);
    // Do a little input validation
    if (keyword.trim() === '') {
      alert('Please enter a legit word.');
      setIsloding(false);
      return;
    } else
      fetchData(con, keyword)
        // we don't need to to setReturnedWords(data) here, cos .then passing the data?
        .then(setReturnedWords)
        .then(() => setIsloding(false));
  };

  return (
    <div className='container mx-auto max-w-6xl p-8 min-h-screen'>
      <div className='flex flex-col items-center justify-center text-fontColor space-y-10 mb-10'>
        <h1 className='text-4xl capitalize'>word-finding</h1>
        <form>
          <label htmlFor='word-input' className='mr-4 text-xl'>
            Your word
          </label>
          <input
            id='word-input'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className='px-4 py-2 rounded-lg text-[#203c55]'
          ></input>
          <div className='mt-8 space-x-8'>
            <button
              onClick={handleFetchWords}
              // adding value to differentiate Syn button and ant button
              value={'syn'}
              className='border-2 px-4 py-2 rounded-lg opacity-70 hover:opacity-100 hover:-translate-y-0.5'
            >
              Find Synonyms
            </button>
            <button
              onClick={handleFetchWords}
              // adding value to differentiate Syn button and ant button
              value={'ant'}
              className='border-2 px-4 py-2 rounded-lg opacity-70 hover:opacity-100 hover:-translate-y-0.5'
            >
              Find Antonym
            </button>
          </div>
        </form>
      </div>
      {isloading ? (
        <h2 className='text-fontColor text-center'>Loading ...</h2>
      ) : (
        returnedWords.map((item) => (
          <ul key={crypto.randomUUID()} className='text-left mx-auto max-w-sm'>
            <li
              className='text-fontColor mb-2'
              onDoubleClick={() => setKeyword(item.word)}
            >
              {item.word}
            </li>
          </ul>
        ))
      )}
    </div>
  );
}

export default App;
