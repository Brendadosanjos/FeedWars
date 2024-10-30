function users(){
    fetch('data.json')
     .then(reponse => reponse.json())
     .then(users => {
        console.log(users);
     })
}

users()