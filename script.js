 const formulario = document.getElementById("formulario");
const feed = document.getElementById("feed");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const avatar = document.getElementById("avatar").value;
  const contenido = document.getElementById("contenido").value;
  const seccion = document.getElementById("seccion").value;
  const imagenInput = document.getElementById("imagen");

  const post = document.createElement("div");
  post.className = "post";
  post.dataset.seccion = seccion;

  const avatarElem = document.createElement("div");
  avatarElem.className = "avatar";
  avatarElem.textContent = `${avatar} ${usuario}`;

  const contenidoElem = document.createElement("p");
  contenidoElem.textContent = contenido;

  const fecha = document.createElement("div");
  fecha.className = "fecha";
  const ahora = new Date();
  fecha.textContent = `Publicado el ${ahora.toLocaleDateString()} a las ${ahora.toLocaleTimeString()}`;

  post.appendChild(avatarElem);
  post.appendChild(contenidoElem);
  post.appendChild(fecha);

  if (imagenInput.files.length > 0) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(imagenInput.files[0]);
    post.appendChild(img);
  }

  const likesDiv = document.createElement("div");
  likesDiv.className = "likes";

  const likeBtn = document.createElement("button");
  likeBtn.textContent = "❤️ Me gusta";

  const likeCount = document.createElement("span");
  likeCount.textContent = " 0";

  let likes = 0;
  likeBtn.addEventListener("click", () => {
    likes++;
    likeCount.textContent = " " + likes;
  });

  likesDiv.appendChild(likeBtn);
  likesDiv.appendChild(likeCount);
  post.appendChild(likesDiv);

  const comentariosDiv = document.createElement("div");
  comentariosDiv.className = "comentarios";

  const inputComentario = document.createElement("input");
  inputComentario.placeholder = "Escribir un comentario...";

  const botonComentario = document.createElement("button");
  botonComentario.textContent = "Comentar";

  const listaComentarios = document.createElement("div");

  botonComentario.addEventListener("click", () => {
    if (inputComentario.value.trim() !== "") {
      const nuevoComentario = document.createElement("p");
      nuevoComentario.textContent = "🗨️ " + inputComentario.value;
      listaComentarios.appendChild(nuevoComentario);
      inputComentario.value = "";
    }
  });

  comentariosDiv.appendChild(inputComentario);
  comentariosDiv.appendChild(botonComentario);
  comentariosDiv.appendChild(listaComentarios);
  post.appendChild(comentariosDiv);

  feed.prepend(post);
  formulario.reset();
});

function filtrarSeccion(seccion) {
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    post.style.display = post.dataset.seccion === seccion ? "block" : "none";
  });
}