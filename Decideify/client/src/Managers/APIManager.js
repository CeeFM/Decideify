const bookapikey = `vem6bjG9QLoaHhi1cJVquNnoojijS3r1`;
const movietvapikey = `daa116e318f6510e3187f5a14dd286c4`;
const googleAPIkey = `AIzaSyBXJVmtx7PzY99EHDLGlIYoYrJtIHOVUx0`;
const googleSEID = `a5032a5040e67488f`;
const tmbdImageUrl = `https://image.tmdb.org/t/p/w500`;

export const getallbooks = () => {
    return fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${bookapikey}`)
      .then((res) => res.json())
  };

export const getallmovies = () => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExMTZlMzE4ZjY1MTBlMzE4N2Y1YTE0ZGQyODZjNCIsInN1YiI6IjY1YmJkN2U4MmI4YTQzMDE3YjFjMTkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fwxuyXsDPLTWtEDFMV1M5vKy_Y8WCyJrbRofqGr1do4'
        }
      };
      
      return fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${randomNumber}`, options)
        .then(response => response.json())
  };

  export const getalltv = () => {
    const randomNumber = Math.floor(Math.random() * 500) + 1;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWExMTZlMzE4ZjY1MTBlMzE4N2Y1YTE0ZGQyODZjNCIsInN1YiI6IjY1YmJkN2U4MmI4YTQzMDE3YjFjMTkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fwxuyXsDPLTWtEDFMV1M5vKy_Y8WCyJrbRofqGr1do4'
        }
      };
      
      return fetch(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${randomNumber}`, options)
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
  
    return fetch(`https://musicbrainz.org/ws/2/release-group?query=abbey&limit=100&offset=25&fmt=json`)
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
      
      return fetch(`https://api.discogs.com/database/search?q=Nirvana`, options)
        .then(response => response.json())
  };


  export const getalbumcover = (albumid) => {
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     accept: 'application/json',
    //     'User-Agent': 'Decideify/1.0 (colinfm88@gmail.com)',
    //   },
    // };
  
    return fetch(`https://coverartarchive.org/release/${albumid}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        host: 'coverartarchive.org'
      }
    })
      .then(res => {
        if (res.status === 307) {
          const redirectUrl = res.headers.get('Location');
          return fetch(redirectUrl, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              host: 'archive.org'
            },
          });
        } else if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json();
      });
  };
  