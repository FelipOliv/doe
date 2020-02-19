let button = document.querySelector("header button")

button.addEventListener ("click", event => {
    document.querySelector(".modal-form").classList.toggle("hide")
})

document.querySelector(".modal-form").addEventListener("click", event => {
    event.target.classList.toggle("hide")
})