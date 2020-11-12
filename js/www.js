function cart() {
    //    判断登录
    var usernames = document.getElementById("usernames");
    if (getCookie("username")) {
        usernames.innerText = getCookie("username")
    } else {
        $(location).attr("href", "index.html");
    }

}
cart.prototype.showdata = function() {
    var arrid = [];
    var arrnmb = [];
    var arrliid = [];
    axios.get("http://localhost:3000/shoppings ").then(res => {
        for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].uid == getCookie("username")) {
                arrid.push(res.data[i].shopid);
                arrnmb.push(res.data[i].nmb)
                arrliid.push(res.data[i].id)
            }

        }
        console.log(arrid)
        console.log(arrliid)
    }).then(function() {
        this.shop = document.getElementById("shopig");
        this.totalPrice = document.getElementById("totalPrice");
        var str = "";
        var nums = 0;
        for (let j = 0; j < arrid.length; j++) {
            axios.get(`http://localhost:3000/proudatas/${arrid[j]}`).then(res => {
                str += `<li class="list"> <input type="checkbox" name="" class="check"><img src="${res.data.img}"><span>${res.data.title}</span><span class="jiage">${res.data.price}</span><span class="shuliang">${arrnmb[j]}</span><input class="txt1" type="button" value="+"><input class="txt2" type="text" value="${arrnmb[j]}"><input  class="txt3" type="button" value="-"><input class="txt4" type="button" value="删除商品"></li>`;
                this.shop.innerHTML = str;
                // nums += Number(arrnmb[j]) * Number(res.data.price);
                // this.totalPrice.innerText = nums;

            }).then(function() {
                this.je = document.getElementsByClassName("jiage");
                // console.log(this.je[j].innerHTML)
                this.shuliang = document.getElementsByClassName("shuliang");
                let checkAll = document.getElementById("checkAll");
                this.cks = document.getElementsByClassName("check");
                this.list = document.getElementsByClassName("list");
                // console.log(this.list)
                this.del = document.getElementsByClassName("txt4");
                // console.log(this.del)
                this.miuns = document.getElementsByClassName("txt3");
                this.num = document.getElementsByClassName("txt2");
                this.plus = document.getElementsByClassName("txt1");


                checkAll.onclick = () => {

                        //让所有单个复选框的选中状态和全选复选框的状态一致
                        for (let i = 0; i < this.cks.length; i++) {
                            this.cks[i].checked = checkAll.checked;
                        }
                        var totalPrice = document.getElementById("totalPrice");
                        nums = 0;
                        for (let i = 0; i < this.cks.length; i++) {
                            if (this.cks[j].checked) {
                                nums += Number(this.je[i].innerText) * Number(this.shuliang[i].innerText)
                            }
                        }
                        totalPrice.innerHTML = "";
                        totalPrice.innerHTML = nums;
                        // this.getTotalPrice(); //计算总价
                    }
                    //在点击单个复选框时，判断选中的数量和总数量是否相同
                for (let x = 0; x < this.cks.length; x++) {
                    this.cks[x].onclick = () => {
                        var count = 0; //计数
                        for (let j = 0; j < this.cks.length; j++) {
                            if (this.cks[j].checked) {
                                count++;
                            }
                        }
                        if (count == this.cks.length) {
                            checkAll.checked = true;
                        } else {
                            checkAll.checked = false;
                        }
                        //计算总价

                        var totalPrice = document.getElementById("totalPrice");
                        nums = 0;
                        for (let i = 0; i < this.cks.length; i++) {
                            if (this.cks[i].checked) {
                                nums += Number(this.je[i].innerHTML) * Number(this.shuliang[i].innerHTML)
                            }
                        }

                        totalPrice.innerHTML = nums;
                    }
                }
                for (let i = 0; i < this.del.length; i++) { //删除
                    this.del[i].onclick = () => {
                        this.shop.removeChild(this.list[i]);
                        axios.delete(`http://localhost:3000/shoppings/${arrliid[i]}`);
                        var totalPrice = document.getElementById("totalPrice");
                        nums = 0;
                        for (let i = 0; i < this.cks.length; i++) {
                            if (this.cks[i].checked) {
                                nums += Number(this.je[i].innerHTML) * Number(this.shuliang[i].innerHTML)
                            }
                        }

                        totalPrice.innerHTML = nums;
                    }
                }
                //   修改数量，总价
                for (let i = 0; i < this.plus.length; i++) {
                    //减
                    console.log(this.num[0].value)
                    console.log(this.miuns[0])
                    this.miuns[i].onclick = () => {
                            this.num[i].value--;
                            this.shuliang[i].innerHTML = this.num[i].value;
                            if (this.num[i].value < 1) {
                                this.num[i].value = 1;
                                this.shuliang[i].innerHTML = "";
                                this.shuliang[i].innerHTML = this.num[i].value;
                            }
                            var totalPrice = document.getElementById("totalPrice");
                            nums = 0;
                            for (let i = 0; i < this.cks.length; i++) {
                                if (this.cks[i].checked) {
                                    nums += Number(this.je[i].innerHTML) * Number(this.shuliang[i].innerHTML)
                                }
                            }

                            totalPrice.innerHTML = nums;

                        }
                        //加
                    this.plus[i].onclick = () => {
                        this.num[i].value++;
                        this.shuliang[i].innerHTML = this.num[i].value;
                        var totalPrice = document.getElementById("totalPrice");
                        nums = 0;
                        for (let i = 0; i < this.cks.length; i++) {
                            if (this.cks[i].checked) {
                                nums += Number(this.je[i].innerHTML) * Number(this.shuliang[i].innerHTML)
                            }
                        }

                        totalPrice.innerHTML = nums;
                    }

                }


            })


        }
    })
}
cart.prototype.getzongja = function() {

    var totalPrice = document.getElementById("totalPrice");
    for (let i = 0; i < this.cks.length; i++) {
        if (this.cks.checked) {

        }
    }
    totalPrice.innerText = nums
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