document.addEventListener("DOMContentLoaded", function(event) {

    let ButtonsObj = {}
    let numbers = {};
    let operators = {};

    let InputArr = [];
    let NumString = '';
    let PartB = 0;
    let counter = 0;
    var vvv;

    function options(SystemOperators) {
        SystemOperators = (SystemOperators) ? SystemOperators : ['AC', 'equal', 'point'];

        this.ButtonsWrapper = document.querySelector('.grid-4-5');
        this.Buttons = this.ButtonsWrapper.children;
        this.ScreenInput = document.querySelector('#input');
        this.ScreenOutput = document.querySelector('#output');
        this.SystemOperators = SystemOperators;

        for (var i = 0; i < this.Buttons.length; i++) {
            let getId = this.Buttons[i].getAttribute('id');
            let But = this.Buttons[i];

            if (isNaN(getId)) {
                operators[getId] = But;
                ButtonsObj['operators'] = operators;
                But.addEventListener("click", touchOp);
                // document.addEventListener('keydown', event, touchOp);

            }else {
                numbers[getId] = But;
                ButtonsObj['numbers'] = numbers;
                But.addEventListener("click", touchNum);
                // document.addEventListener('keydown', touchNum);
            }
        }

        return this;
    }

    let ScreenInterface = {
        InputMode: function (msg, num, hasOperator) {
            if (hasOperator) {
                NumString = '';
                InputArr[num] = msg;
                options().ScreenInput.innerText = InputArr.join(' ');
            } else {
                NumString += msg;
                InputArr[num] = NumString;
                options().ScreenInput.innerText = InputArr.join(' ');
            }
        },
        OutputMode: function (msg){
            options().ScreenOutput.innerText = msg;
            InputArr = [];
            options().ScreenInput.innerText = '0';
        },
        ReadMode: function (){
            return {
                in : this.InputMode,
                out : this.OutputMode
            }
        }
    }

    let DeviceInterface = Object.create(ScreenInterface);


    function touchNum() {
        // console.log(event.key);
        // // if ((this.key).match(/[0-9%\/*\-+\(\)=]|Backspace|Enter/)){
        // //
        // // }

        if (this.innerText == '0' && counter == 0){
            counter = 0;
        }else{
            DeviceInterface.InputMode(this.innerText, counter, false);
        }
    }

    function touchOp() {

        switch (this.id) {
            case options().SystemOperators[0]: // AC
                InputArr = [];
                DeviceInterface.InputMode('0', 0, true);
                break;
            case options().SystemOperators[1]: // equal
                if (InputArr != []) {
                    let answer = calc(InputArr.filter(Boolean));  // TODO: Must be in begin filtered array
                    DeviceInterface.OutputMode(answer);
                }
                InputArr = [];
                DeviceInterface.InputMode('', 0, true);
                document.querySelector('.devil').style.opacity = '1';
        }

        if (this.id == 'plus' || this.id == 'minus' || this.id == 'multiply' || this.id == 'devide') {
            counter++;
            DeviceInterface.InputMode(this.innerText, counter, true);
            counter++;
        }
    }


    function calc(NumArray) {
        if (NumArray[0] == '-') {
            NumArray[1] = '-' + NumArray[1];
            NumArray.splice(0, 1);
        }
        while (NumArray.length > 2) {
            switch (NumArray[1]) {
                case '+':
                    PartB = parseFloat(NumArray[0]) + parseFloat(NumArray[2]);
                    break;
                case '-':
                    PartB = parseFloat(NumArray[0]) - parseFloat(NumArray[2]);
                    break;
                case 'x':
                    PartB = parseFloat(NumArray[0]) * parseFloat(NumArray[2]);
                    break;
                case '/':
                    PartB = parseFloat(NumArray[0]) / parseFloat(NumArray[2]);
            }

            NumArray.splice(0, 3);
            NumArray.unshift(PartB);
        }
        return NumArray[0];
    }


    (function() {
        options();
    })()  // init

    /*
    1. Записываем в массив входные данные (числа и операторы)
    2. Поиск операторов слева направо по приоритету (скобки, умнож, деление, плюс, минус) разбить на матрицу
     */

});