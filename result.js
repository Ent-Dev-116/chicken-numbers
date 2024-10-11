// * ここから↓はシステムに触れる関数

/**
 * 属性取得の簡易関数
 * @param {string} s ID 
 * @returns オブジェクト
 */
function g(s) {
    return document.getElementById(s);
}

function c(s) {
    return document.createElement(s);
}

/**
 * setting関数で使用する座席の設定関数
 * @param {number} num 座席の場所
 * @returns できた要素
 */
function pushDesk(num) {
    let desk = c("div");
    desk.className = ("desk");
    desk.id = "desk" + num;
    return desk;
}

function pushChicken(num, index) {
    let all = c("figure");
    all.id = "info" + num;
    let chicken = c("img");
    chicken.className = "chicken";
    chicken.src = "./img/出荷用鳥さん.png"
    chicken.id = "chicken" + num;
    let info = c("figcaption");
    info.innerText = index;
    info.className = "info"
    info.id = "title" + num;
    all.appendChild(chicken);
    all.appendChild(info)
    return all;
}

let i, j, k = 1;
let productNumber = [];
let equalNumber = [];
let equalFlag = false;
let minNumber = [];
let minPoint = [];
let temp;
let enterTrigger = true;

async function dataSet() {
    Load(true);
    const apiURL = "https://script.google.com/macros/s/AKfycbxhZpjheJ4I9UyJhuF_N2g_NY8ZCPQcLeMsDT4YrN-eNgOiKWIqmNLsI-oxCoKnGNvN/exec"
    const response = await fetch(apiURL);
    const data = await response.json();
    Load(false);
    console.log(data);
    for (i = 0; i < 40; i++) {
        productNumber.push(data[i]);
        minNumber.push(data[i]);
    }
}

function Load(on) {
    if (on) {
        g("loading").style.display = "break";
    } else {
        roolTriger = false;
        $(g("loading")).animate({
            opacity: 0
        }, 500, function () {
            g("loading").style.display = "none"
        });
    }
}
function setting() {
    sort();
    const setting = g("setting");
    k = 0;
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
        setting.appendChild(c("br"));
        setting.appendChild(c("br"));
        setting.appendChild(c("br"));
    }
}

function result() {
    for (i = 0; i < 40; i++) {
        equalFlag = false;
        for (j = 0; j < equalNumber.length; j++) {
            if (equalNumber[j] == productNumber[i]) {
                equalFlag = true;
                break;
            }
        }
        if (equalFlag) {
            g("chicken" + i).src = "./img/禁止マーク.png";
        }
    }
    g("number").innerText = minNumber[minNumber.length - 1];
    $(g("numberContent")).animate({
        opacity: 1
    }, 500, function () {
        for (i = 0; i < 40; i++)
            if (productNumber[i] == minNumber[minNumber.length - 1])
                break;
        $(g("info" + i)).animate({
            marginTop: "-25px",
            opacity: 0
        }, 500, function () {
            g("chicken" + i).src = "./img/SoCool 透過.png";
            g("title" + i).style.color = "aqua";
            $(g("info" + i)).animate({
                marginTop: "0px",
                opacity: 1
            }, 500);
        });
    });
}

async function main() {
    await dataSet();
    setting();
}

i = 0;
j = 0;
k = 0;

main();

function sort() {
    for (i = 0; i < 40; i++) {
        for (k = 0, equalFlag = false; k < 40; k++) {
            if (equalNumber[k] == productNumber[i]) {
                equalFlag = true;
                break;
            }
            if (productNumber[i] == productNumber[k] && i != k && (!equalFlag)) {
                equalNumber.push(productNumber[i]);
                break;
            }
        }
    }
    for (i = 0, k = 0; i < 40; i++) {
        for (j = 0; j < equalNumber.length; j++) {
            if (productNumber[i] == equalNumber[j]) {
                minNumber.splice(i - k, 1);
                k++;
                break;
            }
        }
    }
    for (i = 0; i < minNumber.length; i++) {
        for (j = 0; j < minNumber.length; j++) {
            if (minNumber[i] > minNumber[j]) {
                temp = minNumber[i]
                minNumber[i] = minNumber[j];
                minNumber[j] = temp;
            }
        }
    }
    for (i = 0; i < minNumber.length; i++) {
        for (j = 0; j < 40; j++) {
            if (minNumber[i] == productNumber[j]) {
                minPoint[i] = j;
            }
        }
    }
}

document.addEventListener('keydown', event => {
    if (event.code == "Enter") {
        if (enterTrigger) {
            chickenChange(0);
            enterTrigger = !enterTrigger;
        } else {
            result();
        }
    }
});

function chickenChange(num) {
    if (num < 40) {
        g("desk" + num).replaceWith(pushChicken(num, productNumber[num]));
        g("info" + num).style.opacity = 0;
        $(g("info" + num)).animate({
            opacity: 1
        }, 125, function () { chickenChange(num + 1) });
    }
}