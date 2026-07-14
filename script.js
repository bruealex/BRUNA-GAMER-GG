// SEU CANAL: @brunagamerrr
const CHANNEL_HANDLE = "@brunagamerrr";

// PEGAR KEY GRÁTIS: https://console.cloud.google.com/ > YouTube Data API v3
const API_KEY_YT = "COLA_SUA_KEY_DO_YOUTUBE_AQUI";

// BUSCA O ID DO CANAL PELO @ E PEGA DADOS
fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&q=${CHANNEL_HANDLE}&type=channel&part=snippet`)
.then(res => res.json())
.then(data => {
  const CHANNEL_ID = data.items[0].id.channelId;

  // ÚLTIMO VÍDEO
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY_YT}&channelId=${CHANNEL_ID}&order=date&part=snippet&type=video&maxResults=1`)
 .then(res => res.json())
 .then(videoData => {
    const videoId = videoData.items[0].id.videoId;
    document.getElementById("video").innerHTML =
    `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
  });

  // CONTADOR DE INSCRITOS
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY_YT}`)
 .then(res => res.json())
 .then(channelData => {
    const inscritos = channelData.items[0].statistics.subscriberCount;
    document.getElementById("contInscritos").innerText = parseInt(inscritos).toLocaleString("pt-BR");
  });
});

function copiarTag() {
  navigator.clipboard.writeText("BRUNAGAMER");
  alert("TAG COPIADA! BRUNAGAMER 💖");
}
