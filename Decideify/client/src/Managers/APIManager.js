const bookapikey = `vem6bjG9QLoaHhi1cJVquNnoojijS3r1`;
const movietvapikey = `daa116e318f6510e3187f5a14dd286c4`;
const googleAPIkey = `AIzaSyBXJVmtx7PzY99EHDLGlIYoYrJtIHOVUx0`;
const googleSEID = `a5032a5040e67488f`;
const tmbdImageUrl = `https://image.tmdb.org/t/p/w500`;

let start = new Date(2008, 5, 8)
let end = new Date()

const randomDate = () => {
  let randomYear = Math.floor(Math.random() * (17)) + 2008;
  let randomMonth = Math.floor(Math.random() * (12)) + 1;
  let randomDay = Math.floor(Math.random() * (28)) + 1;
  let newRandomDate = new Date(randomYear, randomMonth, randomDay);
  let allGood = false;
  while (allGood === false) {
    if (start < newRandomDate && end > newRandomDate) {
      allGood = true;
    } else {
      randomYear = Math.floor(Math.random() * (2024 - 2008 + 1)) + 2008;
      randomMonth = Math.floor(Math.random() * (12)) + 1;
      randomDay = Math.floor(Math.random() * (28)) + 1;
      newRandomDate = new Date(randomYear, randomMonth, randomDay);
    }
  };

  return newRandomDate.toISOString().split('T')[0];
}

const movieSorting = ["popularity.desc", "popularity.asc", "original_title.asc", "original_title.desc", "revenue.asc", "revenue.desc", "primary_release_date.asc", "primary_release_date.desc", "title.asc", "title.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"];
const tvSorting = ["popularity.desc", "popularity.asc", "original_name.asc", "original_name.desc", "name.asc", "name.desc", "first_air_date.asc", "first_air_date.desc", "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"];


export const getallbooks = () => {
  let bookAPIDate = randomDate();

    return fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?published_date=${bookAPIDate}&api-key=${bookapikey}`)
      .then((res) => res.json())
  };

export const getallmovies = () => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    const randomSort = Math.floor(Math.random() * movieSorting.length);

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExMTZlMzE4ZjY1MTBlMzE4N2Y1YTE0ZGQyODZjNCIsInN1YiI6IjY1YmJkN2U4MmI4YTQzMDE3YjFjMTkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fwxuyXsDPLTWtEDFMV1M5vKy_Y8WCyJrbRofqGr1do4'
        }
      };
      
      return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&with_genres=37&page=1&sort_by=${movieSorting[randomSort]}`, options)
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
      
      return fetch(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&with_genres=37&without_genres=10763%7C10767&sort_by=${tvSorting[randomSort]}`, options)
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


  // export const getalbumcover = (albumid) => {
  //   // const options = {
  //   //   method: 'GET',
  //   //   headers: {
  //   //     accept: 'application/json',
  //   //     'User-Agent': 'Decideify/1.0 (colinfm88@gmail.com)',
  //   //   },
  //   // };
  
  //   return fetch(`https://coverartarchive.org/release/${albumid}`, {
  //     method: 'GET',
  //     headers: {
  //       accept: 'application/json',
  //       host: 'coverartarchive.org'
  //     }
  //   })
  //     .then(res => {
  //       if (res.status === 307) {
  //         const redirectUrl = res.headers.get('Location');
  //         return fetch(redirectUrl, {
  //           method: 'GET',
  //           headers: {
  //             accept: 'application/json',
  //             host: 'archive.org'
  //           },
  //         });
  //       } else if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`)
  //       }
  //       return res.json();
  //     });
  // };
  