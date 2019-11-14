//Intervalo de execução a cada 30 segundos por padrão (param 30000 em milisegundos), pode ser alterado pelo usuário
var interval = setInterval(request, 30000);

window.onload = function () {
    //Requisição de teste inicial
    request();
};

function setSegundos() {
    let segs = parseInt(document.getElementById("txt-segundos").value.replace(/\D/g, ""));

    if (segs > 0) {
        clearInterval(interval);
        interval = setInterval(request, (segs * 1000));
    }
    else {
        document.getElementById("txt-segundos").value = "30";
        setSegundos();
    }
}

function printLog(log) {
    return "#" + log.ID + "# - [" + log.Data + "] Conexão: " + (log.Online ? "Online" : "Off-Line");
}

function setLog(log) {
    let ul_log = document.getElementById("ul-logs");

    document.getElementsByTagName("title")[0].innerText = "#" + log.ID + "# - Conexão: " + (log.Online ? "Online" : "Off-Line");

    let html = "<li id='log-" + log.ID + "' data-json='" + JSON.stringify(log) + "'>" + printLog(log) + "</li>" + ul_log.innerHTML;

    ul_log.innerHTML = html;
}

function request() {
    let xhr = new XMLHttpRequest();

    //Número randômico (1-100) usado para captura de objetos aleatórios
    let r = Math.round((Math.random() * 99) + 1).toString();

    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/" + r, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                //Sucesso ao conectar: param Log.Online = true
                setLog(new Log(true));
            }
            else {
                //Falha ao conectar: param Log.Online = false
                setLog(new Log(false))
            }
        }
    };

    xhr.send(null);
}