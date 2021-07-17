function showtooltip() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}
showtooltip(); //鼠标提示

$('#catalog').blur(function(){
    var catalog = $('#catalog').val();
    var sell_price = $('#sell_price').val();
    catalog = Number(catalog);
    console.log(catalog);
    if (catalog == 1 || catalog == 3 || catalog == 20 || catalog == 34) {
        $('#commission').val(12);
    } else if (catalog == 2) {
        $('#commission').val(45);
    } else if (catalog == 4) {
        $('#commission').val(10);
    } else if (catalog == 5 || catalog == 6 || catalog == 19) {
        if (sell_price < 10) {
            $('#commission').val(8);
        } else {
            $('#commission').val(15);
        }
    } else if (catalog == 17) {
        if (sell_price < 15) {
            $('#commission').val(8);
        } else {
            $('#commission').val(15);
        }
    } else if (catalog == 8 || catalog == 9 || catalog == 10 || catalog == 30 || catalog == 37 ) {
        $('#commission').val(8);
    } else if (catalog == 16 || catalog == 21 || catalog == 39 ) {
        $('#commission').val(20);
    } else if (catalog == 11) {
        $('#iscloth').prop("checked",true);
        $('#commission').val(17);
    } else {
        $('#commission').val(15);
    }
});
$('#CubicCm').click(function() {
    $('#CubicCm').removeClass('ripple');
    if ($('#ship_choose').val() == "1") {
        var ship = 6000;
    } else {
        ship = 5000;
    }
    var package_l = $('#package_l').val();
    var package_w = $('#package_w').val();
    var package_h = $('#package_h').val();
    package_l = Number(package_l);
    package_w = Number(package_w);
    package_h = Number(package_h);
    if (package_l == 0 || package_w == 0 || package_h == 0) {
        console.log('请输入产品长度');
        $('#package_l').attr('placeholder','请输入长度')
        $('#package_l').css('border-color', 'red');
        console.log('请输入产品宽度');
        $('#package_w').attr('placeholder','请输入宽度')
        $('#package_w').css('border-color', 'red');
        console.log('请输入产品高度');
        $('#package_h').attr('placeholder','请输入高度')
        $('#package_h').css('border-color', 'red');
        return false;
    } else {
        $('#package_l').css('border-color', '');
        $('#package_w').css('border-color', '');
        $('#package_h').css('border-color', '');
    }
    var tiji = (package_l * package_w * package_h) / ship;
    tiji = tiji.toFixed(4);
    $('#package_wh').val(tiji);
});
$('#result_btn').click(function() {
    $("input, select").blur();
});
$('#reset_btn').click(function() {
    $("input").not('#rate').not('#commission').not('#storage_month').not('#sea_price').not('#air_price').val('');
    $('#amz_result').html('请填写数据');
});
$('#reload_btn').click(function() {
    window.location.reload();
});
$('#end_shipping_fee').click(function() {
    $('#end_shipping_fee').removeClass('ripple');
    var ship_box = $('#box_pcs').val();
    var re_gw = $('#box_gw').val();
    var re_pieces = $('#box_num').val();
    var small_light = $('#issmall').prop("checked");
    var cloth = $('#iscloth').prop("checked");
    var end_shipping_package_l = $('#package_l_p').val();
    var end_shipping_package_w = $('#package_w_p').val();
    var end_shipping_package_h = $('#package_h_p').val();
    end_shipping_package_l = Number(end_shipping_package_l);
    end_shipping_package_w = Number(end_shipping_package_w);
    end_shipping_package_h = Number(end_shipping_package_h);
    if (end_shipping_package_l == 0 || end_shipping_package_w == 0 || end_shipping_package_h == 0) {
        console.log('请输入产品长度');
        $('#package_l_p').attr('placeholder','请输入长度')
        $('#package_l_p').css('border-color', 'red');
        console.log('请输入产品宽度');
        $('#package_w_p').attr('placeholder','请输入宽度')
        $('#package_w_p').css('border-color', 'red');
        console.log('请输入产品高度');
        $('#package_h_p').attr('placeholder','请输入高度')
        $('#package_h_p').css('border-color', 'red');
        return false;
    } else {
        $('#package_l_p').css('border-color', '');
        $('#package_w_p').css('border-color', '');
        $('#package_h_p').css('border-color', '');
    }
    if (end_shipping_package_w > end_shipping_package_l || end_shipping_package_h > end_shipping_package_l || end_shipping_package_h > end_shipping_package_w) {
        $('#size_warning').html('<span style="color: red">请从大到小填写数字！</span>');
        $('#tail').val('');
        $('#end_shipping_result_is').html(' 请重填数据');
        $('#end_shipping_result').html('!');
        return false;
    } else {
        $('#size_warning').html('');
    }
    re_pieces = Number(re_pieces);
    re_gw = Number(re_gw);
    ship_box = Number(ship_box);
    var re_gw_pcs = re_gw / re_pieces;
    o_re_wei_pcs = (re_gw_pcs/ship_box)*2.2;
    o_re_wei_pcs = Number(o_re_wei_pcs);
    var inch_weight = (end_shipping_package_l/2.54)*(end_shipping_package_w/2.54)*(end_shipping_package_h/2.54)/139;
    console.log(inch_weight);
    console.log(o_re_wei_pcs);
    console.log(small_light);
    console.log(cloth);
    if (inch_weight > o_re_wei_pcs) {
        finally_weight = inch_weight;
        finally_weight_info = '体积重' + inch_weight.toFixed(2) + 'Lb大于实重' + o_re_wei_pcs.toFixed(2) + 'Lb，取体积重：' + inch_weight.toFixed(4) + 'Lb(磅)';
    } else {
        finally_weight = o_re_wei_pcs;
        finally_weight_info = '实重' + o_re_wei_pcs.toFixed(2) + 'Lb大于体积重' + inch_weight.toFixed(2) + 'Lb，取实重：' + o_re_wei_pcs.toFixed(4) + 'Lb(磅)';
    }
    console.log('得最终重量：' + finally_weight);
    $('#end_shipping_result').show();
    $('#end_shipping_result_is').show();
    $('#end_shipping_result').html(finally_weight_info);
    if (small_light && !cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight <= 0.0625*6) {
        $('#end_shipping_result_is').html(' 轻小物品-标准小件1');
        $('#tail').val(2.16);
    } else if (small_light && !cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight > 0.0625*6 && finally_weight <= 12*0.0625) {
        $('#end_shipping_result_is').html(' 轻小物品-标准小件2');
        $('#tail').val(2.35);
    } else if (small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight <= 0.0625*6) {
        $('#end_shipping_result_is').html(' 轻小物品-标准大件3');
        $('#tail').val(2.35);
    } else if (small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 0.0625*6 && finally_weight <= 0.0625*12) {
        $('#end_shipping_result_is').html(' 轻小物品-标准大件4');
        $('#tail').val(2.60); 
    } else if (small_light && !cloth && ((end_shipping_package_l/2.54 > 18 || end_shipping_package_w/2.54 > 14 || end_shipping_package_h/2.54 > 8) || finally_weight > 0.0625*12)) {
        $('#end_shipping_result_is').html(' 轻小物品-不合标准');
        $('#tail').val(''); //轻小件非服装判断结束
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight <= 0.0625*6 ) {
        $('#end_shipping_result_is').html(' 标准小件1');
        $('#tail').val(2.70);
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight > 0.0625*6 && finally_weight < 0.0625*12) {
        $('#end_shipping_result_is').html(' 标准小件2');
        $('#tail').val(2.84);
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight > 0.0625*12 && finally_weight < 0.0625*16) {
        $('#end_shipping_result_is').html(' 标准小件3');
        $('#tail').val(3.32); //标准小件判断结束
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight <= 0.0625*6) {
        $('#end_shipping_result_is').html(' 标准大件1');
        $('#tail').val(3.47); 
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 0.0625*6 && finally_weight < 0.0625*12) {
        $('#end_shipping_result_is').html(' 标准大件2');
        $('#tail').val(3.64); 
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 0.0625*12 && finally_weight < 0.0625*16) {
        $('#end_shipping_result_is').html(' 标准大件3');
        $('#tail').val(4.25); 
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 1 && finally_weight < 2) {
        $('#end_shipping_result_is').html(' 标准大件4 <i class="fa fa-question-circle" data-bs-toggle="tooltip" data-bs-placement="top" title="尺寸小于18” x 14” x 8” - 重量1+ to 2 lb"></i>');
        $('#tail').val(4.95); 
        showtooltip();
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 2 && finally_weight < 3) {
        $('#end_shipping_result_is').html(' 标准大件5');
        $('#tail').val(5.68); 
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 3 && finally_weight < 20) {
        $('#end_shipping_result_is').html(' 标准大件6');
        $('#tail').val(5.68 + (finally_weight - 3)*0.3); //标准大件判断结束
        
    } else if (!small_light && !cloth && (end_shipping_package_l/2.54 < 60 && end_shipping_package_w/2.54 < 30 && (end_shipping_package_l/2.54 + (end_shipping_package_w/2.54 + end_shipping_package_h/2.54)*2 < 130) && finally_weight < 70)) {
        $('#end_shipping_result_is').html(' 超小件');
        $('#tail').val(8.66 + (finally_weight - 1)*0.38); //超长小件判断结束
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 < 108 && (end_shipping_package_l/2.54 + (end_shipping_package_w/2.54 + end_shipping_package_h/2.54)*2 < 130) && finally_weight < 150) {
        $('#end_shipping_result_is').html(' 超中件');
        $('#tail').val(11.37 + (finally_weight - 1)*0.39); //超长中件判断结束
    } else if (!small_light && !cloth && end_shipping_package_l/2.54 < 108 && (end_shipping_package_l/2.54 + (end_shipping_package_w/2.54 + end_shipping_package_h/2.54)*2 < 165) && finally_weight < 150) {
        $('#end_shipping_result_is').html(' 超大件');
        $('#tail').val(76.57 + (finally_weight?finally_weight>90:finally_weight=90 - 90)*0.79); //超长大件判断结束
    } else if (!small_light && !cloth && (end_shipping_package_l/2.54 > 108 || (end_shipping_package_l/2.54 + (end_shipping_package_w/2.54 + end_shipping_package_h/2.54)*2 > 180) || finally_weight > 150)) {
        $('#end_shipping_result_is').html(' 特大件');
        $('#tail').val(138.11 + (finally_weight?finally_weight>90:finally_weight=90 - 90)*0.79); //特大件判断结束
        
    } else if (cloth && small_light && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight <= 0.0625*6) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准小件');
        $('#tail').val(2.16);
    } else if (cloth && small_light && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight > 0.0625*6 && finally_weight <= 12*0.0625) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准小件');
        $('#tail').val(2.35);
    } else if (cloth && small_light && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight <= 0.0625*6) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准大件');
        $('#tail').val(2.35);
    } else if (cloth && small_light && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 0.0625*6 && finally_weight <= 0.0625*12) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-标准大件');
        $('#tail').val(2.60); 
    } else if (cloth && small_light && ((end_shipping_package_l/2.54 > 18 || end_shipping_package_w/2.54 > 14 || end_shipping_package_h/2.54 > 8) || finally_weight > 0.0625*12)) {
        $('#end_shipping_result_is').html(' 衣服轻小物品-不合标准');
        $('#tail').val(''); //衣服轻小件判断结束
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight <= 0.0625*6 ) {
        $('#end_shipping_result_is').html(' 衣服-标准小件');
        $('#tail').val(3.00);
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight > 0.0625*6 && finally_weight < 0.0625*12) {
        $('#end_shipping_result_is').html(' 衣服-标准小件');
        $('#tail').val(3.14);
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 15 && end_shipping_package_w/2.54 <= 12 && end_shipping_package_h/2.54 <= 0.75 && finally_weight > 0.0625*12 && finally_weight < 0.0625*16) {
        $('#end_shipping_result_is').html(' 衣服-标准小件');
        $('#tail').val(3.62); //衣服标准小件判断结束
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight <= 0.0625*6) {
        $('#end_shipping_result_is').html(' 衣服-标准大件1');
        $('#tail').val(3.87); 
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 0.0625*6 && finally_weight < 0.0625*12) {
        $('#end_shipping_result_is').html(' 衣服-标准大件2');
        $('#tail').val(4.04); 
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 0.0625*12 && finally_weight < 0.0625*16) {
        $('#end_shipping_result_is').html(' 衣服-标准大件3');
        $('#tail').val(4.65); 
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 1 && finally_weight < 2) {
        $('#end_shipping_result_is').html(' 衣服-标准大件4');
        $('#tail').val(5.34); 
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 2 && finally_weight < 3) {
        $('#end_shipping_result_is').html(' 衣服-标准大件5');
        $('#tail').val(6.08); 
    } else if (!small_light && cloth && end_shipping_package_l/2.54 <= 18 && end_shipping_package_w/2.54 <= 14 && end_shipping_package_h/2.54 <= 8 && finally_weight > 3 && finally_weight < 20) {
        $('#end_shipping_result_is').html(' 衣服-标准大件6');
        $('#tail').val(6.08 + (finally_weight - 3)*0.3); //衣服标准大件判断结束
    } else {
        $('#end_shipping_result_is').html(' 判断逻辑出错，请检查数据，或手动填写');
        $('#tail').val(''); //其他情况
    }

    
});
$("input, select, #end_shipping_fee, #CubicCm").blur(function(){
    var ship_box = $('#box_pcs').val();
    var re_gw = $('#box_gw').val();
    var re_wh = $('#package_wh').val();
    var re_pieces = $('#box_num').val();
    var buy_price = $('#price').val();
    var re_wh_l =$('#package_l').val();
    var re_wh_w =$('#package_w').val();
    var re_wh_h =$('#package_h').val();
    var sell_price = $('#sell_price').val();
    var rate = $('#rate').val();
    var catalog_text = $("#catalog").find("option:selected").text();
    var commission = $('#commission').val()/100;
    var tail = $('#tail').val();
    var iscloth = $('.iscloth').is(':checked');
    var end_shipping_package_l = $('#package_l_p').val();
    var end_shipping_package_w = $('#package_w_p').val();
    var end_shipping_package_h = $('#package_h_p').val();
    var storage_month = $('#storage_month').val();
    var storage_days = storage_month*12;
    end_shipping_package_l = Number(end_shipping_package_l);
    end_shipping_package_w = Number(end_shipping_package_w);
    end_shipping_package_h = Number(end_shipping_package_h);
    var acos = $('#acos').val();
    re_gw = Number(re_gw);
    re_wh = Number(re_wh);
    re_pieces = Number(re_pieces);
    buy_price = Number(buy_price);
    ship_box = Number(ship_box);
    re_wh_l = Number(re_wh_l);
    re_wh_w = Number(re_wh_w);
    re_wh_h = Number(re_wh_h);
    sell_price = Number(sell_price);
    rate = Number(rate);
    tail = Number(tail);
    acos = Number(acos);
    re_gw = re_gw * ship_box;
    re_wh = re_wh * ship_box;
    var total_pieces = ship_box * re_pieces;
    var re_gw_pcs = re_gw / re_pieces;
    var re_wh_pcs = re_wh / re_pieces;
    re_gw_pcs = re_gw_pcs.toFixed(4);
    re_wh_pcs = re_wh_pcs.toFixed(4);
    var y_fee = (sell_price * commission).toFixed(4);
    // console.log('发货总数 =' + total_pieces);
    // console.log('单件毛重 = ' + re_gw_pcs);
    // console.log('单件实重 = ' + re_wh_pcs);
    // console.log('佣金=' + y_fee);
    if (y_fee < 0.3) {
        y_fee = 0.3;
    } else {
        y_fee = y_fee;
    }
    // $('#amz_result').show();
    if (buy_price == 0) {
        // console.log('请输入采购单价');
        $('#amz_result').text('请输入采购单价');
        return false;
    }
    if (re_gw == 0) {
        // console.log('请输入箱子毛重');
        $('#amz_result').text('请输入箱子毛重');
        return false;
    }
    if (re_pieces == 0) {
        // console.log('请输入每箱件数');
        $('#amz_result').text('请输入每箱件数');
        return false;
    }
    if (ship_box == 0) {
        // console.log('请输入发货件数');
        $('#amz_result').text('请输入发货件数');
        return false;
    }
    if (re_wh == 0) {
        // console.log('请先计算体积重');
        $('#amz_result').text('请先计算体积重');
        $('#CubicCm').addClass('ripple');
        return false;
    }
    if (sell_price == 0) {
        // console.log('请先输入售价');
        $('#amz_result').text('请先输入售价');
        return false;
    }
    if (commission == 0) {
        // console.log(acos)
        // console.log('请先选择类目或者手动填写佣金费率');
        $('#amz_result').text('请先选择类目或者手动填写佣金费率');
        return false;
    }
    if (tail == 0) {
        // console.log('请先计算或手动填写尾程运费');
        $('#amz_result').text('请先计算或手动填写尾程运费');
        $('#end_shipping_fee').addClass('ripple');
        return false;
    }
    if ($('#ship_choose').val() == "1") {
        var shipping_mod = '海运';
        var shipping_fee = $('#sea_price').val();
        shipping_fee = Number(shipping_fee);
        // console.log('海运，运费单价=' + shipping_fee);
    } else {
        shipping_mod = '空运';
        shipping_fee = $('#air_price').val();
        shipping_fee = Number(shipping_fee);
        // console.log('空运，运费单价=' + shipping_fee);
    }

    if (re_gw > re_wh) {
        re_weight = '实重' + re_gw + '大于体积重' + re_wh +'，取实重' + re_gw + 'kg' + '-其中单件重:' + re_gw_pcs/ship_box + 'kg';
        total_re_weight = re_gw;
        o_re_wei_pcs = re_gw_pcs/ship_box;
        o_re_wei_pcs = Number(o_re_wei_pcs);
        // console.log('单件重=' + o_re_wei_pcs);
    } else {
        re_weight = '体积重' + re_wh +'大于实重' + re_gw + '，取体积重：' + re_wh + 'kg' + '-其中单件重' + re_wh_pcs/ship_box + 'kg';
        total_re_weight = re_wh;
        o_re_wei_pcs = re_wh_pcs/ship_box;
        o_re_wei_pcs = Number(o_re_wei_pcs);
        // console.log('单件重=' + o_re_wei_pcs);
    }
    
    
    var lfyc = end_shipping_package_h * end_shipping_package_w * end_shipping_package_h * 0.0000353;
    // 长期仓储
    if (storage_month > 12) {
        if (lfyc * 6.9 > 0.15) {
            var storage_fee_long = lfyc * 6.9 * (storage_month - 12);
            var storage_fee_long_info = '美元，体积*6.9大于0.15，取体积计费';
        } else {
            storage_fee_long = 0.15 * (storage_month - 12);
            storage_fee_long_info = '美元，单件0.15大于体积*6.9，取固定计费';
        } 
    } else {
        storage_fee_long = 0;
        storage_fee_long_info = '美元，存储时长不足一年';
    }
    // console.log('单件所占存储 = ' + lfyc + '立方英尺');
    var storage_fee_d = lfyc * 0.75;
    var storage_fee_w = lfyc * 2.4;
    var money = sell_price*rate - sell_price*commission*rate - tail*rate - shipping_fee*o_re_wei_pcs - storage_fee_d * storage_month *rate - buy_price - acos * sell_price*rate/100 - storage_fee_long;
    // console.log('淡季利润 = ' + money);
    var money_w = sell_price*rate - sell_price*commission*rate - tail*rate - shipping_fee*o_re_wei_pcs - storage_fee_w * storage_month *rate - buy_price - acos * sell_price*rate/100;
    // console.log('旺季利润 = ' + money_w);
    money = Number(money).toFixed(4);
    money_w = Number(money_w).toFixed(4);
    
    $('#amz_result').html (
        '<table class=\"table table-bordered table-hover table-striped\">' +
        '<tr><td style="width: 25%">采购价：</td><td>' + (buy_price/rate).toFixed(4) + '美元，' + buy_price +'元</td></tr>' +
        '<tr><td>共发货：</td><td>' + total_pieces + '件<br>' +
        '<tr><td>运输方式：</td><td>' + shipping_mod + '，单价' + (shipping_fee/rate).toFixed(4) + '美元/kg，' + shipping_fee +'元/kg</td></tr>' +
        '<tr><td>重量：</td><td>' + re_weight + '</td></tr>' +
        '<tr><td>运费：</td><td>' + '总计:' + (shipping_fee*total_re_weight).toFixed(4) + '元，单件:' + (shipping_fee*o_re_wei_pcs/rate).toFixed(4) +'美元/件，' + (shipping_fee*o_re_wei_pcs).toFixed(4) + '元/件</td></tr>' +
        '<tr><td>销售价格：</td><td>' + sell_price.toFixed(4) + '美元，' + (sell_price*rate).toFixed(4) + '元</td></tr>' +
        // '<tr><td>所属类目：</td><td>' + catalog_text + '</td></tr>' +
        '<tr><td>佣金比例：</td><td>' + commission*100 + '%</td></tr>' +
        '<tr><td>销售佣金：</td><td>' + y_fee + '美元，' + (y_fee*rate).toFixed(4) + '元</td></tr>' +
        '<tr><td>尾程派送费：</td><td>' + tail + '美元，' + (tail*rate).toFixed(4) + '元</td></tr>' +
        '<tr><td>预计仓储费：</td><td>单件占用仓储：' + lfyc.toFixed(4) +'立方英尺，存放' + storage_month + '月，淡季' + (storage_fee_d * storage_month).toFixed(4) + '美元，旺季：' + (storage_fee_w * storage_month).toFixed(4) + '美元</td></tr>' +
        '<tr><td>长期仓储费：</td><td>' + storage_fee_long + storage_fee_long_info + '</td></tr>' +
        '<tr><td>毛利润：</td><td>淡季：' + (money/rate).toFixed(4) + '美元，' +  money  + '元。 旺季：' + (money_w/rate).toFixed(4) + '美元，' +  money_w  + '元。</td></tr>' +
        '<tr><td>毛利率：</td><td>淡季：' + (((money/rate)/sell_price*100)).toFixed(4) +  '%。 旺季：' + (((money_w/rate)/sell_price*100)).toFixed(4) + '%</td></tr>' +
        '</table>' +
        '<code class="inquiry">数据不对？去<a href="https://www.silencetime.com/archives/215/" target="_blank">提交反馈</a></code>'
    );
    // console.log(re_gw_pcs)
    if (re_gw_pcs*re_pieces/ship_box > 22.5 && re_wh_l < 63.5 && re_wh_w < 63.5 && re_wh_h < 63.5) {
        $('#warning').show();
        $('#warning').html("箱子重量已经超过22.5kg<br>");
    } else if (re_gw_pcs*re_pieces/ship_box > 22.5 && (re_wh_l > 63.5 || re_wh_w > 63.5 || re_wh_h > 63.5)) {
        $('#warning').show();
        $('#warning').html("箱子重量已经超过22.5kg<br>箱子单边长度已超63.5cm<br>");
    } else if (re_gw_pcs*re_pieces/ship_box < 22.5 && (re_wh_l > 63.5 || re_wh_w > 63.5 || re_wh_h > 63.5)) {
        $('#warning').show();
        $('#warning').html("箱子单边长度已超63.5cm<br>");
    }
    else {
        $('#warning').hide();
        $('#warning').html("正常尺寸和重量");
    }
});
$('#amzbox_btn').click(function() {
    $('#amz_result').show();
    $('#amz_result').html(
        '<b>尺寸及重量要求：</b>' +
        '<ol>' +
        '<li>Amazon规定，单箱包裹不可以超过30kg。这是amazon基于货物操作效率所规定的强制标准。但是不同站点的具体要求又有不同，欧洲站要求不超过15kg，美国是22kg。若单件重量超过要求，需要在纸箱的四面张贴“超重”的警示标志。（标签需彩色打印，且每边不小于8cm）</li>' +
        '<li>纸箱任何一面尺寸不能超过63.5 cm，除非一个单件出运的货物本身尺寸超过63.5cm。纸箱单件尺寸超过63.5 cm（如：不可搬运的）必须放入标准1000 x1250 mm的托盘上（仅限UK）或800x1200 mm托盘（其他欧洲国家），除非单件可出运货物的纸箱尺寸超过标准的托盘尺寸。</li>'+
        '<li>选择纸箱的尺寸是确保在货物放入后最少空余空间。空间利用率也可以通过单箱多个包装商品尽可能地最大化（在商品不受损害情况下）。</li>'+
        '<li>纸箱被确定为一起销售的（比如：套装）重量大于30 kg必须被放在一个单一的托盘上（一个出售商品对应一个托盘上）并且需要在纸箱四面都张9）单件出售的纸箱货商品（比如：家具）重量大于30 kg，通常都需要打托盘。警示标签必须张贴在纸箱四面合适的位置。</li>'+
        '<li>FBA要求外箱粘贴国家标；为了分辨货物。国际的式样、颜色按照《各国标志贴纸9.18（CS4）转曲（1）》文件要求执行。英国FBA头程国家标的尺寸为边长4cm的正方形。国家标粘贴在每箱货物窄侧面的右上角，两张。</li>'+
        '</ol>'+
        '<b>包装选材：</b>'+
        '<ol>'+
        '<li>全球亚马逊都有统一的货物包装标准，都是选用标准的六面纸箱对商品进行包装。</li>'+
        '<li>不要选用破损运输箱（局部或整体有破损）或污染纸箱（外围大面积被涂画）包装商品。</li>'+
        '<li>不要使用可生物分解的包装（钛mgc包装）打包商品。</li>'+
        '<li>不要使用柔软、容易破损的纸箱，包装必须足够坚硬，在运输货物的过程中能够承受任何外界的压力。</li>'+
        '<li>纸箱内的填充物不要用松散的材质填充（如：泡沫塑料或者碎纸），填充物须用能被亚马逊接受的材料。用大型尺寸的衬垫，例如空气枕，整张纸张，泡沫纸或者缠绕膜。</li>'+
        '<li>在使用二次利用的纸箱时，确保盒子襟翼完好无损。</li>'+
        '<li>不能用大型订书钉或尼龙纤维胶带对纸箱固定或封口。</li>'+
        '<li>当多种货物箱运输时，不要用打包带，松紧带或者其他皮带来捆绑纸箱。</li>'+
        '<li>不要在纸箱外围做增加填充物、防护板、纸板等操作。</li>'+
        '<li>除非单件货物的纸箱尺寸超标，纸箱的任意一边尺寸不得超过63.5cm。</li>'+
        '<li>不要发送尺寸像托盘尺寸一样的纸箱。</li>'+
        '</ol>'+
        '<p>入仓被拒的货物需发回到原处，重新打包入仓，时间为一周左右，不仅会产生额外的费用，还会延误货物的交期。所以在出货前需要仔细核对自己的货物包装等问题是否符合目的国的要求，以免因被拒收而造成的损失。</p>'
        );
});

$(document).ready(function() {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") === '') {
        //设置开启时间和结束时间
        if (new Date().getHours() > 15 || new Date().getHours() < 14) {
            $('body').addClass('night');
            document.cookie = "night=1;path=/";
            console.log('夜间模式开启');
        } else {
            $('body').removeClass('night');
            document.cookie = "night=0;path=/";
            console.log('夜间模式关闭');
        }
    } else {
        var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if (night == '0') {
            $('body').removeClass('night');
        } else if (night == '1') {
            $('body').addClass('night');
        }
    }
});
$('#night_btn').click(function() {
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)night\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0') {
        $('body').addClass('night');
        document.cookie = "night=1"
        console.log(' 夜间模式');
    } else {
        $('body').removeClass('night');
        document.cookie = "night=0"
        console.log(' 白天模式');
    }
});
// 配置定时器，实时刷新美元的汇率,循环更新
// setInterval(exchange, 1000);
// 又不是啥大项目，所以只访问时执行一次,然后按需手动更新！
setTimeout(exchange, 1000);
function exchange() {
    $.ajax({
        type: "get",

        url: "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=1%E7%BE%8E%E5%85%83%E7%AD%89%E4%BA%8E%E5%A4%9A%E5%B0%91%E4%BA%BA%E6%B0%91%E5%B8%81&co=&resource_id=5293&t=1586223308933&cardId=5293&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&alr=1&cb=jQuery110203991885021937811_1586223277956&_=1586223277958",/*url写异域的请求地址*/

        dataType: "jsonp",/*加上datatype*/

        jsonpCallback: "jQuery110203991885021937811_1586223277956",/*设置一个回调函数，名字随便取，和下面的函数里的名字相同，还需要跟url中cb名字相同*/
        success: function () {
        }

    })
}
function jQuery110203991885021937811_1586223277956(data) {
    // var title = data.Result[0].DisplayData.resultData.tplData.content1;
    var usd2rmb = data.Result[0].DisplayData.resultData.tplData.money2_num;
    $('#rate').val(usd2rmb)
}
// 手动更新汇率
$('#update_rate').click(function(){
    exchange();
})
var get_year = new Date();
var year = get_year.getFullYear();
$('#year').text(year);