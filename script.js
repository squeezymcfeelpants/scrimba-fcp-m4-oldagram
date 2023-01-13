const postsData = [
	{
		name: "Vincent van Gogh",
		username: "vincey1853",
		location: "Zundert, Netherlands",
		avatar: "images/avatar-vangogh.jpg",
		post: "images/post-vangogh.jpg",
		comment: "just took a few mushrooms lol",
		likes: 21
	},
	{
		name: "Gustave Courbet",
		username: "gus1819",
		location: "Ornans, France",
		avatar: "images/avatar-courbet.jpg",
		post: "images/post-courbet.jpg",
		comment: "i'm feelin a bit stressed tbh",
		likes: 4
	},
	{
		name: "Joseph Ducreux",
		username: "jd1735",
		location: "Paris, France",
		avatar: "images/avatar-ducreux.jpg",
		post: "images/post-ducreux.jpg",
		comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
		likes: 152
	}
];

// build a working copy (model) of the posts data, augmented with additional data for identification and for tracking like state
function generateWorkingPostsData(posts) {
	return posts.map((p) => ({ ...p, uuid: UUIDGeneratorBrowser(), liked: false }));
}

// build a single chunk of html from the passed data (data should be in the working model format)
function buildArticlesHTML(posts) {
	let html = '';

	posts.forEach((p) => {
		const { name, username, location, avatar, post, comment, likes, uuid } = p;

		html += `
			<article class="post" data-uuid="${uuid}">
				<header class="post-header">
					<img class="avatar-img" src="${avatar}" alt="poster avatar">
					<div class="poster-info">
						<p class="poster-name">${name}</p>
						<p class="poster-location">${location}</p>
					</div>
				</header>
				<img class="post-img" src="${post}" alt="poster image">
				<div class="icon-row">
					<div class="icon-flipper like-btn" data-liked="no">
						<img class="icon" src="images/icon-heart.png" data-liked="no" alt="like icon">
						<img class="icon" src="images/icon-heart-hover.png" data-liked="yes" alt="like icon, hilighted">
					</div>
					<img class="icon" src="images/icon-comment.png" alt="comment icon">
					<img class="icon" src="images/icon-dm.png" alt="share icon">
				</div>
				<div class="post-interactions">
					<p class="post-likes"><span>${likes}</span> likes</p>
					<div class="post-comments">
						<p class="post-comment"><span class="bold">${username}</span> ${comment}</p>
					</div>
				</div>
			</article>
		`;
	});

	return html;
}

// generate a random uuid (found on web)
function UUIDGeneratorBrowser() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
	);
}

//
function handleLikeUnlike(ev) {
	ev.stopPropagation();

	const postRoot = ev.currentTarget.closest('.post');
	const postData = workingData.find((p) => (p.uuid == postRoot.dataset.uuid));

	if (postData) {
		// update model
		postData.liked = !postData.liked;
		postData.likes += (postData.liked ? 1 : -1);

		// update view from model
		postRoot.querySelector('.post-likes span').textContent = postData.likes;
		postRoot.querySelector('.like-btn').dataset.liked = postData.liked ? 'yes' : 'no';
	}
}

//====================================================================

// build a working model the client will use for the session
const workingData = generateWorkingPostsData(postsData);

// build html from posts data and update the view
document.getElementById('articles').innerHTML = buildArticlesHTML(workingData);

// install click listeners for the like buttons
document.querySelectorAll('.like-btn').forEach((el) => {
	el.addEventListener('click', handleLikeUnlike);
});

// install click listeners for the post image
document.querySelectorAll('.post-img').forEach((el) => {
	el.addEventListener('dblclick', handleLikeUnlike);
});


