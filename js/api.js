const baseURL = 'https://api.football-data.org/v2';
const options = {
    headers : {
        'X-Auth-Token' : '932fd34992a4430e8d800b6ff915bfef'
    }
}

function status (response){
    if(response.status != 200){
        console.log(`Error : ${response.status}`)
        return Promise.reject(new Error(response.responseText))
    }else{
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json()
}

function error(error) {
    console.log(`Error : ${error}`)
}

function getMatchById(id){
    if('caches' in window){
        caches.match(`${baseURL}/matches/${id}`).then(res=>{
            if(res){
                res.json().then(data=>{
                    return data.match
                })
            }
        })
    }
    return fetch(`${baseURL}/matches/${id}`, options)
        .then(status)
        .then(json)
        .then(data=>{
            return data.match
        })
}

const getStandings =  ()=>{
    if("caches" in window){
        caches.match(`${baseURL}/competitions/2021/standings`, options).then(res=>{
            if(res){
                res.json().then(data=>{
                    document.querySelector(".progress").style.display ="none";
                    
                    let tableHTML = `
                                <table class="responsive-table striped">
                                    <thead>
                                        <th>Position</th>
                                        <th>Team</th>
                                        <th>Played</th>
                                        <th>Won</th>
                                        <th>Draw</th>
                                        <th>Lost</th>
                                        <th>Point</th>
                                    </thead>
                                    <tbody>
                
                            `;
                    data.standings[0].table.forEach(result =>{
                        //console.log(tableHTML)
                        tableHTML += `
                            <tr>
                                <td>${result.position}</td>
                                <td>${result.team.name}</td>
                                <td>${result.playedGames}</td>
                                <td>${result.won}</td>
                                <td>${result.draw}</td>
                                <td>${result.lost}</td>
                                <td>${result.points}</td>
                            </tr>
                        `
                    })
                    tableHTML += `
                        </tbody>
                        </table>            
                    `;
                    //console.log(tableHTML)
                    document.getElementById('table').innerHTML = tableHTML;
                })
            }
        })
    }
    fetch(`${baseURL}/competitions/2021/standings`, options)
        .then(status)
        .then(json)
        .then(data=>{
            document.querySelector(".progress").style.display ="none";
            
            let tableHTML = `
                <table class="responsive-table striped">
                    <thead>
                        <th>Position</th>
                        <th>Team</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>Point</th>
                    </thead>
                    <tbody>

            `;
            data.standings[0].table.forEach(result =>{
                //console.log(tableHTML)
                tableHTML += `
                    <tr>
                        <td>${result.position}</td>
                        <td>${result.team.name}</td>
                        <td>${result.playedGames}</td>
                        <td>${result.won}</td>
                        <td>${result.draw}</td>
                        <td>${result.lost}</td>
                        <td>${result.points}</td>
                    </tr>
                `
            })
            tableHTML += `
                </tbody>
                </table>            
            `;
            //console.log(tableHTML)
            document.getElementById('table').innerHTML = tableHTML;
        })
        .catch(error);
}

function getMatch(){
    if('caches' in window){
        caches.match(`${baseURL}/competitions/2021/matches?status=SCHEDULED`)
            .then(res=>{
                if(res){
                    res.json().then(data=>{
                        document.querySelector(".progress").style.display = "none";
                        let matchHTML ='';
                        data.matches.forEach((match, index)=>{
                            if(index<10){
                                matchHTML += `
                                <div class="col s12 m6">
                                    <div class="card">
                                        <div class="card-image">
                                            <div class="row">
                                            <img src="../img/premier-logo.png" class="col s12" alt="${match.homeTeam.name} Vs ${match.awayTeam.name}">
                                            </div>
                                            <a class="btn-floating halfway-fab waves-effect waves-light green savedBtn" href="#match" id="saved" data-match="${match.id}"><i class="material-icons">save</i></a>
                                        </div>
                                        <div class="card-content orange accent-1">
                                            <span class="card-title">${match.homeTeam.name} Vs ${match.awayTeam.name}</span>
                                            <p>Home : ${match.homeTeam.name}</p>
                                            <p>Away : ${match.awayTeam.name}</p>
                                            <p>Date : ${moment(match.utcDate).format('LLL')}</p>
                                        </div>
                                    </div>
                                </div>
                                `;
                                getAll().then(data=> {
                                    data.forEach(matchSaved=>{
                                        if(match.id == matchSaved.id){
                                            const btn =document.querySelector(`a[data-match="${match.id}"]`)
                                            btn.style.display = 'none'
                                        }
                                    })
                                })
                            }else{
                                return
                            }
                            
                        })
                        document.getElementById("matchgame").innerHTML = matchHTML;
                        
                        const btn = document.querySelectorAll(".savedBtn")
                        btn.forEach(el =>{
                            el.onclick=()=>{
                                const id = el.getAttribute("data-match");
                                saveMatch(id)
                                const btn =document.querySelector(`a[data-match="${match.id}"]`)
                                btn.style.display = 'none'
                                
                            }
                        })
                    })
                }
            })
    }
    
    fetch(`${baseURL}/competitions/2021/matches?status=SCHEDULED`, options)
        .then(status)
        .then(json)
        .then(data =>{ 
            
            document.querySelector(".progress").style.display = "none";
            let matchHTML ='';
            data.matches.forEach((match, index)=>{
                if(index<10){
                    matchHTML += `
                    <div class="col s12 m6">
                        <div class="card">
                            <div class="card-image">
                                <div class="row">
                                <img src="../img/premier-logo.png" class="col s12" alt="${match.homeTeam.name} Vs ${match.awayTeam.name}">
                                </div>
                                <a class="btn-floating halfway-fab waves-effect waves-light green savedBtn" href="#match" id="saved" data-match="${match.id}"><i class="material-icons">save</i></a>
                            </div>
                            <div class="card-content orange accent-1">
                                <span class="card-title">${match.homeTeam.name} Vs ${match.awayTeam.name}</span>
                                <p>Home : ${match.homeTeam.name}</p>
                                <p>Away : ${match.awayTeam.name}</p>
                                <p>Date : ${moment(match.utcDate).format('LLL')}</p>
                            </div>
                        </div>
                    </div>
                    `;
                    getAll().then(data=> {
                        data.forEach(matchSaved=>{
                            if(match.id == matchSaved.id){
                                const btn =document.querySelector(`a[data-match="${match.id}"]`)
                                btn.style.display = 'none'
                            }
                        })
                    })
                }else{
                    return
                }
                
            })
            document.getElementById("matchgame").innerHTML = matchHTML;
            
            const btn = document.querySelectorAll(".savedBtn")
            btn.forEach(el =>{
                el.onclick=()=>{
                    const id = el.getAttribute("data-match");
                    saveMatch(id)
                    M.toast({html: '<span class="text-white">Match berhasil disimpan.</span>'})
                    let btnSaved =document.querySelector(`a[data-match="${id}"]`)

                    btnSaved.style.display = 'none'
                }
            })
        })
}

function getSavedMatch(){
    getAll().then(data =>{
        let matchHTML ='';
        if(data.length>0){
        data.forEach((match, index)=>{
            matchHTML += `
                <div class="col s12 m6">
                    <div class="card">
                        <div class="card-image">
                            <div class="row">
                            <img src="../img/premier-logo.png" class="col s12" alt="${match.homeTeam.name} Vs ${match.awayTeam.name}">
                            </div>
                            <a class="btn-floating halfway-fab waves-effect waves-light red deleteBtn" id="removematch" data-matchid="${match.id}"><i class="material-icons">remove</i></a>
                        </div>
                        <div class="card-content orange accent-1">
                            <span class="card-title">${match.homeTeam.name} Vs ${match.awayTeam.name}</span>
                            <p>Home : ${match.homeTeam.name}</p>
                            <p>Away : ${match.awayTeam.name}</p>
                            <p>Date : ${moment(match.utcDate).format('LLL')}</p>
                        </div>
                    </div>
                </div>
                `;
            })
        }else{
            matchHTML ="<p>Tidak pertandingan yang disimpan</p>"
        }
        document.getElementById("savedmatch").innerHTML = matchHTML;
        const deleteBtn = document.querySelectorAll(".deleteBtn");
        deleteBtn.forEach(btn =>{
            btn.onclick= (e) =>{
                e.preventDefault();
                const id = btn.getAttribute("data-matchid");
                deleteMatch(id);
                setInterval('location.reload()', 2000); 
            }
        })
    })
}