//1. how do we know which btn was clicked?=>event listeners
//=> we attach click event to every button and check which button was clicked using class or id or text content

//2.what should happen when a number is clicked?=> we need to append the number to the input screen and update the expression variable
//=>store it => display

//3.what should happen when an operator is clicked?=> we need to append the operator to the input screen and update the expression variable
//2 + => store both values =>display 2+

//4. what should happen ehwn "=" is clicked? => we need to evaluate the expression and display the result
//=> use eval() function to evaluate the expression and display the result
//=> 2+3 => show = 5

// AC is clicked => clear the input screen and reset the expression variable
// <= is clicked => delete the last character from the input screen and update the expression variable
//123 => 12 => remove last char






//setup and initialization

document.addEventListener('DOMContentLoaded', function(){
    //accessing the elements
    const inputScreen = document.getElementById("input-screen");
    const displayField = document.getElementById("display");
    const buttons = document.querySelectorAll("button");

    //crate variables
    let expression = "";
    let shouldClearInput = false;

    //function to clear the input screen=>AC
    function clearInputScreen() {
        expression = "";//rem stored expression
        inputScreen.value = "";//clear the input screen
        displayField.value = "";//reset display to 0
        shouldClearInput = false;//reset the flag
    }

    // <= function to delete the last character from the input screen
    function deleteLastCharacter() {
        expression = expression.slice(0, -1);//remove the last character from the expression
        //update the input screen with the new expression
        inputScreen.value = expression;

    }

    //for result => evaluate the expression and display the result
    function evaluateExpression() {
        try {
            const result = eval(expression).toString();//evaluate the expression and convert to string,eval ("2+3")=>5.toString() => "5"
            displayField.value = expression;//display the result in the display field
            inputScreen.value = result;//update the input screen with the result
            shouldClearInput = true;//set the flag to clear input on next entry 
            expression=" ";//reset the expression
        } catch (error) {
            inputScreen.value = "Error";//display error message on invalid expression

        }
    }

        //for operation buttons and number buttons
        function addOperator(operator) {
            if (shouldClearInput) {
                clearInputScreen();//clear the input screen if the flag is set
            }
            expression = expression + operator;//append the operator to the expression
            inputScreen.value = expression;//update the input screen with the new expression
        }
        //add numbers
        function appendToExpression(text) {
            if(shouldClearInput) {
                clearInputScreen();//clear the input screen if the flag is set
            }
            expression = expression + text;//append the number to the expression
            inputScreen.value = expression;//update the input screen with the new expression
        }

        //functn for handling sqrt,+/-,1/x
        function handleNewOperation(operation){
            if(expression==="")return;

            let result;
            //convert expression to number
            const currentValue = parseFloat(expression)
            //perform the operation
            switch(operation){
                case "toggleSign":
                    result=currentValue * -1;
                    break;
                    case "sqrt":
                        result = Math.sqrt(currentValue);
                        expression= `\u221A${currentValue}`
                        break;
                        case "reciprocal":
                        result= 1/currentValue
                        expression=`1/$(currentValue)`
                        break;
                        case "percentage":
                            result = currentValue/100
                            expression = `${currentValue}%`
                            break;


            }
            displayField.value= expression
            expression = result.toString();
            inputScreen.value = expression;
            shouldClearInput= "true"

        }

        //add event listeners to the buttons
        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                if(button.classList.contains("clear-icon")){
                    clearInputScreen();
         }
                else if(button.classList.contains("delete-icon")){
                    deleteLastCharacter();
                }
                else if(button.classList.contains("equal-icon")){
                    evaluateExpression();
                }
                else if(button.classList.contains("divide-icon")){
                    addOperator("/");
                }
                else if(button.classList.contains("multiply-icon")){
                    addOperator("*");
                }
                else if(button.classList.contains("add-icon")){
                    addOperator("+");
                }
                else if(button.classList.contains("minus-icon")){
                    addOperator("-");
                }
                else if(button.classList.contains("mod-icon")){
                    addOperator("%");
                }
                else if(button.classList.contains("power-icon")){
                    addOperator("**");
                }
                else if(button.classList.contains("toggle-sign-icon")){
                    handleNewOperation("toggleSign")
                }
                //reciprocal
                else if(button.classList.contains("reciprocal-icon")){
                     handleNewOperation("reciprocal")
                }
                //sqrt
                else if(button.classList.contains("squareroot-icon")){
                 handleNewOperation("sqrt")
                }
                //percentage
                else if(button.classList.contains("percentage-icon")){
                    handleNewOperation("percentage")
                }
              
                else {
                    appendToExpression(button.innerText);
                     console.log("click");
                }
            
            })
       });
           });