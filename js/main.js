document.addEventListener("DOMContentLoaded", function(event) {

    let ButtonsObj = {}
    let numbers = {};
    let operators = {};

    function options(ButtonsWrapper, ScreenInput, ScreenOutput, SystemOperators) {

        ButtonsWrapper = (ButtonsWrapper) ? ButtonsWrapper: '.grid-4-5';
        ScreenInput = (ScreenInput) ? ScreenInput: '#input';
        ScreenOutput = (ScreenOutput) ? ScreenOutput: '#output';
        SystemOperators = (SystemOperators) ? SystemOperators: ['AC', 'equal', 'point'];

        this.ButtonsWrapper = document.querySelector(ButtonsWrapper);
        this.Buttons = this.ButtonsWrapper.children;
        this.ScreenInput = document.querySelector(ScreenInput);
        this.ScreenOutput = document.querySelector(ScreenOutput);
        this.SystemOperators = SystemOperators;

        for (var i = 0; i < this.Buttons.length; i++){
            let getId = this.Buttons[i].getAttribute('id');
            let But = this.Buttons[i];

            if(isNaN(getId)){
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

    var InputArr = [];
    var NumString = '';
    var ScreenInterface = {

        InputMode: function (msg, num, hasOperator){
            console.log(InputArr);
            if (hasOperator){
                NumString = '';
                InputArr[num] = msg;
                options().ScreenInput.innerText = InputArr.join(' ');
            }else{
                NumString += msg;
                InputArr[num] = NumString;
                options().ScreenInput.innerText = InputArr.join(' ');
            }
        },
        OutputMode: function (msg){
            options().ScreenOutput.innerText = InputArr.join(' ');
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


    var DeviceInterface = Object.create(ScreenInterface);
    var counter = 0;

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
                DeviceInterface.InputMode('0', 0);
                break;
            case options().SystemOperators[1]: // equal
                if (InputArr != []){
                    DeviceInterface.OutputMode(this.innerText);
                }
                DeviceInterface.InputMode('', 0);
                break;
            case options().SystemOperators[2]:  // point
                break;
            case 'plus':
                counter++;
                DeviceInterface.InputMode(this.innerText, counter, true);
                counter++;
        }
    }
    
    function calc() {

    }

    function Device() {
        options();
    }


    (function() {
        Device();
    })()  // init

    /*
    1. Записываем в массив входные данные (числа и операторы)
    2. Поиск операторов слева направо по приоритету (скобки, умнож, деление, плюс, минус) приоритет
     */

});