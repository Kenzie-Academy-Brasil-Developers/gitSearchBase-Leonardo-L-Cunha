const users = localStorage.getItem("user")
let user = JSON.parse(users)
console.log(user)


function HeadPrifole() {

    const mainHead = document.querySelector(".mainHead")

    mainHead.insertAdjacentHTML("beforeend", `
    <div class="box-img-text">
        <img src="${user.avatar_url}" alt="">
        <div class="box-texts">
            <h2 class="text-2">${user.name}</h2>
            <p class="texts-form">${user.bio}</p>
        </div>
    </div>
    <div class="box-btns">
        <button class="btn-mail">Email</button>
        <button class="btn-swt">Trocar de usuário</button>
    </div>
    `)
    const buttonSwt = document.querySelector(".btn-swt")
    buttonSwt.addEventListener("click", () => {
        window.location.replace("/pages/home/index.html")
    })
}
HeadPrifole()


async function mainProfile() {
    const data = await fetch(`https://api.github.com/users/${user.login}/repos`)
    const dataJson = await data.json()
    console.log(dataJson)
    const ul = document.querySelector(".card-container")
    dataJson.forEach(element => {
        ul.insertAdjacentHTML("beforeend", `
        <li class="card">
        <h2 class="text-1">${element.name}</h2>
        <p class="text-grey">${element.description}</p>
        <div class="links">
          <a target ="_blanck" href="${element.html_url}">Repositorio</a>
          <a target ="_blanck" href="${element.homepage}">Demo</a>
        </div>
      </li>
        `)
    });
}

mainProfile()