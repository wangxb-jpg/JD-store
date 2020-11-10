$("#act-top-biao1").click(function() {
    $("#act-top-out").remove();
})

// 搜索框下字符定时变化

function searchte() {
    let zifuc = ["家电狂欢", "耳机五折", "进口好物", "享生活服务", "新一代PC"];
    let i = 0;
    let st = document.getElementById("search-wtil1");
    var searchtimer = setInterval(function() {
        st.innerText = "";
        st.innerText = zifuc[i];
        i++;
        if (i == 5) {
            i = 0;
        }
    }, 2000);
}
searchte();

// 调用接口~搜索框遍历数据

let oInput = document.getElementById("search-txt");
let oUl = document.getElementById("searchul");
let subNav = document.getElementsByClassName("search-s");

oInput.oninput = function() {
    oUl.style.display = "block";
    let oScript = document.createElement("script");
    oScript.src = `https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&_ksTS=1603445531298_251&callback=foo&k=1&area=c2c&bucketid=16
`
    document.body.appendChild(oScript);
    document.body.removeChild(oScript);

}
oInput.onfocus = function() {
    oUl.style.display = "none";
}

function foo(data) {
    console.log(data)
    let result = data.result;
    let str1 = "";
    result.forEach(item => {
        str1 += `<li>${item[0]}</li>`;
    });
    oUl.innerHTML = str1;

    let aList = oUl.children;

    let magic = data.magic;
    magic.forEach(item => {
        //aList[item.index - 1].innerHTML += "&gt;";
        aList[item.index - 1].onmouseover = function() {
            subNav.innerHTML = "";
            let subData = item.data;
            subData.forEach(item => {
                let oUl = document.createElement("ul");
                let str = "";
                item.forEach(item => {
                    if (item.type == "hot") {
                        str += `<li class="red">${item.title}</li>`
                    } else {
                        str += `<li>${item.title}</li>`
                    }
                });
                oUl.innerHTML = str;
                subNav.appendChild(oUl);


            })
        }
    })
}
//列表显示 LIST
$(".main-list").mouseover(function() {
    $("#main-listxq").css({ "display": "block" })
});
$(".main-list").mouseout(function() {
    $("#main-listxq").css({ "display": "none" })
})

//轮播图
var swiperw = new Swiper(".swiper-container", {
    spaceBetween: 30,
    effect: "fade",
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
//小轮播
var swiperd = new Swiper(".swiper-container2", {
    spaceBetween: 30,
    effect: "fade",
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: "none",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
//京东秒杀
var now_closing = setInterval(function() {
        var timer = new Date();

        var closing_date = new Date("2020/11/14/ 00:00:00");

        var ospan = document.getElementsByClassName("ospan");
        var surplus = Math.round((closing_date - timer) / 1000);

        var hous = Math.round(surplus / 60 / 60);

        ospan[0].innerText = hous;
        var miut = Math.round(surplus / 60 % 60);

        ospan[1].innerText = miut;
        var secods = Math.round(surplus % 60);

        ospan[2].innerText = secods;

    }, 100)
    //cookie使用存储账号信息
function setCookie(key, val, n) {
    let now = new Date();
    now.setDate(now.getDate() + n);
    let str = `${key}=${val};path=/;expires=${now}`;
    document.cookie = str;
}

function getCookie(key) {
    var arr = document.cookie.split('; ')
    for (let i = 0; i < arr.length; i++) {
        let newArr = arr[i].split('=');
        if (newArr[0] == key) {
            return newArr[1];
        }
    }
}
console.log(getCookie('name'));

function removeCookie(key) {
    setCookie(key, 1, -1);
}
removeCookie('name', 1)
    //显示登陆后账户信息
$(document).ready(function() {
        if (getCookie("username")) {
            $("#mysign").empty();
            $("#mysign").append("欢迎用户：" + getCookie("username"));
            $("#mysign").css({ "color": "red" })
            $("#mylogin").empty();
            $("#mylogin").append(getCookie("username"));
            $("#mylogin").css({ "color": "red" })

        }
    })
    //秒杀轮播
var swipers = new Swiper('.myprice', {
    slidesPerView: 4,
    //spaceBetween: 30,
    slidesPerGroup: 4,
    loop: false,
    loopFillGroupWithBlank: false,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});