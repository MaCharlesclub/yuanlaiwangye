let vue = new Vue({
    el: "#app",
    data: {
        y_password: "",
        y_case: true,       //开启大写
        y_lowCase: true,    //开启小写
        y_number: true,     //开启数字
        y_symbol: false,     //开启符号
        y_length: 8,       //长度设置
        y_copy_text: "点击复制",
        copy_svg_isShow: true,     //改变svg图标
        bgColor: ["black.css", "white.css"],
        //密码数组
        numArr: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        lowCaseArr: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        caseArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        symArr: ['_', '-', '$', '%', '&', '@', '+', '!']
    },
    methods: {
        //点击复制
        y_copy() {
            document.querySelector("#copyInput").select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            if (this.y_password === "") {
                this.y_copy_text = "点击复制";
                this.copy_svg_isShow = true;
            } else {
                this.y_copy_text = "复制成功";
                this.copy_svg_isShow = false;
                alert("复制成功");
            }
        },
        //随机生成单个密码
        getRandomNumber() {
            let x = Math.floor(Math.random() * this.numArr.length + 1) - 1;
            return this.numArr[x];
        },
        getRandomLowCase() {
            let x = Math.floor(Math.random() * this.lowCaseArr.length + 1) - 1;
            return this.lowCaseArr[x];
        },
        getRandomCaseArr() {
            let x = Math.floor(Math.random() * this.caseArr.length + 1) - 1;
            return this.caseArr[x];
        },
        getRandomSymArr() {
            let x = Math.floor(Math.random() * this.symArr.length + 1) - 1;
            return this.symArr[x];
        },
        //提交按钮
        y_submit() {
            this.y_copy_text = "点击复制";
            this.copy_svg_isShow = true;
            //获取调用方法集合
            const randomFunc = {
                lowCase: this.getRandomLowCase,
                Case: this.getRandomCaseArr,
                number: this.getRandomNumber,
                symbol: this.getRandomSymArr,
            };
            // console.log(randomFunc);
            // console.log(randomFunc.Case);

            //生成密码
            /*
            参数:
            length      需要的长度
            lowCase     小写字母的数组
            Case        大写字母的数组
            number      数字的数组
            symbol      字符的数组
            */

            //(传入方法的调用集合 , 用函数里面可以直接调用方法)
            function generatePassword(length, lowCase, Case, number, symbol) {
                //临时密码
                let generatedPassword = "";
                //判断激活了多少个选项(你点击了之后, 会返回这个方法被调用了,被调用了,就设置为true)
                const typesCount = lowCase + Case + number + symbol;
                //判断什么选项被激活了
                const typesArr = [{lowCase}, {Case}, {number}, {symbol}].filter(function (item) {
                    return Object.values(item)[0];
                });
                //如果没有选项被激活就直接返回
                if (typesCount === 0) {
                    alert("请至少选择一项选项");
                    return;
                }
                //循环长度
                for (let i = 0; i < length; i++) {
                    typesArr.forEach(function (type) {
                        //生成多少个密码
                        const funcName = Object.keys(type)[0];
                        // console.log(funcName);
                        //调用生成方法生成密码
                        generatedPassword += randomFunc[funcName]();
                    });
                }
                //返回长度为你设置的长度的字符串
                return generatedPassword.slice(0, length);
            }

            let tempPassword = generatePassword(this.y_length, this.y_lowCase, this.y_case, this.y_number, this.y_symbol);

            this.y_password = tempPassword;

        },
        //开启关闭选项
        iSCase() {
            this.y_case = !this.y_case;
        },
        iSLowCase() {
            this.y_lowCase = !this.y_lowCase;
        },
        iSNumber() {
            this.y_number = !this.y_number;
        },
        iSSymbol() {
            this.y_symbol = !this.y_symbol;
        },
        //更换皮肤
        changeSkinBlack() {
            let link = document.querySelectorAll("link")[1];
            link.href = `css/${this.bgColor[0]}`;
        },
        changeSkinWhite() {
            let link = document.querySelectorAll("link")[1];
            link.href = `css/${this.bgColor[1]}`;
        }
    },
    created() {
        //每次刷新时清除控制台
        console.clear();
    }
});