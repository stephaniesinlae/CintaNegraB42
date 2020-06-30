const request = require('request');
const { Musica } = require('./Musica');

const buscarMusica = (artista, cancion) => {
    const APIKEY = 1;
    artista = artista.toLowerCase();
    cancion = cancion.toLowerCase();
    const AU_DB_URL = `http://www.theaudiodb.com/api/v1/json/${APIKEY}/searchtrack.php?s=${artista}&t=${cancion}`;

    request.get(AU_DB_URL, (err, res, body) => {
        if (res.statusCode === 200) {
            const jason = JSON.parse(body);
            const busqueda = new Musica(
                jason.track[0].strTrack,
                jason.track[0].strArtist,
                jason.track[0].strGenre,
                jason.track[0].strAlbum,
                jason.track[0].strMusicVid);
            console.log(busqueda);
        } else {
            return `Error - HTTP status: ${res.statusCode} ${res.statusMessage} ${err}.`;
        }
    });
}

buscarMusica('COLDPLAY', 'yellow');
buscarMusica('coldplay', 'PARADISE');
buscarMusica('Bad Bunny', 'SAFAERA');

