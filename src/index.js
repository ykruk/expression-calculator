function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let exprArr = [];
    let sub ='';
  
    expr.split('').forEach(function(element) {
      if (+element || element === '0') {
        sub += element;
      } else if (element === ' ') {
        //remove spaces
      } else {
        if (sub) {
          exprArr.push(sub);
          sub='';
        }
        exprArr.push(element);
      }
    })
    if (sub) {
      exprArr.push(sub);
      sub='';
    }
  
    let output = [];
    let temp =[];
    let k = 1;
  
    exprArr.forEach(function(element, index, array) {
      switch (element) {
        case '(':
          temp.push(element);
          break;
        case '-':
          if (array[index+1] === '/' || array[index+1] === '*' || array[index+1] === ')' || array[index+1] === '(') {
            k = 1;
            temp.push(element);
          } else {
            k = -1;
            if (temp[temp.length-1] === '/' || temp[temp.length-1] === '*') {
              output.push(temp[temp.length-1]);
              temp.pop();
            }
            temp.push('+');
          }
          break;
        case '+':
          k = 1;
          if (temp[temp.length-1] === '/' || temp[temp.length-1] === '*') {
            output.push(temp[temp.length-1]);
            temp.pop();
          }
          temp.push(element);
          break;
        case ')':
          for (let i = temp.length-1; i >= 0; i--) {
            if (temp[i] === '(') {
              temp.pop();
              i = -1;
            } else {
              output.push(temp[i]);
              temp.pop();
              if(i === 0) throw new Error("ExpressionError: Brackets must be paired");
            }
          }
          if (temp[temp.length-1] === '-') {
            output.push(temp[temp.length-1]);
            temp.pop();
          }
          break;
        case '*':
        case '/':
          k = 1;
          if (temp[temp.length-1] === '/' || temp[temp.length-1] === '*') {
            output.push(temp[temp.length-1]);
            temp.pop();
          }
          temp.push(element);
          break;
  
          default:
            if ((array[index+1] === '+' || array[index+1] === '-')
              && (temp[temp.length-1] === '/' || temp[temp.length-1] === '*')) {
              output.push(element*k);
              output.push(temp[temp.length-1]);
              temp.pop();
            } else {
              output.push(element*k);
            }
      }
    });
  
    for (let i = temp.length-1; i >= 0; i--) {
      if (temp[i] === ')' || temp[i] === '(') {
        throw new Error("ExpressionError: Brackets must be paired");
      }
      output.push(temp[i]);
      temp.pop();
    }
  
    let end = output.length;
    for (let i = 0; i < end; i++) {
      if (+output[i] || output[i] === 0) {
        
      } else {
        output.splice(i-2, 3, calculate(output[i-2], output[i-1], output[i]));
        i -= 2;
        end -= 2;
      }
    }
    
    function calculate (value1, value2, operator) {
      let result;
      switch (operator) {
        case '+':
          result = value1 + +value2;
          break;
  
        case '-':
          result = value1 - value2;
          break;
  
        case '/':
          if (+value2 === 0) throw new Error("TypeError: Division by zero.");
          result = value1 / value2;
          break;
  
        case '*':
          result = value1 * value2;
          break;
      }
      return result;
    }
  
    return output[0];
  
  }

module.exports = {
    expressionCalculator
}