    //Variables
    const themeSlider = document.getElementById('theme-slider');
    const keysEl = document.querySelector('.calc-keys');
    const display = document.querySelector('.calc-display');
    let previousKey = '';
    let firstValue = '';
    let operator = '';
    let secondValue = '';
    let _firstValue = '';
    let _operator = '';
    let _secondValue = '';

    //Function: Display Keys
    const displayKeys = () => {
        const keys = [
            '7', '8', '9', 'del',
            '4', '5', '6', '+',
            '1', '2', '3', '-',
            '.', '0', '/', 'x',
            'reset', '='
        ];
        keys.forEach(key => {
            const button = document.createElement('button');
            const buttonContent = document.createTextNode(key);
            button.appendChild(buttonContent);
            button.classList.add('key');
            switch(key) {
                case 'del': 
                    button.setAttribute('data-action', 'del');
                    break;
                case '+':
                    button.setAttribute('data-action', 'add');
                    break;
                case '-':
                    button.setAttribute('data-action', 'subtract');
                    break;
                case '.':
                    button.setAttribute('data-action', 'decimal');
                    break;
                case '/':
                    button.setAttribute('data-action', 'divide');
                    break;
                case 'x':
                    button.setAttribute('data-action', 'multiply');
                    break;
                case 'reset':
                    button.setAttribute('data-action', 'reset');
                    break;
                case '=':
                    button.setAttribute('data-action', 'equal');                            
            }
            keysEl.appendChild(button);
        });
    };

    //Function: Choose Theme
    const chooseTheme = () => {
        themeSliderValue = themeSlider.value;
        if (themeSliderValue === '1') {
            document.documentElement.classList.remove('theme-two');
            document.documentElement.classList.remove('theme-three');
            document.documentElement.classList.add('theme-one');
        } else if (themeSliderValue === '2') {
            document.documentElement.classList.remove('theme-one');
            document.documentElement.classList.remove('theme-three');
            document.documentElement.classList.add('theme-two');
        } else if (themeSliderValue === '3') {
            document.documentElement.classList.remove('theme-one');
            document.documentElement.classList.remove('theme-two');
            document.documentElement.classList.add('theme-three');
        }
    };

    //Function: Calculate
    const calculate = (num1, operator, num2) => {
        if (operator === 'add') {
            return parseFloat(num1) + parseFloat(num2);
        } else if (operator === 'subtract') {
            return parseFloat(num1) - parseFloat(num2);
        } else if (operator === 'multiply') {
            return parseFloat(num1) * parseFloat(num2);
        } else if (operator === 'divide') {
            return parseFloat(num1) / parseFloat(num2);
        }
    };

    //Event: DOM Loaded
    document.addEventListener('DOMContentLoaded', () => {
        //display all keys
        displayKeys();

        //add click on keys
        keysEl.addEventListener('click', e => {
            if (e.target.matches('button')) {
                const key = e.target;
                const action = key.getAttribute('data-action');
                const displayedNum = display.textContent;
                const keyContent = key.textContent;
                const allKeys = [...key.parentNode.children];
                allKeys.forEach(k => k.classList.remove('key-pressed'));
                if (!action) {
                    if (displayedNum === '0' || previousKey === 'operator' || previousKey === 'calculate') {
                        display.textContent = keyContent;
                    } else {
                        display.textContent = displayedNum + keyContent;
                    }
                    previousKey = 'number';
                }
                if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                    if (firstValue && operator && previousKey !== 'operator') {
                        secondValue = displayedNum;
                        const calcValue = calculate(firstValue, operator, secondValue);
                        firstValue = calcValue;
                        display.textContent = calcValue;
                    } else {
                        firstValue = displayedNum;
                    }
                    operator = action;
                    previousKey = 'operator';
                    key.classList.add('key-pressed');
                }
                if (action === 'del' || action === 'reset') {
                    display.textContent = '0';
                    if (action === 'reset') {
                        previousKey = '';
                        firstValue = '';
                        operator = '';
                        secondValue = '';
                        _firstValue = '';
                        _operator = '';
                        _secondValue = '';
                    }
                }
                if (action === 'decimal') {
                    if (!displayedNum.includes('.')) {
                        display.textContent = displayedNum + '.';
                    }
                    if (previousKey === 'operator' || previousKey === 'calculate') {
                        display.textContent = '0.';
                    }
                    previousKey = 'decimal';
                }
                if (action === 'equal') {
                    secondValue = displayedNum;
                    if (firstValue) {
                        const calcValue = calculate(firstValue, operator, secondValue);
                        display.textContent = calcValue;
                        _firstValue = calcValue;
                        _operator = operator;
                        _secondValue = secondValue;
                        firstValue = '';
                        operator = '';
                        secondValue = '';
                    } else if (_firstValue) {
                        if (previousKey === 'calculate') {
                            const calcValue = calculate(_firstValue, _operator, _secondValue);
                            display.textContent = calcValue;
                            _firstValue = calcValue;
                        }
                    }
                    previousKey = 'calculate';
                }
            }
        });
        
    });
    //Event: Choose Theme
    themeSlider.addEventListener('input', chooseTheme);