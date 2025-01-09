const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjBmMDIwYjRmYjFiZGQzMjU1YzRmNzA3OWNjOGNmZSIsIm5iZiI6MTczNjMxMzEzOS4yOTEwMDAxLCJzdWIiOiI2NzdlMDkzMzYwMWFjZmU3YmQ0ZTViNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TQLneg9wO2U9u3pj_72s1zU9GcNYq6_9SCB8d9Wxqx0'
  }
};


const movieCard = document.getElementById("movieCard");
console.log(movieCard);


fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc', options)
  .then(res => res.json()) //1단계: 응답을 JSON으로 변환
  .then(res => {
    console.log(res.results);
    const results = res.results;

    results.forEach(movie => {
      movieCard.innerHTML += `<div class="movie-card">
    <div id="movieImage">
      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="이미지를 찾을 수 없습니다">
    </div>
    <div id="movieName">${movie.title}</div>
    <div id="movieRate">평점 : ${movie.vote_average}</div>
  </div>`;
    });
    console.log(res.results[0].title);
    movieName.innerHTML = res.results[0].title;
    console.log(res.results[0].id);
    console.log(res.results[0].vote_average);
    console.log(res.results[0].poster_path);

  })  //2단계: 변환된 JSON 데이터 출력
  .catch(err => console.error(err));  //3단계: 에러 처리
