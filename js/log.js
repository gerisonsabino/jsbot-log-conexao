function Log(online)
{
    this.ID = ("00000" + (document.getElementById("ul-logs").getElementsByTagName("li").length + 1)).slice(-5);
    this.Data = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    this.Online = online
}