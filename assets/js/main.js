//criação de constantes
const adicionar = document.querySelector("#add");
const apagar = document.querySelector("#remove");
const finalizada = document.querySelector("#finish");
const divTarefas = document.querySelector(".tarefas");
const tarefa = document.querySelector("#tarefas_input");
const select = document.querySelector("#select");

//variaveis que serão usadas em funções diferentes
let div;
let contador = 0;

//funçao para ficar ouvindo se o usuario deu um enter no teclado, caso sim o botao adicionar será pressionado add um novo item
tarefa.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        adicionar.click()
        tarefa.value = ""
    }
})

//botao que seleciona todos os itens da lista de uma só vez
select.addEventListener('click', () => {
    document.querySelectorAll('input[name="itemCheck"]').forEach(function (e) {
        e.checked = true;
    });
})

//botao para adiconar a task que o usuario digitou no inputText
adicionar.addEventListener('click', () => {
    if (!tarefa.value) return;

    contador++
    localStorage.setItem("contador", contador);
    label = createLabel()
    input = createInput()
    div = document.createElement('div');
    div.appendChild(input)
    div.appendChild(label)
    divTarefas.appendChild(div);

    tarefa.value = ""
    localStorage.setItem(input.id, div.outerHTML)
})

//cria um inputCheck para cada item que o usuario adiciona
function createInput() {
    const input = document.createElement('input');
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "itemCheck");
    input.setAttribute("id", `id_input${contador}`);
    return input;
}

//cria uma label pro inputCheck a cada item adicionado pelo usuario
function createLabel() {
    const label = document.createElement('label');
    label.setAttribute("for", `id_input${contador}`);
    label.textContent = tarefa.value
    return label
}

//botão que apaga o item que o usuario marcou como check
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

//salva no localStorage o item que o usuario marcou como check
function salvarChecked(label, atributoForLabel) {
    let input = document.querySelector('#' + atributoForLabel);
    input.setAttribute('checked', 'true')
    localStorage.setItem(input.id, label.outerHTML)
}

//função que retira do localStorage caso o usuario tenha tirado o check do item
function semChecked(label, atributoForLabel) {
    let input = document.querySelector('#' + atributoForLabel);
    input.removeAttribute('checked')
    localStorage.setItem(input.id, label.outerHTML)
}

//atualiza os dados, caso no localStorage tenha algum dado ele adiciona na tela
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

//risca o item da lista caso o usuario tenha selecionado o item
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
