
const token = 'BQCGQE3IjAjPngLclzQtI_PSQLpQ2ZuAGO7oi6W1mrSuNTJLlW5k08lXegWskKOjGoOtyz2BZ3PSVYQsmPznM6pL0-fQzEjIduU17X0Afh9q3D89HcupucviFUqi3IIrrlRCJYdniUAyhI-Vfn2_XW0jsleQFrTmwu4C0gKRYqHdlUy8qyGBqM1mFSvhTv7UtoQiSuyq6EStXRsBSSQyWCf4LzA9EOeeCxiQUmF7BBpBAMAjOXECS6aFjvDxfIp0nRhme2Xu-SeXnRdkjysDfMEo21_79he0';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: body ? JSON.stringify(body) : undefined
  });
  return await res.json();
}

async function getTopTracks() {
  
  return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')).items;
}

async function loadTopTracks() {
  const topTracks = await getTopTracks();
  

  console.log(
    topTracks?.map(
      ({name, artists}) => `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );


  const tracksList = document.getElementById('tracksList');
  tracksList.innerHTML = topTracks
    .map(
      ({ name, artists }) => `<li>${name} by ${artists.map(artist => artist.name).join(', ')}</li>`
    )
    .join('');
}

window.onload = loadTopTracks;
