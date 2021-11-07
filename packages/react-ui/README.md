### 文档22

### 参考 antd-form-table、react-easy-antd-form(npm包)
### 参考 动态form
https://zhuanlan.zhihu.com/p/89495112
 https://zhuanlan.zhihu.com/p/103641468
 https://github.com/leonwgc/antd-form-render  (http://www.manongjc.com/detail/23-zfslodbwhytytip.html)

// 第一步

// 联动设计

单选日期、多选日期，采用moment进行开发

// 属性提取，ItemOptions,包含所有类型，各个类型进行提取部分类型作为此次参数

// label与组件的宽度调整，由Form.Item自带colSpan来控制
{
    wrapClassName: {},
    props: {}, // formProps
    column: 1, // 1, 2, 3, 4
    widgets: {}, // 自定义组件
    disabled: false, // 全局控制禁用状态
    width: 0, //最大宽度， 默认 占满整行
    labelWidth: 0,// label宽度
    debug: false, // debug为true，控制台显示日志,process.env.NODE_ENV === 'development' && debug
    watch: () => {}, // 监听表单状态变化回调，可针对性做特殊处理，比如表单之间联动
    onFinish: () => {}, // form.submit的回调
    initialValues: {},
    onReset: () => {}, // 重置回调
    onSearch: () => {}, // 搜索调用form.submit()回调
    data: [
        {
            type: 'Input',
            childType: 'Password',
            title: 'label值',
            initialValue: '',
            name: '字段名',
            enum: [],  // 枚举值需要与source进行合并进行显示,value值会进行去重
            enumNames: [],
            source: [
                {
                    title: '',
                    value: '',
                }
            ],
            debounce: 300, // 默认为300，自动开启节流，输入框需要
            props: {
                style: {},
                className: {},
            }, // 用在子组件上
            childProps: {}, // 用在 Option 或者 Radio 或者 Checkbox等组件上
            disabled: false,
            required: false, // 是否必传, 提示语：${title}不可为空, 为true，rules规则不显示required
            rules: [],
            render: (item, ) => {} // 自定义函数，组件不支持的情况可使用
            space: true, // true 或者数字，表示往下空多少数字
        },
        {
            type: 'DatePicker',
            childType: 'RangePicker', // 单日期、双日期等
            format: '', // 日期格式化
            title: 'label值',
            initialValue: '', // string | string[]
            name: '字段名',
            props: {
                style: {},
                className: {},
            }, // 用在子组件上
            childProps: {}, // 用在 Option 或者 Radio 或者 Checkbox等组件上
            disabled: false,
            required: false, // 是否必传, 提示语：${title}不可为空, 为true，rules规则不显示required
            rules: [],
            render: (item, ) => {} // 自定义函数，组件不支持的情况可使用
            space: true, // true 或者数字，表示往下空多少间距
        },
        {
           type: 'Button',
           title: '',
           list: [
               {
                   childType: 'reset', // reset或search 重置或搜索
                   props: {}, // 按钮属性
                   onClick: () => {},
                   title: '显示文字',
               }
           ] 
        }
    ]
}


// ModalFormRender

// 第二步： TableRender, 包装FormRender组件，增加自定义Table组件属性，自动生成React代码
1、增加表格项配置
2、增加操作按钮的配置
3、结合FormRender与Table配置

// 第三步：业务验证使用