class Calculator {

    constructor () {
        this.value = 0
        this.history = []
    }

    excuteCommand(command) {
        this.value = command.execute(this.value)
        this.history.push(command)
    }

    undo(){
        const command = this.history.pop()
        this.value = command.undo(this.value)
    }

    add(valueAdd) {
        this.value += valueAdd
    }
    substract(valueSub) {
        this.value -= valueSub
    }
    multiply(valueMult) {
        this.value *= valueMult
    }
    divide(valueDiv) {
        this.value /= valueDiv
    }
}

class AddCommand{

    constructor(valueAdd){
        this.valueAdd = valueAdd
    }

    execute(command){
        return command + this.valueAdd
    }

    undo(command){
        return command - this.valueAdd
    }

}

class SubtractCommand{
    constructor(valueSub){
        this.valueSub = valueSub 
    }

    execute(command){
        return command - this.valueSub
    }

    undo(command){
        return command + this.valueSub
    }
}

class DivideCommand{
    constructor(valueDiv){
        this.valueDiv = valueDiv 
    }

    execute(command){
        return command / this.valueDiv
    }

    undo(command){
        return command * this.valueDiv
    }
}

class MultiplyCommand{
    constructor(valueMult){
        this.valueMult = valueMult 
    }

    execute(command){
        return command * this.valueMult
    }

    undo(command){
        return command / this.valueMult
    }
}

class AddThenMultiplyCommand{
    constructor(valueAdd,valueMult){
        this.valueAdd = new AddCommand(valueAdd)
        this.valueMult = new MultiplyCommand(valueMult)
    }

    execute(command){
        const value = this.valueAdd.execute(command)
        return this.valueMult.execute(value)
    }

    undo(command){
        const value = this.valueMult.undo(command)
        return this.valueAdd.undo(value)
    }

}



const calculator = new Calculator()
calculator.excuteCommand( new AddThenMultiplyCommand(10,2))
console.log(calculator.value, calculator.history)
calculator.undo()
console.log(calculator.value, calculator.history)