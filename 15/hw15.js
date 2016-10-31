// 2016/10/19
//
// ============
// 作业 15
//
//
// 本次作业没有提示的地方需要自行搜索
// 别忘了用 github 管理作业的进度
// ============
//



// 作业 1
//
// 实现函数 GuaOptions1
/*
options 是一个包含 string 的数组
本函数对每个 string 生成一个复选框和文本
append 到 body 中
示意图如下

+-+
| | string
+-+

*/
var GuaOptions1 = function(options) {
    $('body').append(`
        <div class="checkbox-panel">
            <div class='checkboxes'>
            </div>
        </div>`)
    for (var i = 0; i < options.length; i++) {
        $('.checkboxes').append(`
            <input type="checkbox" name="name" value="">
            <span>${options[i]}</span><br>
        `)
    }
}


// 作业 2
//
/*
options 是一个包含 string 的数组
本题和作业 1 一样的功能 只是多了 2 个按钮
全选 和 反选
*/
var GuaOptions2 = function(options) {
    // html
    GuaOptions1(options)
    $('.checkbox-panel').append(`
        <div class="checkbox-select-buttons">
            <button id='id-button-select-all' type="button" name="button">全选</button>
            <button id='id-button-select-inverse' type="button" name="button">反选</button>
        </div>
    `)
    // js
    $('head').append(`
        <script>
            var toggleChecked = function(input){
                if (input.checked) {
                    input.checked = false
                } else {
                    input.checked = true
                }
            }
            var addChecked = function(input){
                if (!input.checked) {
                    input.checked = true
                }
            }
            var bindCheckButtons = function() {
                $('#id-button-select-all').on('click', function(){
                    $('.checkboxes').find('input').each(function(i, e) {
                        addChecked(e)
                    })
                })
                $('#id-button-select-inverse').on('click', function(){
                    $('.checkboxes').find('input').each(function(i, e) {
                        toggleChecked(e)
                    })
                })
            }
        </script>
    `)
    bindCheckButtons()
}


// 作业 3
//
/*
options 是一个包含如下 object 的数组
text 是文本描述
checked 是布尔值, 表示是否打勾
{
    'text': 'string',
    'checked': true,
}
本题和作业 2 一样的功能, 但是参数变了
并且要求在初始化的时候要按照相应的值对相应的复选框打勾
*/
var GuaOptions3 = function(options) {
    GuaOptions2($.map($(options), function(e){return e.text}))
    for (var i = 0; i < options.length; i++) {
        $('.checkboxes').find('input')[i].checked = options[i].checked
    }
}


// 作业 4
//
/*
本题和作业 3 一样的功能
但是多了 2 个按钮 save 和 load
save 按钮点击的时候会保存当前的 options 状态到 localStorage(用 JSON)
load 按钮点击的时候会从 localStorage 中读取保存的信息并更新界面
*/
var GuaOptions4 = function(options) {
    GuaOptions3(options)
    // html
    $('.checkbox-panel').append(`
        <div class="checkbox-save-buttons">
            <button id='id-button-save' type="button" name="button">保存</button>
            <button id='id-button-load' type="button" name="button">读取</button>
        </div>
    `)
    // js
    $('head').append(`
        <script>
            var saveOptions = function() {
                var options = []
                var input = $('.checkboxes').find('input')
                var label = $('.checkboxes').find('span')
                for (var i = 0; i < input.length; i++) {
                    var a = {}
                    a.text = $(label[i]).text()
                    a.checked = input[i].checked
                    options.push(a)
                }
                localStorage.setItem('options', JSON.stringify(options))
            }

            var loadedOptions = function() {
                return JSON.parse(localStorage.getItem('options'))
            }

            var bindSaveAndLoadButton = function() {
                $('#id-button-save').on('click', function() {
                    saveOptions()
                })
                $('#id-button-load').on('click', function() {
                    $('.checkbox-panel').remove()
                    GuaOptions4(loadedOptions())
                })
            }
        </script>
    `)
    bindSaveAndLoadButton()
}
