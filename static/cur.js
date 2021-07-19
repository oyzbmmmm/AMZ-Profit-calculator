// 配置定时器，实时刷新美元的汇率,循环更新
// setInterval(exchange, 1000);
// 又不是啥大项目，所以只访问时执行一次,然后按需手动更新！
setTimeout(exchange, 1000);

function exchange() {
    $.ajax({
        type: "get",

        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=1%E7%BE%8E%E5%85%83%E7%AD%89%E4%BA%8E%E5%A4%9A%E5%B0%91%E4%BA%BA%E6%B0%91%E5%B8%81&co=&resource_id=5293&t=1586223308933&cardId=5293&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&alr=1&cb=jQuery110203991885021937811_1586223277956&_=1586223277958",
        /*url写异域的请求地址*/

        dataType: "jsonp",
        /*加上datatype*/

        jsonpCallback: "jQuery110203991885021937811_1586223277956",
        /*设置一个回调函数，名字随便取，和下面的函数里的名字相同，还需要跟url中cb名字相同*/
        success: function() {}

    })
}

function jQuery110203991885021937811_1586223277956(data) {
    // var title = data.Result[0].DisplayData.resultData.tplData.content1;
    var usd2rmb = data.Result[0].DisplayData.resultData.tplData.money2_num;
    $('#rate').val(usd2rmb);
    $('#usd').text(usd2rmb);
}

// 获取节点
const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const swap = document.getElementById("swap");
const rateEl = document.getElementById("rate");
// 通过fetch获取汇率并实现dom更新
function calculate() {
    const currency_one = currencyEl_one.value; //获取到是什么交换
    const currency_two = currencyEl_two.value; //什么
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(res => res.json()).then(data =>
        /*下载数据,然后转换为json数据,然后是把数据赋值给*/
        {
            const rate = data.rates[currency_two];
            /*rates就是api里面的数组.意思是1块钱人民币转换成rates[currency_two]数组里面的值是多少.*/
            rateEl.innerText = `1${currency_one}=${rate}${currency_two}`; //1CNY = 0.317255FJD.ratee就是转换的利率
            amountEl_two.value = (amountEl_one.value * rate).toFixed(4); //人民币比如20转换成美元就是20rate就是一块钱人民币转换成美元是多少。*起来就得出结果了。。
        }); /*汇率的api*/

}
calculate(); //先执行一次
currencyEl_one.addEventListener("change", calculate); //左上角的动西
amountEl_one.addEventListener("input", calculate); //右上角的东西
currencyEl_two.addEventListener("change", calculate); //左下角的东西
amountEl_two.addEventListener("input", calculate); //右下角的东西
swap.addEventListener("click", () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate(); //刷新把.
}); //交换的按钮,按下第二次就是美元兑换成人民币是多少。