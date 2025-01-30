// * ここから↓はシステムに触れる関数

/**
 * 属性取得の簡易関数
 * @param {string} s ID 
 * @returns オブジェクト
 */
function g(s) {
    return document.getElementById(s);
}

/**
 * setting関数で使用する座席の設定関数
 * @param {number} num 座席の場所
 * @returns できた要素
 */
function pushDesk(num) {
    let desk = document.createElement("div");
    desk.className = ("desk");
    desk.id = "desk" + num;
    desk.setAttribute("onclick", "displayClick(" + num + ")");
    return desk;
}

// ? 変数宣言

let i, j, k = 0;
let desk = -1;
const button = g("button");
let number = 1;

// ! こっからしたが結構直接かかわる部分

function setting() {
    const setting = g("setting");
    for (i = 0; i < 7; i++) {
        if (i != 6) {
            for (j = 0; j < 6; j++, k++) {
                setting.appendChild(pushDesk(k));
            }
        } else {
            for (j = 0; j < 4; j++, k++) {
                setting.appendChild(pushDesk(k));
            }
        }
        setting.appendChild(document.createElement("br"));
        setting.appendChild(document.createElement("br"));
        setting.appendChild(document.createElement("br"));
    }

    const select=g("number");
    let ele;
    for(i=1;i<40;i++){
        ele=document.createElement("option");
        ele.innerText=i;
        ele.value=i;
        select.appendChild(ele);
    }
}

setting();

function displayClick(num) {
    for (i = 0; i < 40; i++) {
        g("desk" + i).style.boxShadow = "";
        g("desk" + i).style.backgroundColor = "";
    }
    if (desk != num) {
        g("desk" + num).style.boxShadow = "2px 2px 4px gray";
        g("desk" + num).style.backgroundColor = "#b0c4ff";
        desk = num;
        button.style.backgroundColor="#2f4f4f";
        button.style.border="solid 2px #fff";
        button.style.color="#fff";
    } else {
        button.style.backgroundColor="#fff";
        button.style.border="solid 2px #2f4f4f";
        button.style.color="#2f4f4f";
        desk = -1;
    }
}

function next(){
    if(desk!=-1){
        g("post").style.display="none";
        g("chicken").style.display="block";
        g("body").style.backgroundColor="black";
        g("number").value=number;
        g("index").value=desk;
    }
}

function check(){
    if(g("number").value>40||g("number").value<1){
        g("number").value=1;
    }
}

//! window.location.href = "./srot_shica/srot.html"
