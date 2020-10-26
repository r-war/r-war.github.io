
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.getElementById("mobile");
    M.Sidenav.init(nav);
    
    const  loadNav = ()=>{
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if(this.readyState == 4) {
                if(this.status != 200) return;
                
                document.querySelectorAll(".sidenav, .desktop").forEach(el =>{
                    el.innerHTML = xhttp.responseText;
                })
                
                document.querySelectorAll(".sidenav a, .desktop a").forEach(e =>{
                    e.addEventListener("click", el=>{
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = el.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })
            }
        }
        
        xhttp.open("GET", "/nav.html", true);
        xhttp.send();
    }
    loadNav();

    let page = window.location.hash.substr(1);
    if(page == "") page = "home";
    
    const loadPage =  (page) =>{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4) {
                let content = document.querySelector("#body-content")
                if(page == "home"){
                    getStandings();
                }else if(page =='match'){
                    getMatch();
                }else if(page == "savedmatch"){
                    getSavedMatch();
                    
                }
                
                if(this.status == 200){
                    content.innerHTML = xhttp.responseText;
                }else if(this.status == 404) {
                    content.innerHTML = '<p>Halaman tidak ditemukan.</p>'
                }else {
                    content.innerHTML = '<p>Halaman tidak bisa diakses.</p>'
                }
            }
        }
        xhttp.open("GET", `/pages/${page}.html`, true);
        xhttp.send();
    }
    loadPage(page);
})