import css from './css/index.css'
// import $ from 'jquery'
let liulian =  "oooohello liulianelcom to webpack"
document.getElementById('title').innerHTML=liulian;
// console.log("dkkkj");
$('#ss').html('nihao');

var json =require("../config.json");
document.getElementById("json").innerHTML=json.name +":github"+json.github;