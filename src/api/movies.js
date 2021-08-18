import {API_HOST, API_KEY, API_LANG} from '../utils/constants';

export async function getNewsMovieApi(page = 1) {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${API_LANG}&page=${page}`;
  // console.log('la url', url);

  // Utilizando async await
  const response = await fetch(url);
  return await response.json();

  // // Utilizando then

  // return fetch(url).then((response) => {
  //   return response.json();
  // }).then((result) => {
  //   return result;
  // })
}

export async function getAllGenresApi() {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${API_LANG}`;
  // console.log('la url', url);

  // Utilizando async await
  const response = await fetch(url);
  return await response.json();

}
export async function getGenreMoviesApi(idGenre) {
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenre}&language=${API_LANG}`;

  // Utilizando async await
  const response = await fetch(url);
  return await response.json();
}

export async function getMovieByIdApi(idMovie) {
  const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${API_LANG}`;
  // console.log('la url', url);

  // Utilizando async await
  const response = await fetch(url);
  return await response.json();
}

export async function getVideoMovieApi(idMovie) {
  const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${API_LANG}`;
  // console.log('la url', url);

  // Utilizando async await
  const response = await fetch(url);
  return await response.json();
}

export async function gePopularMoviesApi(page=1) {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${API_LANG}&page=${page}`;
  // console.log('la url', url);

  // Utilizando async await
  const response = await fetch(url);
  return await response.json();
}

export async function searchMoviesApi(search) {
  const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${API_LANG}&query=${search}`;
  console.log('la url', url);

  // Utilizando async await
  const response = await fetch(url);
  return await response.json();
}