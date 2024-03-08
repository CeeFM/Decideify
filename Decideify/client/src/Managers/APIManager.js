const bookapikey = `vem6bjG9QLoaHhi1cJVquNnoojijS3r1`;
const movietvapikey = `daa116e318f6510e3187f5a14dd286c4`;
const googleAPIkey = `AIzaSyBXJVmtx7PzY99EHDLGlIYoYrJtIHOVUx0`;
const googleSEID = `a5032a5040e67488f`;
const tmbdImageUrl = `https://image.tmdb.org/t/p/w500`;

let start = new Date(2008, 5, 8)
let end = new Date()

const randomDate = () => {
  let randomYear = Math.floor(Math.random() * 17) + 2008;
  let randomMonth = Math.floor(Math.random() * 12) + 1;
  let randomDay = Math.floor(Math.random() * 28) + 1;
  let newRandomDate = new Date(randomYear, randomMonth, randomDay);
  let allGood = false;
  while (allGood === false) {
    if (start < newRandomDate && end > newRandomDate) {
      allGood = true;
    } else {
      randomYear = Math.floor(Math.random() * 17) + 2008;
      randomMonth = Math.floor(Math.random() * 12) + 1;
      randomDay = Math.floor(Math.random() * 28) + 1;
      newRandomDate = new Date(randomYear, randomMonth, randomDay);
    }
  };

  return newRandomDate.toISOString().split('T')[0];
};

const movieSorting = ["popularity.desc", "original_title.asc", "original_title.desc", "revenue.desc", "title.asc", "title.desc", "vote_average.desc", "vote_count.desc"];
let movieGenres = [
  [28, 500],
  [12, 500],
  [16, 500],
  [35, 500],
  [80, 372],
  [99, 500],
  [18, 500],
  [10751, 344],
  [14, 500],
  [36, 500],
  [27, 500],
  [10402, 500],
  [9648, 271],
  [10749, 500],
  [878, 500],
  [10770, 500],
  [53, 500],
  [10752, 500],
  [37, 18]
];
const tvSorting = ["popularity.desc", "original_name.asc", "original_name.desc", "name.asc", "name.desc", "vote_average.desc", "vote_count.desc"];
let tvGenres = [
  [10759, 368],
  [16, 500],
  [35, 500],
  [80, 372],
  [99, 500],
  [18, 500],
  [10751, 344],
  [10762, 219],
  [9648, 271],
  [10764, 500],
  [10765, 320],
  [10766, 106],
  [10768, 90]
];

let musicGenres = ["blues", "brass", "children", "classical", "electronic", "folk", "funk", "hip", "jazz", "latin", "non", "pop", "reggae", "rock", "stage"]


export const getallbooks = () => {
  let bookAPIDate = randomDate();

    return fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${bookAPIDate}&api-key=${bookapikey}`)
      .then((res) => res.json())
  };

export const getallmovies = (category) => {
    let randomSort = Math.floor(Math.random() * movieSorting.length);
    let movieUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_original_language=en&sort_by=${movieSorting[randomSort]}`

    if (category?.id !== 55 && category?.resultsCount < 500) {
      let randomPage = Math.floor(Math.random() * category?.resultsCount) + 1;
      movieUrl += `&with_genres=${category?.externalId}&page=${randomPage}`
    } else if (category?.id !== 55 && category?.resultsCount > 500) {
      let randomPage = Math.floor(Math.random() * 500) + 1;
      movieUrl += `&with_genres=${category?.externalId}&page=${randomPage}`
    } else if (category?.id === 55) {
      let randomNumber = Math.floor(Math.random() * movieGenres.length);
      let randomGenre = movieGenres[randomNumber];
      movieUrl += `&with_genres=${randomGenre[0]}&page=${randomGenre[1]}`
    };

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExMTZlMzE4ZjY1MTBlMzE4N2Y1YTE0ZGQyODZjNCIsInN1YiI6IjY1YmJkN2U4MmI4YTQzMDE3YjFjMTkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fwxuyXsDPLTWtEDFMV1M5vKy_Y8WCyJrbRofqGr1do4'
        }
      };

      console.log(movieUrl);
      
      return fetch(movieUrl, options)
        .then(response => response.json())
  };

  export const getalltv = (category) => {
    const randomSort = Math.floor(Math.random() * tvSorting.length);
    let tvUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&without_genres=10763%7C10767&sort_by=${tvSorting[randomSort]}`

    if (category?.id !== 57 && category?.resultsCount < 500) {
      let randomPage = Math.floor(Math.random() * category?.resultsCount) + 1;
      tvUrl += `&with_genres=${category?.externalId}&page=${randomPage}`
    } else if (category?.id !== 57 && category?.resultsCount > 500) {
      let randomPage = Math.floor(Math.random() * 500) + 1;
      tvUrl += `&with_genres=${category?.externalId}&page=${randomPage}`
    } else if (category?.id === 57) {
      let randomNumber = Math.floor(Math.random() * movieGenres.length);
      let randomGenre = tvGenres[randomNumber];
      tvUrl += `&with_genres=${randomGenre[0]}&page=${randomGenre[1]}`
    };

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExMTZlMzE4ZjY1MTBlMzE4N2Y1YTE0ZGQyODZjNCIsInN1YiI6IjY1YmJkN2U4MmI4YTQzMDE3YjFjMTkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fwxuyXsDPLTWtEDFMV1M5vKy_Y8WCyJrbRofqGr1do4'
        }
      };

      console.log(tvUrl);
      
      return fetch(tvUrl, options)
        .then(response => response.json())
  };


  export const getallmusic = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'User-Agent': 'Decideify/1.0 (colinfm88@gmail.com)',
      },
    };
    
  
    return fetch(`https://musicbrainz.org/ws/2/release-group?query=abbey&limit=100&fmt=json`)
      .then((res) => res.json());
  };

  export const discogsTest = (category) => {
    let randomPage = Math.floor(Math.random() * 100) + 1;
    let genreUrl;

    if (category?.shortName === "random") {
      let genrePicker = Math.floor(Math.random() * musicGenres.length);
      genreUrl = musicGenres[genrePicker];
    } else {
      genreUrl = category?.shortName;
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Discogs key=IXzohifvIfbeLwVUcxaC, secret=yABBTtwmiWEuqgJfRtciQDiTfRmvtbYP`,
          'User-Agent': 'Decideify/1.0 (colinfm88@gmail.com)'
        }
      };
      
      return fetch(`https://api.discogs.com/database/search?genre=${genreUrl}&format=album&per_page=100&page=${randomPage}`, options)
        .then(response => response.json())
  };

  