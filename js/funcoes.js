function getLogsEmTexto(){
    let lis_log = document.getElementById("ul-logs").getElementsByTagName("li");

    let texto = "";

    for (var i = 0; i < lis_log.length; i++) {
        let log = JSON.parse(lis_log[i].getAttribute("data-json"));
        texto += printLog(log) + "\n";
    }

    return texto;
}

function getLogsEmJSON(){
    let lis_log = document.getElementById("ul-logs").getElementsByTagName("li");

    let json = new Array();

    for (var i = 0; i < lis_log.length; i++) {
        json.push(JSON.parse(lis_log[i].getAttribute("data-json")));
    }

    return JSON.stringify(json);
}

function copiarTexto() {
    copiar(getLogsEmTexto());
}

function copiarJSON() {
    copiar(getLogsEmJSON());
}

function copiar(texto) {
    if (window.clipboardData && window.clipboardData.setData) {
        return clipboardData.setData("Text", texto);
    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");

        textarea.textContent = texto;
        textarea.style.position = "fixed";

        document.body.appendChild(textarea);
        textarea.select();

        try {
            return document.execCommand("copy");
        }
        catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

function imprimirLogs() {
    window.print();
}

function exportarTexto(){
    exportar(getLogsEmTexto(), "bot-log-conexao.txt");
}

function exportarJSON(){
    exportar(getLogsEmJSON(), "bot-log-conexao.json");
}

function exportar(texto, arquivo) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";

    var blob = new Blob([texto], {type: "octet/stream"});
    var url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = arquivo;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}