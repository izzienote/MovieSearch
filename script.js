// (0-1)페치에 중복되는 값 위로 빼놓기
const tmdbUrl = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNjBmMDIwYjRmYjFiZGQzMjU1YzRmNzA3OWNjOGNmZSIsIm5iZiI6MTczNjMxMzEzOS4yOTEwMDAxLCJzdWIiOiI2NzdlMDkzMzYwMWFjZmU3YmQ0ZTViNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TQLneg9wO2U9u3pj_72s1zU9GcNYq6_9SCB8d9Wxqx0'
  }
};
// (0-2) const 상수 선언 _ html이랑 자바스크립트 연결
const movieContainer = document.getElementById("container");
const searchMovie = document.getElementById("searchMovie");
const movieCards = document.querySelectorAll(".movie-card ");
// (0-3) modal 상수 선언 _ textContent 바꿀 부분
const myTitle = document.querySelector("#myTitle");
const myOverview = document.querySelector("#myOverview");
const myReleaseDate = document.querySelector("#myReleaseDate");
const myVoteRate = document.querySelector("#myVoteRate");
const myPoster = document.querySelector("#myPoster");
// (0-4) 전역 변수 선언 _ fetch한 값을 담는 변수
let movieData = [];
// (0-5) 북마크 상수 선언
const addBookmarkBtn = document.querySelector("#add-bookmark");
const deleteBookmarkBtn = document.querySelector("#delete-bookmark");
const seeBookmarkBtn = document.querySelector(".checked-bookmark");
let bookmarkedMovie = JSON.parse(localStorage.getItem('bookmarkItem')) || [];
//JSON.parse : 결과값을 객체로 반환


// ----------------------fecth 변경 전-------------------------
// (1)가져오는 fecth를 함수로 지정  _____ Before
// function fecthData() {
//   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc', options)
//     .then(res => res.json()) //응답을 JSON으로 변환
//     .then(res => {
//       // console.log(res.results); //콘솔창 확인용
//       const results = res.results;
//       movieData = res.results;  //전역 변수에 값 넣어줘야 find로 찾을때 값을 찾을 수 있음
//       displayPosts(results);
//     })
// };

// ----------------------fecth 변경 후-------------------------
// (1)가져오는 fecth를 함수로 지정 (async/await로 수정완료)
async function fecthData() {

  try {
    const res = await fetch(tmdbUrl, options)
    const res1 = await res.json()
    const results = res1.results;
    movieData = res1.results;  //전역 변수에 값 넣어줘야 find로 찾을때 값을 찾을 수 있음
    displayPosts(results);
  } catch (error) {
    alert("에러가 발생했습니다!");
  }
};
 // -----------------------------------------------------------

// (2)포스팅 리스팅하는 fecth
function displayPosts(results) {
  // 기존 콘텐츠 지우기****
  movieContainer.innerHTML = '';

  results.forEach((movie) => {

    const movieItem = document.createElement('li');
    movieItem.className = 'movie-card no_dot';
    movieItem.setAttribute('data_id', movie.id);  // 영화 id를 data-id로 설정
    movieItem.innerHTML = `
  <li>
    <img class="movie-image" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="이미지를 찾을 수 없습니다" height="280px">
  </li>
  <li class="movie-name">${movie.title}</li>
  <h6 class="movie-name hide">${movie.original_title}</h6>
  <li class="movie-rate">평점⭐️ : ${movie.vote_average}</li>
  <li class="hide">${movie.id}</li>
  `;

    movieContainer.appendChild(movieItem);
  });
}

fecthData();

// (3)인풋창에 입력이 확인되면 -> 필터링 된 데이터를 보여줘라 부분
searchMovie.addEventListener("change", function () {
  // alert("체인지 변화 감지");
  const keyword = searchMovie.value;

  //데이터를 다시 페치해서 필터링된 결과 표시
  // ----------------------fecth 변경 전-------------------------
  // fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc', options)
  //   .then(res => res.json()) //응답을 JSON으로 변환
  //   .then(res1 => {
  //     const results = res1.results;

  //     // 키워드에 맞는 영화 필터링하기
  //     const filteredPosts = results.filter(function (movie) {
  //       return movie.title.includes(keyword);
  //     });
  //     //필터링된 결과표시
  //     displayPosts(filteredPosts);
  //   })

  // ----------------------fecth 변경 후-------------------------
  async function getFilteredData() {
    try {
      const res = await fetch(tmdbUrl, options)
      const res1 = await res.json()
      const results = res1.results;
      // 키워드에 맞는 영화 필터링하기
      const filteredPosts = results.filter(function (movie) {
        return movie.title.includes(keyword);
      });
      //필터링된 결과표시
      displayPosts(filteredPosts);
    } catch (error) {
      alert("에러가 발생했습니다!");
    }

  };
  getFilteredData();

});

//(4) 클릭되면-> 상세페이지를 보여줘
movieContainer.addEventListener("click", function (event) {
  const movieCard = event.target.closest('.movie-card'); // 클릭한 요소가 movie-card인지 확인


  if (movieCard) { // 클릭한 요소가 movie-card일 경우
    const movieId = movieCard.getAttribute("data_id");

    // **여기서 addBookmarkBtn.onclick으로 수정**하여 이벤트 리스너를 한 번만 등록
    addBookmarkBtn.onclick = function () {
      addBookmark(movieId);
    };

    // [방법1] 여기에서 무비 아이디랑 일치하는 아이 찾아서, 모달의 textContents를 바꿔줘라!
    // find로 찾은 값이 속해 있는 객체를 return함
    const selectedMovie = movieData.find(function (movieData) {
      return movieData.id.toString() === movieId;
    });

    // 선택된 무비의 정보에 맞춰서 modal 텍스트 바꿔주기
    if (selectedMovie) {
      myPoster.src = `https://image.tmdb.org/t/p/w400${selectedMovie.poster_path}`;
      myTitle.textContent = selectedMovie.title;
      myOverview.textContent = selectedMovie.overview;
      myReleaseDate.textContent = `개봉일 : ${selectedMovie.release_date}`;
      myVoteRate.textContent = `평점⭐️ : ${selectedMovie.vote_average}`;
    }
    toggleModal();
  }
});


//(5-1) 모달 열고 닫기
const modal = document.querySelector(".modal");
const modalOpenBtn = document.querySelector(".modal-btn");
const modalCloseBtn = document.querySelector(".close-btn");
const toggleModal = function () {
  modal.classList.toggle("hide");
};

modalCloseBtn.addEventListener("click", function () {
  toggleModal();
});


// ------------------------------------------------------------
// (6) 북마크 보기 버튼 클릭 시, getBookmark 함수 실행
seeBookmarkBtn.addEventListener("click", function () {
  showBookmark()
});

// ------------------------------------------------------------

// (7-1) 북마크 add 함수 ()
function addBookmark(movieId) {
  movieId = Number(movieId);

  if (!bookmarkedMovie.includes(movieId)) {
    bookmarkedMovie.push(movieId);
    localStorage.setItem('bookmarkItem', JSON.stringify(bookmarkedMovie));
    alert("북마크 추가 성공!");
  }
  else {
    alert("이미 북마크에 추가된 영화입니다. 다른 영화를 선택해주세요");
  }
};

// ------------------------------------------------------------
// (7-2) 북마크 delete 함수 ()
function deleteBookmark(movieId) {
  movieId = Number(movieId);
  console.lot(movieId);

  if (bookmarkedMovie.includes(movieId)) {
    localStorage.removeItem('bookmarkItem');
    alert("북마크 취소 성공!");
  }
  else {
    alert("추가된 북마크에서 취소할 북마크가 없습니다");
  }
};

// ------------------------------------------------------------

// (7-3) 북마크 show 함수 (북마크된 영화만 다시 리스팅)
function showBookmark() {
  // 북마크된 영화들ID에 대한 상수 선언 및 movieData(페치한 데이터)에서 찾기
  const bookmarkedMovies = movieData.filter(function (movie) {
    return bookmarkedMovie.includes(movie.id);
  });

  // 북마크된 영화 보여주기
  displayBookmarkedPosts(bookmarkedMovies);
}
// ------------------------------------------------------------

// (8) 북마크된 포스트 리스트 만들기
function displayBookmarkedPosts(movieId) {
  movieContainer.innerHTML = '';

  movieId.forEach((movie) => {

    const movieItem = document.createElement('li');
    movieItem.className = 'movie-card no_dot';
    movieItem.setAttribute('data_id', movie.id);  // 영화 id를 data-id로 설정
    movieItem.innerHTML = `
  <li>
    <img class="movie-image" src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="이미지를 찾을 수 없습니다" height="280px">
  </li>
  <li class="movie-name">${movie.title}</li>
  <h6 class="movie-name hide">${movie.original_title}</h6>
  <li class="movie-rate">평점⭐️ : ${movie.vote_average}</li>
  <li class="">${movie.id}</li>
  `;

    movieContainer.appendChild(movieItem);
  });
}
