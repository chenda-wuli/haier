define([], function()  {    
    return  {        
        init: function()  {


            const  $list  =  $('.product_listbox ul');   
            $.ajax({       
                url:   'http://localhost/haier/project/php/listdata.php',
                dataType:   "json",
            }).done((data)  =>  {    
                // console.log(data);   
                let  $renderdata  =  data;       
                let  $str  =  '';     
                // console.log($renderdata)  
                $.each($renderdata,  function(index,  value)  {    
                    // console.log(value);       
                    $str  +=  `<li>
                        <div class="iimgbox">
                        <img src="${value.img}" alt="">
                        </div>
                        <div class="textbox">
                            <p class="productdescription">${value.wordage}</p>
                            <p class="productmodel ">${value.typespe}</p>
                            <p class="price">${value.price}</p>
                            <p class="salesvolume">${value.sales}</p>
                        </div>
                    </li>`;                                    
                })
                console.log($('.paging').find('span'))
                $list.html($str);   
                let arr = []
                let arr_def = []
                let prev = null
                let next = null
                $('.product_listbox ul li').each(function(i, elm) {
                    arr[i] = $(elm)
                    arr_def[i] = $(elm)
                })



                $('.up').on('click', function() {
                    for (let i = 0; i < arr.length - 1; i++) {
                        for (let j = 0; j < arr.length - i - 1; j++) {
                            prev = parseFloat(arr[j].find('.price').html().substring(1)); //获取上一个价格
                            next = parseFloat(arr[j + 1].find('.price').html().substring(1)); //获取下一个价格
                            //通过价格的判断，改变的是li的位置。
                            if (prev > next) {
                                let temp = arr[j];
                                arr[j] = arr[j + 1];
                                arr[j + 1] = temp;
                            }
                        }
                    }

                    arr.forEach(function(elm, index) {

                        $('.product_listbox ul').append(elm)
                    })
                })


                $('.mr').on('click', function() {
                    //array_default = [li,li,li,li......]
                    $.each(arr_def, function(index, value) {
                        $('.product_listbox ul').append(value);
                    });
                    return;
                });




                $('.page').pagination({
                    pageCount: 3, //总的页数
                    jump: true, //是否开启跳转到指定的页数，布尔值。
                    coping: true, //是否开启首页和尾页，布尔值。
                    prevContent: '上一页',
                    nextContent: '下一页',
                    homePage: '首页',
                    endPage: '尾页',
                    callback: function(api) {
                        console.log(api.getCurrent()); //获取的页码给后端
                        $.ajax({
                            url: 'http://localhost/haier/project/php/listdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(data) {
                            let $strhtml = '';
                            $.each(data, function(index, value) {
                                $strhtml += `<li>
                                <div class="iimgbox">
                                <img src="${value.img}" alt="">
                                </div>
                                <div class="textbox">
                                    <p class="productdescription">${value.wordage}</p>
                                    <p class="productmodel ">${value.typespe}</p>
                                    <p class="price">${value.price}</p>
                                    <p class="salesvolume">${value.sales}</p>
                                </div>
                            </li>`;
                            });
                            $strhtml += '';
                            $list.html($strhtml);

                            array_default = []; //排序前的li数组
                            array = []; //排序中的数组
                            prev = null;
                            next = null;

                            //将页面的li元素加载到两个数组中
                            $('.list li').each(function(index, element) {
                                array[index] = $(this);
                                array_default[index] = $(this);
                            });
                        })
                    }
                });

            });

        }    
    }

})