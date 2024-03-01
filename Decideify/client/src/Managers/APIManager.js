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

const movieSorting = ["popularity.desc", "popularity.asc", "original_title.asc", "original_title.desc", "revenue.asc", "revenue.desc", "primary_release_date.asc", "primary_release_date.desc", "title.asc", "title.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"];
let movieGenres = [
  [28, 1950],
  [12, 1067],
  [16, 551],
  [35, 1165],
  [80, 372],
  [99, 1125],
  [18, 1754],
  [10751, 344],
  [14, 1016],
  [36, 792],
  [27, 2375],
  [10402, 1915],
  [9648, 271],
  [10749, 2441],
  [878, 954],
  [10770, 1198],
  [53, 2156],
  [10752, 505],
  [37, 18]
];
const tvSorting = ["popularity.desc", "popularity.asc", "original_name.asc", "original_name.desc", "name.asc", "name.desc", "first_air_date.asc", "first_air_date.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"];


export const getallbooks = () => {
  let bookAPIDate = randomDate();

    return fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${bookAPIDate}&api-key=${bookapikey}`)
      .then((res) => res.json())
  };

export const getallmovies = (category) => {
    let randomSort = Math.floor(Math.random() * movieSorting.length);
    let movieUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=${movieSorting[randomSort]}`

    if (category?.id !== 55) {
      let randomPage = Math.floor(Math.random() * category?.resultsCount) + 1;
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
      
      return fetch(movieUrl, options)
        .then(response => response.json())
  };

  export const getalltv = () => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const randomSort = Math.floor(Math.random() * tvSorting.length);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExMTZlMzE4ZjY1MTBlMzE4N2Y1YTE0ZGQyODZjNCIsInN1YiI6IjY1YmJkN2U4MmI4YTQzMDE3YjFjMTkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fwxuyXsDPLTWtEDFMV1M5vKy_Y8WCyJrbRofqGr1do4'
        }
      };
      
      return fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&without_genres=10763%7C10767&sort_by=${tvSorting[randomSort]}`, options)
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

  export const discogsTest = () => {

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Discogs key=IXzohifvIfbeLwVUcxaC, secret=yABBTtwmiWEuqgJfRtciQDiTfRmvtbYP`,
          'User-Agent': 'Decideify/1.0 (colinfm88@gmail.com)'
        }
      };
      
      return fetch(`https://api.discogs.com/database/search?style=Rocksteady&format=album&per_page=100&page=1`, options)
        .then(response => response.json())
  };

  