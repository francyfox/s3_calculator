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
        this.ScreenInput = this.ButtonsWrapper.querySelector(ScreenInput);
        this.ScreenOutput = this.ButtonsWrapper.querySelector(ScreenOutput);
        this.SystemOperators = SystemOperators;

        for (var i = 0; i < this.Buttons.length; i++){
            let getId = this.Buttons[i].getAttribute('id');
            let But = this.Buttons[i];

            if(isNaN(getId)){
                operators[getId] = But;
                ButtonsObj['operators'] = operators;
                But.addEventListener("click", touchOp);

            }else {
                numbers[getId] = But;
                ButtonsObj['numbers'] = numbers;
                But.addEventListener("click", touchNum);
            }
        }

        return this;

    }

    function SendMsg(msg) {
        this.SendMsg = SendMsg;
    }

    function ReadMsg(msg) {
        this.ReadMsg = ReadMsg;
    }

    function touchNum() {
        SendMsg('')
        console.log(options().ScreenInput);
    }

    function touchOp() {
        console.log(this.innerText);
    }



    function calculate() {  // math options

    }

    function SwitchOperator(){  // change operator

    }

    function SystemOptions(){  // AC, Brackets, point, equal

    }

    function ScreenInterface(input, output){  //input, output message

        return [

        ]
    }

    function Device() {  // fabric
        const opt = new options();
        ScreenInterface(opt.ScreenInput, opt.ScreenOutput);

    }

    (function() {
        Device();
    })()  // init


});