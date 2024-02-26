export function getRandomUser(){
    // Get random username and password from array
    let randomUser = {};
    let rand = Math.floor(Math.random() * users.length);
    randomUser.username = users[rand].username;
    randomUser.password = users[rand].password;

    return randomUser;
}