// import environment variable in Vite's way
const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = `https://api.datamuse.com`;

// We don't want our components know how data is fetched, and you don't want url hard coded
export const fetchData = async (condition: string, word: string) => {
  // method 1:
  // const res = await fetch(`${API_URL}/words?rel_${condition}=${word}`);
  // const data = await res.json();
  // console.log(data);
  // setReturnedWords(data);

  // Method 2: use .then
  return await fetch(`${API_URL}/words?rel_${condition}=${word}`).then((res) =>
    res.json()
  );
  // we don't need setReturnedWords()
};
