function dataInput() {

    const input = document.getElementById("input")
    const button = document.getElementById("btn-sub")
    if (input.value) {
        button.disabled = false
    } else {
        button.disabled = true
    }
    button.addEventListener("click", (event) => {
        event.preventDefault()

        button.innerHTML = ""

        const img = document.createElement("img")
        img.src = "/src/img/icons8-loading-30.png"
        img.alt = "spinner"
        img.classList.add("load")
        button.appendChild(img)
        dataAPI(input.value, button)

    })




}
dataInput()

async function dataAPI(name, button) {
    try {
        const data = await fetch(`https://api.github.com/users/${name}`)
        const dataJson = await data.json()
        if (data.status == 404) {
            const spanRed = document.getElementById("red")
            spanRed.classList.add("red-show")
        }
        localStorage.setItem("users", JSON.stringify(dataJson))
        button.innerHTML = ""
        button.innerText = "Ver perfil do github"
        if (data.status == 200) {
            window.location.replace("/pages/profile/index.html")
        }
    } catch (error) {
        console.log(error)

    }
}

