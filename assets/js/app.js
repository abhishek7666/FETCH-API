let cl = console.log;

let baseUrl = "http://localhost:3000/posts"

const data = document.getElementById("data");
const postForm = document.getElementById("postForm");
const title = document.getElementById("title");
const info = document.getElementById("info");

let postArray =[];

fetch(baseUrl)
.then(response => response.json())
.then(res => {
    cl(res)
    postArray = res;
    templating(postArray)
})
.catch(cl)

function templating(arr){
    let result = "";
    arr.forEach(ele => {
        result += `
        <div class="card">
        <div class="card-body">
            <h3>
                ${ele.title}
            </h3>
            <p>
                ${ele.body}
            </p>
            <p class="text-right">
                <button class="btn btn-success" data-id = ${ele.id}>Edit</button>
                <button class="btn btn-danger" data-id = ${ele.id}>Delete</button>
            </p>
        </div>
    </div>
        `
    })
    data.innerHTML=result;
}

function onPostHandlar (eve){
    eve.preventDefault();
    let obj = {
        userId:Math.ceil(Math.random() * 10),
        title:title.value,
        body:info.value,
    };
    cl(obj)
    postArray.push(obj)
    templating(postArray)
    postForm.reset();
    fetch(baseUrl,{
        maehod:"POST",
        body:JSON.stringify(obj),
        headers : {
            'Content-type' : 'application/json; charset = UTF-8',
            ' authorization' : 'Bearer Token qwertyuiop'
        }
    }).then((res) => res.json())
    .then((data) => cl(data))
    .catch(cl)
}

postForm.addEventListener('submit', onPostHandlar)
