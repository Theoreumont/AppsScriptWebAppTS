import Users from "./Classes/Users";

function doGet(e){
    // output index.html
    return HtmlService.createTemplateFromFile('index')
        .evaluate()
        .setTitle('Full TypeScript App')
        .setFaviconUrl("https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png");
}

function getData(){
    const users = new Users();
    return {users: users.getAllData()}
}

function test(){
    console.log(getData())
}