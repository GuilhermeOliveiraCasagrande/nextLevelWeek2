let button = document.querySelector("#add-time")

button.addEventListener("click", () => {
    const copy = document.querySelector(".schedule-item").cloneNode(true)
    const fields = copy.querySelectorAll("input")
    fields.forEach(element => {
        element.value = ""
    });
    document.querySelector("#schedule-items").appendChild(copy)
})