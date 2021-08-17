import { API_HOST, API_KEY, API_LANG } from '../utils/constants';

export async function getNewsMovieApi(page = 1) {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${API_LANG}&page=${page}`;
  console.log('la url', url);

  // Utilizando async await
  const response = await fetch(url)
  return await response.json();

  // // Utilizando then 
  
  // return fetch(url).then((response) => {
  //   return response.json();
  // }).then((result) => {
  //   return result;
  // })
}
