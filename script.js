const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjBmMDIwYjRmYjFiZGQzMjU1YzRmNzA3OWNjOGNmZSIsIm5iZiI6MTczNjMxMzEzOS4yOTEwMDAxLCJzdWIiOiI2NzdlMDkzMzYwMWFjZmU3YmQ0ZTViNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TQLneg9wO2U9u3pj_72s1zU9GcNYq6_9SCB8d9Wxqx0'
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(res => res.json()) //1단계: 응답을 JSON으로 변환
  .then(res => {
    console.log(res);
    console.log(res.results[0].title);

  })  //2단계: 변환된 JSON 데이터 출력
  .catch(err => console.error(err));  //3단계: 에러 처리