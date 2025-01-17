// (0-1)페치에 중복되는 값 위로 빼놓기
export const tmdbUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc';

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjBmMDIwYjRmYjFiZGQzMjU1YzRmNzA3OWNjOGNmZSIsIm5iZiI6MTczNjMxMzEzOS4yOTEwMDAxLCJzdWIiOiI2NzdlMDkzMzYwMWFjZmU3YmQ0ZTViNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TQLneg9wO2U9u3pj_72s1zU9GcNYq6_9SCB8d9Wxqx0'
  }
};