const form = document.getElementById("film-form");
const directorElement = document.querySelector("#director");
const titleElement = document.querySelector("#title");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


//UI Element Üretme
const ui = new UI();

//Storage Element Üretme
const storage = new Storage();

eventListeners();

function eventListeners() {

    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {

        let films = storage.getFilmToStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(e) {

    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        //Hata
        ui.displayMessages("Lütfen tüm alanları doldurun...", "danger");
    }
    else {
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm); //Arayüze Ekleme
        storage.addFilmToStorage(newFilm); //Storage Ekleme
        ui.displayMessages("Film başarıyla eklendi...", "success");
    }
    ui.clearInputs(titleElement, directorElement, urlElement);
    e.preventDefault();

}

function deleteFilm(e) {

    if (e.target.id === "delete-film") {

        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling);
        ui.displayMessages("Silme işlemi başarılı...", success);
    }

}

function clearAllFilms() {
    if (confirm("Emin misiniz?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
}