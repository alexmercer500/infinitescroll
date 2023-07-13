const box = document.getElementById('box');
let page = 1;
let movieList = [];
async function fetchMovie(pageNumb) {
	const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=df5602b051539edd1f10f620dc143ad1&&page=${pageNumb}`;

	const response = await fetch(apiUrl);
	const data = await response.json();
	showList(data);
}
fetchMovie()
function showList(list) {
	const { results } = list;
	movieList = [...results];
	renderList();
}

function renderList() {
	movieList.forEach(movie => {
		const movieBox = document.createElement('div')
		movieBox.classList = 'movie-box'

		movieBox.innerHTML =
			`
			<div class="img-box">
				<figure title=${movie.title}>
				<img loading="lazy" class="img-place" onload="removeShadow(this)"
				data-src=${`https://image.tmdb.org/t/p/w500//${movie.poster_path}`}
				/></figure>
				<div class="desc">${movie.overview}</div>
			</div>
			<div class='date'>
				<p>${movie.title}</p>
				<p>${new Date(movie.release_date).getFullYear()}</p>
			</div>
		`
		box.appendChild(movieBox);
	});
	observeFunction(movieList.length)
}
function removeShadow (el) {
	el.classList.remove('img-place')
}
const observeCallback = (entries, observer) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			page++
			fetchMovie(page)
			observer.unobserve(entry.target)
		}
	})
}
const imgShow = (entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			let el = entry.target
			let img = el.querySelector('img')
			img.src = img.dataset.src
			imgObsever.unobserve(el)
			img.removeAttribute('data-src', '')
		}
	})
}
const observer = new IntersectionObserver(observeCallback)
const imgObsever = new IntersectionObserver(imgShow)

const observeFunction = (arrayLength) => {
	const allBoxes = [...box.children].splice(-arrayLength)
	observer.observe(allBoxes[allBoxes.length - 1])
	allBoxes.forEach(box => imgObsever.observe(box))
}