// 값 가져오기
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjBmMDIwYjRmYjFiZGQzMjU1YzRmNzA3OWNjOGNmZSIsIm5iZiI6MTczNjMxMzEzOS4yOTEwMDAxLCJzdWIiOiI2NzdlMDkzMzYwMWFjZmU3YmQ0ZTViNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TQLneg9wO2U9u3pj_72s1zU9GcNYq6_9SCB8d9Wxqx0'
  }
};
const movieContainer = document.getElementById("container");
const searchMovie = document.getElementById("searchMovie");


// (1)가져오는 페치를 함수로 지정
function fecthData() {
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc', options)
    .then(res => res.json()) //응답을 JSON으로 변환
    .then(res => {
      console.log(res.results); //콘솔창 확인용
      const results = res.results;

      displayPosts(results);
    })
}


// 포스팅 리스팅하는 페치
function displayPosts(results) {
  // 기존 콘텐츠 지우기****
  movieContainer.innerHTML = '';

  results.forEach((movie) => {
    //새로운 div 생성
    const movieItem = document.createElement('li');
    //div안의 클래스이름 설정
    movieItem.className = 'movie-card no_dot';
    //div안에 들어갈 innerHTML에 필요한 데이터 리터널 넣어서 작성
    movieItem.innerHTML = `
  <li>
    <img class="movie-image" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="이미지를 찾을 수 없습니다" height="280px">
  </li>
  <li class="movie-name">${movie.title}</li>
  <h6 class="movie-name">${movie.original_title}</h6>
  <li class="movie-rate">평점⭐️ : ${movie.vote_average}</li>
  `;
    // appendChild로 movieContainer의 자식(child)요소로 붙여줌
    movieContainer.appendChild(movieItem);
  });
}

fecthData();



// 인풋창에 입력이 확인되면 -> 필터링 된 데이터를 보여줘라 부분
searchMovie.addEventListener("change", function () {
  // alert("체인지 변화 감지");
  const keyword = searchMovie.value;

  //데이터를 다시 페치해서 필터링된 결과 표시
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko&page=1&sort_by=popularity.desc', options)
    .then(res => res.json()) //응답을 JSON으로 변환
    .then(res => {
      const results = res.results;

      // 키워드에 맞는 영화 필터링하기
      const filteredPosts = results.filter(function (movie) {
        return movie.title.includes(keyword);
      });


      //필터링된 결과표시
      displayPosts(filteredPosts);
    })
});
