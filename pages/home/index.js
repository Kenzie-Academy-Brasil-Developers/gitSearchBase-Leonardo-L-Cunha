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
        const recents = JSON.parse(localStorage.getItem("users")) || []
        const data = await fetch(`https://api.github.com/users/${name}`)
        const dataJson = await data.json()
        if(recents.includes(dataJson)){

        }else{
            recents.push(dataJson)
        }
       
        if (data.status == 404) {
            const spanRed = document.getElementById("red")
            spanRed.classList.add("red-show")
        }
        localStorage.setItem("users", JSON.stringify(recents))
        localStorage.setItem("user",JSON.stringify(dataJson))
        button.innerHTML = ""
        button.innerText = "Ver perfil do github"
        if (data.status == 200) {
            window.location.replace("/pages/profile/index.html")
        }
    } catch (error) {
        console.log(error)

    }
}


async function recents (){
    const users = localStorage.getItem("users")
    const user = JSON.parse(users)
    const ul = document.querySelector(".card-container")
    
    
    user.forEach((element,i) => {
        if(i >= user.length-3){
            const li = document.createElement("li")
            li.classList.add("card")
            const img = document.createElement("img")
            img.src = element.avatar_url
            const btnP = document.createElement("p")
            btnP.classList.add("button-p")
            btnP.innerText = "Acessar esse perfil"

            btnP.addEventListener("click", ()=> {
                dataAPI(element.login,btnP)
            })

            li.append(img,btnP)
            ul.appendChild(li)
        }
        
    
    });
    
    


}
recents()

