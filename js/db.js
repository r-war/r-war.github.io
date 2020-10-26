
const dbPromise = idb.open("football", 1, upgradeDB =>{
    const matchObjectStore = upgradeDB.createObjectStore("matches", {keyPath : "id"});

    matchObjectStore.createIndex("utcDate", "utcDate", {unique : false})
})

function saveMatch(id){
    getMatchById(id).then(data=>{
        //console.log(data)
        dbPromise.then(db=>{
            const tx = db.transaction("matches", "readwrite");
            const store = tx.objectStore("matches")
            //console.log(store)
            store.add(data);
            return tx.complete
        }).then(()=>{
            console.log("berhasil disimpan");
        })
    })
}

function deleteMatch(id){
    dbPromise.then(db=>{
        const tx = db.transaction("matches", "readwrite");
        const store = tx.objectStore("matches");

        store.delete(+id);
        return tx.complete;
    }).then(()=>{
        console.log("match berhasil dihapus.");
    })
}

function getAll(){
    return new Promise((resolve, reject)=>{
        dbPromise.then(db =>{
            const tx = db.transaction("matches", "readonly");
            const store = tx.objectStore("matches");

            return store.getAll()
        }).then(matches => {
            resolve(matches);
        })
    })
}


