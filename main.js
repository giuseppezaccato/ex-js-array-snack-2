const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];

/*
!Snack 1 - Filtra e Modifica
- Crea un array (longBooks) con i libri che hanno più di 300 pagine;
- Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
Stampa in console ogni titolo.
*/
const longBooks = books.filter(b => b.pages > 300)
//* console.log(longBooks)

const longBooksTitles = longBooks.map(b => b.title)
//* console.log(longBooksTitles)


/*
!Snack 2 - Il primo libro scontato
Creare un array (availableBooks) che contiene tutti i libri disponibili.
Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).
*/

const availableBooks = books.filter(b => b.available)
//* console.log(availableBooks)

const discountedBooks = availableBooks.map(b => ({ ...b, price: ((parseFloat(b.price.replace('€', '')) * .8).toFixed(2)) + '€' }))
//* console.log(discountedBooks)

const fullPricedBook = discountedBooks.find(b =>
    parseFloat(b.price.replace('€', ''))
    % 1 === 0 //intendiamo qui dare un true/false alla condizione "il resto della divisione per 1 è == 0?"
    /*
    questo sopra poteva essere sostituito dal costrutto 
    Number.isInteger(parseFloat(b.price.replace('€', ''))
    */
)
//* console.log(fullPricedBook)

/*
!Snack 3 - Ordinare gli Autori
Creare un array (authors) che contiene gli autori dei libri.
Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
Ordina l'array authors in base all'età, senza creare un nuovo array.
(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
*/

const authors = books.map(b => b.author)
//* console.log(authors);
const areAuthorsAdults = authors.every(age => age > 18)

//(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
areAuthorsAdults ? authors.sort((a, b) => a.age - b.age) : authors.sort((a, b) => b.age - a.age)
//ancora meglio evitando la ridondanza del codice nella sottrazione tra a.age e b.age(usando la moltiplicazione per -1)
authors.sort((a, b) => a.age - b.age * (areAuthorsAdults ? 1 : -1))
//* console.log(authors)

/*
!Snack 4 - Calcola l'età media
Creare un array (ages) che contiene le età degli autori dei libri.
Calcola la somma delle età (agesSum) usando reduce.
Stampa in console l'età media degli autori dei libri.
*/

const ages = authors.map(a => a.age)
//* console.log(ages)

//fix TIP PER IL REDUCE => array.reduce(() => {},initialValue)
//fix inizializza in modo da avere subito l'approccio 'contrario' cioè iniziando dall'initial value, e poi riempiendo il primo argomento(la callback)
const ageSum = ages.reduce((acc, curr) => {
    return acc + curr
}, 0)
//* console.log(ageSum / ages.length)


/*
!Snack 5 (Bonus) - Raccogli i libri
Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare utilizzare l'url base:
https://boolean-spec-frontend.vercel.app/freetestapi => http://localhost:5001/
al posto di:
https://freetestapi.com/api/v1

Ad esempio:
https://boolean-spec-frontend.vercel.app/freetestapi/airports => http://localhost:5001/airports
per chiamare l'endpoint /users

Usando la l'API https://boolean-spec-frontend.vercel.app/freetestapi/books/{id} usa la combinazione di .map() e Promise.all(),
per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
Testala con l'array [2, 13, 7, 21, 19].
*/


//funzione supporto json
async function fetchJson(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

const ids = [2, 13, 7, 21, 19]
BASE_URL = 'http://localhost:5001/books/'

//funzione scalabile con argomento array anonimo da mappare
async function getBooks(array) {
    // const promises = array.map(id => fetchJson(`${BASE_URL}${id}`)) => questa sarebbe la versione completa da applicare a Promise.all()
    const libri = await Promise.all(array.map(id => fetchJson(`${BASE_URL}${id}`)))
    return libri
}

//* funzione esempio tradizionale
// getBooks(ids)
//     .then(libri => console.log(libri))
//     .catch(err => console.error(err.message))

// //* trasformazione con async/await
// (async () => {
//     try {
//         const libri = await getBooks(ids)
//         return console.log(libri)
//     } catch (error) {
//         console.log(error)
//     }
// })();


/*
!Snack 6 (Bonus) - Ordina i libri
Crea una variabile booleana (areThereAvailableBooks) per verificare se c'è almeno un libro disponibile.
Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
Ordina l'array booksByPrice in base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.
*/
const areThereAvailableBooks = books.some(b => b.available)
//* console.log(areThereAvailableBooks)
const booksByPrice = books.map(b => b).sort((a, b) => parseFloat(a.price.replace('€', '') - b.price.replace('€', '')))

//? versione piu completa e spiegata
// const booksByPrice = books.sort((a, b) => {
//     task devo prima rimuovere il simbolo € e convertire in numero
//     const priceA = parseFloat(a.price.replace('€', ''));
//     const priceB = parseFloat(b.price.replace('€', ''));

//     task confronto finale per l'ordinamento
//     return priceA - priceB
// });
//* console.log(booksByPrice)
//* console.log(books)
booksByPrice.sort((a, b) => b.available - a.available)

// questo ternario spiega che se sono uguali darà indice 0, altrimenti se a.available == true darà 1, else if -1!
// booksByPrice.sort((a, b) => a.available === b.available ? 0 : a.available ? -1 : 1)

// booksByPrice.sort((a, b) => b.title.localeCompare(a.title)) //fix confronto le stringhe ESEMPIO
//* console.log(booksByPrice)

/*
!Snack 7 (Bonus) - Analizza i tag
Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.
*/

//? PRIMA revisione esercizio
// const tagCounts = books.reduce((acc, curr) => {
//     let counter = 0; //fix [Errore 1] Questa variabile viene resettata a 0 per ogni libro ('curr'). Dovrebbe essere dichiarata al di fuori del reduce per mantenere il conteggio tra i libri.
//     curr.tags.forEach(t => {
//         if (t !== t) { //fix [Errore 2] Questa condizione è quasi sempre falsa.  L'operatore !== controlla se i due operandi non sono uguali. Una variabile è sempre uguale a se stessa.
//             acc[t] = counter++; // [Errore 3] Se la condizione fosse vera (raramente), assegneremmo il valore corrente di counter a acc[t] e poi lo incrementeremmo.
//         } else {
//             acc = { //fix [Errore 4] Questo crea un NUOVO oggetto 'acc' ad ogni iterazione del ciclo interno, sovrascrivendo i conteggi precedenti.  Non stiamo aggiornando l'oggetto accumulatore.
//                 ...acc,
//                 t: counter //fix [Errore 5] Qui, 't' è la stringa del tag, non il valore della variabile tag. Dovrebbe essere tag. Inoltre, counter conterrà solo il conteggio dell'ultimo tag di un libro.
//             };
//         }
//     });

//     return acc; // Restituisce l'accumulatore.
// }, {}); // Inizializza l'accumulatore come un oggetto vuoto.

// console.log(tagCounts);

//? SECONDA revisione esercizio (funzionante)
const tagCounts = books.reduce((acc, curr) => {
    // 'acc' è l'accumulatore (inizializzato come {}),
    // 'curr' è l'oggetto libro corrente.

    curr.tags.forEach(tag => {
        // 'tag' rappresenta il tag corrente all'interno dell'array 'tags' del libro corrente.
        // La condizione 'tag === tag' è inutile per il conteggio. (perché si avvera SEMPRE)

        // Verifichiamo se il tag esiste già in 'acc'.
        if (!acc[tag]) {
            // Se il tag NON esiste in 'acc' (è la prima volta che lo incontriamo),
            // lo inizializziamo con un conteggio di 1.
            acc[tag] = 1;
        } else {
            // Se il tag ESISTE già in 'acc' (lo abbiamo incontrato in precedenza),
            // incrementiamo il suo conteggio.
            acc[tag]++;
        }
    });

    return acc; // Restituiamo l'accumulatore aggiornato dopo aver processato tutti i tag del libro corrente.
}, {}); // L'oggetto vuoto '{}' è il valore iniziale dell'accumulatore 'acc'.

console.log(tagCounts);
// Alla fine, 'tagCounts' conterrà un oggetto con i conteggi di ciascun tag.


//? TERZA revisione esercizio (semplificata ma la piu complessa) e CORRETTA
// const tagCounts = books.reduce((acc, curr) => {
//     curr.tags.forEach(tag => {
//         acc[tag] = (acc[tag] || 0) + 1;
//     });
//     return acc;
// }, {});

// console.log(tagCounts);
