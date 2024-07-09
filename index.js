document.getElementById("searchPost").addEventListener("click", () => {
  const postId = document.getElementById("postId").value;
  if (postId < 1 || postId > 100) {
    alert("ID поста должен быть от 1 до 100");
    return;
  }
  fetchPost(postId);
});

document.getElementById("getComments").addEventListener("click", () => {
  const postId = document.getElementById("postId").value;
  fetchComments(postId);
});

function fetchPost(id) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Пост не найден");
      }
      return response.json();
    })
    .then((post) => {
      displayPost(post);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function displayPost(post) {
  const postBlock = document.getElementById("postBlock");
  postBlock.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
    `;
  document.getElementById("getComments").style.display = "block";
}

function fetchComments(postId) {
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Комментарии не найдены");
      }
      return response.json();
    })
    .then((comments) => {
      displayComments(comments);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function displayComments(comments) {
  const commentsBlock = document.getElementById("commentsBlock");
  commentsBlock.innerHTML = comments
    .map(
      (comment) => `
        <div>
            <h3>${comment.name} (${comment.email})</h3>
            <p>${comment.body}</p>
        </div>
    `
    )
    .join("");
}
