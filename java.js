

function loadData(search) {
    fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q="+search)
.then((response) => response.json()) // Abbiamo una promise restituita qui
.then((json) => cardMusic(json)) // Qui abbiamo un oggetto JS (convertito dal JSON ricevuto dall'endpoint)
.catch((err) => console.log("Error detected: ", err) );
}

function cardMusic(json) {
    console.log(json)
}


function fetchAndDisplayData(artistName, containerId) {
    const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore di rete: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Dopo aver ottenuto i dati, crea le card Bootstrap
            const container = document.getElementById(containerId);

            // Pulisci il contenuto del container
            container.innerHTML = '';

            // Itera sui primi 4 risultati della ricerca
            for (let i = 0; i < 4; i++) {
                const result = data.data[i];

                // Crea la card Bootstrap
                const card = document.createElement('div');
                card.className = 'card';

                // Immagine della card
                const img = document.createElement('img');
                img.src = result.album.cover_big;
                img.className = 'card-img-top';

                // Contenitore per il corpo della card
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                // Titolo della card
                const cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                cardTitle.textContent = result.title;

                // Aggiungi le componenti alla card
                card.appendChild(img);
                cardBody.appendChild(cardTitle);
                card.appendChild(cardBody);

                // Aggiungi la card al container
                container.appendChild(card);
            }

            // Mostra il container dopo aver aggiunto le card
            container.style.display = 'flex'; // Imposta il display su flex per allineare le card orizzontalmente
        })
        .catch(error => {
            console.error('Errore durante la fetch:', error);
        });
}

// Esegui la funzione al caricamento della pagina o in risposta a un evento
fetchAndDisplayData('eminem', 'eminemSection');
fetchAndDisplayData('metallica', 'metallicaSection');
fetchAndDisplayData('queen', 'queenSection');