const adicionar = document.querySelector("#add");
const apagar = document.querySelector("#remove");
const finalizada = document.querySelector("#finish");
const divTarefas = document.querySelector(".tarefas");
const tarefa = document.querySelector("#tarefas_input");
const select = document.querySelector("#select");
let numero = 0;
let div;
let contador = 0;

tarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        adicionar.click()
        tarefa.value = ""
    }
})

select.addEventListener('click', () => {
    document.querySelectorAll('input[name="itemCheck"]').forEach(function (e) {
        e.checked = true;
    });
})

adicionar.addEventListener('click', () => {
    if (!tarefa.value) return;

    contador++
    localStorage.setItem("contador", contador);
    const label = document.createElement('label');
    const input = document.createElement('input');
    div = document.createElement('div');
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "itemCheck");
    input.setAttribute("id", `id_input${contador}`);
    label.setAttribute("for", `id_input${contador}`);
    label.textContent = tarefa.value
    div.appendChild(input)
    div.appendChild(label)
    divTarefas.appendChild(div);


    tarefa.value = ""
    localStorage.setItem(input.id, div.outerHTML)
})

apagar.addEventListener('click', () => {
    document.querySelectorAll('input[name="itemCheck"]').forEach(function (e) {
        let idInput = e.id;
        let pai = e.parentNode;
        if (e.checked == true) {
            console.log(e)
            localStorage.removeItem(idInput, pai)
            pai.remove()
        }
    });
})

window.addEventListener('click', () => {
    document.querySelectorAll("label").forEach(function (e) {
        let atributoForLabel = e.getAttribute("for");
        if (document.querySelector("#" + atributoForLabel).checked == true) {
            e.style.textDecoration = "line-through";
            salvarChecked(e.parentNode, atributoForLabel);
        } else {
            e.style.textDecoration = "none"
            semChecked(e.parentNode, atributoForLabel)
        }
    })
})

function salvarChecked(label, atributoForLabel) {
    let input = document.querySelector('#' + atributoForLabel);
    input.setAttribute('checked', 'true')
    localStorage.setItem(input.id, label.outerHTML)
}

function semChecked(label, atributoForLabel) {
    let input = document.querySelector('#' + atributoForLabel);
    input.removeAttribute('checked')
    localStorage.setItem(input.id, label.outerHTML)
}

window.addEventListener('load', () => {
    let cont = localStorage.getItem("contador");
    contador = cont
    console.log("cont:" + cont)
    console.log("contador:" + contador)
    if (cont > 0) {
        console.log("entrando no if")
        for (i = 0; i <= cont; i++) {
            if (localStorage.getItem(`id_input${i}`)) {
                console.log(`id_input${i}`)
                let dados = localStorage.getItem(`id_input${i}`)
                divTarefas.innerHTML += dados
            }
        }
    }
})
