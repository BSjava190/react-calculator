import React, {Component} from "react";
import {Button} from "react-bootstrap";
import '../App.css'

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state={
            lastNumber:null,
            currentNumber:null,
            result:null,
            isDecimal: false,
            isEquals: false,
            clearValue:'AC',
            operator:null
        }
    }

    showOutput = (myNewValue) => {
        this.setState({
            result:myNewValue,
        })
    }


    onCalculate = (x, y, operator) => {
        x= Number(x);
        y= Number(y)

        switch (operator) {
            case "/":
                return x / y;
            case "*":
                return x * y;
            case "+":
                return x + y;
            case "-":
                return x - y;
            default:
                return "0"
        }
    }


    ifEquals = () => {
        let isEquals = this.state.isEquals
        if(isEquals){
            this.setState({
                currentNumber: this.state.result,
                lastNumber: null,
                operator:null,
                result : null,
                isDecimal  : null,
                isEquals : false,
            },()=>this.showOutput(this.state.currentNumber))

        }
    }

    calculatorLogic=(input)=>{
        let {lastNumber,currentNumber,result,operator} = this.state;
        if(lastNumber != null && currentNumber != null && operator != null){
            this.setState({
                result : this.onCalculate(lastNumber, currentNumber, operator),
                operator : input,
                lastNumber : result,
                currentNumber : null
            },()=>this.showOutput(this.onCalculate(lastNumber, currentNumber, operator)))


        } else
        if(lastNumber == null && currentNumber != null && operator == null){
            this.setState({
                operator : input,
                lastNumber : currentNumber,
                currentNumber : null
            },()=>this.showOutput(currentNumber))
        } else
        if(lastNumber == null && currentNumber == null && operator == null){
            this.showOutput("0");
        } 
    }

    handleClick=(e)=> {
        let currentValue = e.target.name;
        let {lastNumber,currentNumber,result,operator,isDecimal} = this.state;
        switch (currentValue){
            case "AC":
                this.setState({
                    currentNumber : null,
                    lastNumber : null,
                    operator : null,
                    result : null,
                    isDecimal : false,
                    isEquals : false,
                    clearValue :'AC'
                },()=>this.showOutput("0"));
                break;

            case "C":
                this.setState({
                    currentNumber : result.length > 1 ? result.slice(0,-1): '0',
                    result : result.length > 1 ? result.slice(0,-1): '0',
                    lastNumber : result.length > 1 ? result.slice(0,-1): '0',
                    isDecimal : false,
                    isEquals : false,
                    clearValue: result.length > 1 ? 'C': 'AC'
                },()=>this.showOutput(result.length > 1 ? result.slice(0,-1): '0'))
                break;

            case "%":
                if(result != null){
                    this.showOutput(result /= 100);
                } else
                if(currentNumber != null){
                    this.showOutput(currentNumber /= 100);
                }
                break;

            case "+/-":

                if(result != null && currentNumber === null){
                        this.setState({
                            lastNumber: result * -1,
                        },()=>this.showOutput(result *= -1))


                }
                else if(currentNumber != null){

                    this.setState({
                        currentNumber: currentNumber * -1,
                    },()=>this.showOutput(currentNumber *= -1));
                }
                else if(currentNumber === null){
                        this.setState({
                            currentNumber:currentNumber,
                            lastNumber: result * -1,
                        },()=>this.showOutput(result *= -1))
                    }
                break;

            case "/":
                this.ifEquals();
                this.calculatorLogic(currentValue);
                break;

            case "*":
                this.ifEquals();
                this.calculatorLogic(currentValue);
                break;

            case "-":
                this.ifEquals();
                this.calculatorLogic(currentValue);
                break;

            case "+":
                this.ifEquals();
                this.calculatorLogic(currentValue);
                break;

            case ".":
                if(isDecimal === false){
                    (currentNumber == null) ? currentNumber = 0 + "." : currentNumber += ".";
                    this.setState({
                        clearValue:'C',
                        isDecimal:true,
                        currentNumber
                    })

                } 
                this.showOutput(currentNumber);
                break;

            case "=":
                if(lastNumber != null && currentNumber != null && operator != null){
                    
                    this.setState({
                        result : this.onCalculate(lastNumber, currentNumber, operator),
                        lastNumber : this.onCalculate(lastNumber, currentNumber, operator),
                        isEquals:true,
                        clearValue:'AC'
                    },()=>this.showOutput(this.onCalculate(lastNumber, currentNumber, operator)))

                } 
                break;

            default:
                (currentNumber === null || currentNumber === '0') ? currentNumber = currentValue : currentNumber += currentValue;
                this.setState({
                    clearValue:'C',
                    currentNumber
                },()=>this.showOutput(currentNumber))
                break;


        }
    }

    render() {
        const {result,clearValue} = this.state
        return(
            <div className={"calculator-border"}>
                <div className={"result"}>
                    {result}
                </div>

                <div className={"row"}>
                    {clearValue === 'AC' ?
                        <div className={"col-3"}><Button className={"btn-dark-grey"} name={"AC"}
                                                         onClick={this.handleClick}>AC </Button></div>
                        :
                        <div className={"col-3"}><Button className={"btn-dark-grey"} name={"C"}
                                                         onClick={this.handleClick}>C </Button></div>
                    }
                    <div className={"col-3"}><Button className={"btn-dark-grey"} name={"+/-"}
                                                     onClick={this.handleClick}>+/- </Button></div>
                    <div className={"col-3"}><Button className={"btn-dark-grey"} name={"%"}
                                                     onClick={this.handleClick}>% </Button></div>
                    <div className={"col-3"}><Button className={"btn-orange"} name={"/"}
                                                     onClick={this.handleClick}>/ </Button></div>
                </div>
                <div className={"row"}>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"7"}
                                                     onClick={this.handleClick}>7 </Button></div>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"8"}
                                                     onClick={this.handleClick}>8</Button></div>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"9"}
                                                     onClick={this.handleClick}>9</Button></div>
                    <div className={"col-3"}><Button className={"btn-orange"} name={"*"}
                                                     onClick={this.handleClick}>x</Button></div>
                </div>
                <div className={"row"}>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"4"}
                                                     onClick={this.handleClick}>4</Button></div>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"5"}
                                                     onClick={this.handleClick}>5</Button></div>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"6"}
                                                     onClick={this.handleClick}>6</Button></div>
                    <div className={"col-3"}><Button className={"btn-orange"} name={"-"}
                                                     onClick={this.handleClick}>-</Button></div>
                </div>
                <div className={"row"}>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"1"}
                                                     onClick={this.handleClick}>1</Button></div>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"2"}
                                                     onClick={this.handleClick}>2</Button></div>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"3"}
                                                     onClick={this.handleClick}>3</Button></div>
                    <div className={"col-3"}><Button className={"btn-orange"} name={"+"}
                                                     onClick={this.handleClick}>+</Button></div>
                </div>
                <div className={"row"}>

                    <div className={"col-6"}><Button className={"btn-light-grey"} style={{width: '135px'}} name={"0"}
                                                     onClick={this.handleClick}>0</Button></div>
                    <div className={"col-3"}><Button className={"btn-light-grey"} name={"."}
                                                     onClick={this.handleClick}>.</Button></div>
                    <div className={"col-3"}><Button className={"btn-orange"} name={"="}
                                                     onClick={this.handleClick}>=</Button></div>
                </div>
            </div>
        )
    }
}

export default Calculator;