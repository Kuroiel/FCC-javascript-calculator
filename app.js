class Calculator extends React.Component {
	constructor (props){
		super(props);
		this.state = {
current: '0',
operator: '',
oldval: '',
isneg: false,
wasComputed: false
		}
this.clearEverything=this.clearEverything.bind(this);
this.setNumbers = this.setNumbers.bind(this);
this.setOperator = this.setOperator.bind(this);
this.compute = this.compute.bind(this);
this.addDecimal = this.addDecimal.bind(this);
	}

	clearEverything (){
		this.setState({
			current: '0',
			operator: '',
			oldval: '',
			isneg: false,
			wasComputed: false
		})
	};
setNumbers (event) {
let pressedNumber = event.target.value;
if (this.state.current === '0') {
	this.setState ({
		current: pressedNumber
	});
} else if (this.state.wasComputed){
			this.setState({
		oldval: this.state.current,
		wasComputed: false,
	});
	this.setState({
		current: pressedNumber
	});
}
else if (this.state.current !== '0' && this.state.operator === ''){
	let tempNum = this.state.current;
	tempNum = tempNum + pressedNumber;
	this.setState({
		current: tempNum
	});
} else if (this.state.current !== '0' && this.state.operator !== '' && this.state.oldval === '') {
		this.setState({
		oldval: this.state.current,
		current: '0'
	});
	this.setState({
		current: pressedNumber
	});
} else if (this.state.current !== '0' && this.state.operator !== '' && this.state.oldval !== '') {
	let tempNum2 = this.state.current;
	tempNum2 = tempNum2 + pressedNumber;
	this.setState({
		current: tempNum2
	})
}
}

setOperator (event) {
let pressedOperator = event.target.value;
if (this.state.operator === '') {
	this.setState({
		operator: pressedOperator
	})
} else if (this.state.oldval !== '' && this.state.current !== '0') {
	this.compute ();
	this.setState({
		operator: pressedOperator

	})
}
else if ((this.state.operator !== '' || this.state.operator !== '-') && pressedOperator === '-') {
	this.setState({
		isneg: true
	})
} else if (this.state.isneg === true && pressedOperator !== '-') {
	this.setState({
		isneg: false,
		operator: pressedOperator
	})
}
}

compute () {
let num1 = parseFloat(this.state.oldval);
let num2 = parseFloat(this.state.current);
if (this.state.isneg) {
	num2 = num2 * -1;
}
let result;
if (this.state.operator === '+') {
	result = num1 + num2;
} else if (this.state.operator === '-') {
	result = num1 - num2;
} else if (this.state.operator === '*') {
	result = num1 * num2;
} else if (this.state.operator === '/') {
	result = (num1 / num2).toFixed(4);
	if(result.slice(-1) === '.' || result.slice(-1) === '0'){
	do {
		result = result.slice(0, -1)
	}
	while (result.slice(-1) === '.' || result.slice(-1) === '0')
}
}
this.setState({
	current: result,
	operator: '',
	wasComputed: true,
	oldval: ''
})
}

addDecimal () {
if (!this.state.current.includes('.')) {
	let hasDot = this.state.current + '.'
	this.setState({
		current: hasDot
	})
} 
}

render() {
		return(
		<div id="everything">

<div>
<p id="display">{this.state.current}</p>
</div>

<div id="buttons">
<button id="clear" onClick={this.clearEverything}>Clear</button>
<br />
<button id="seven" class="numberButton" value="7" onClick={this.setNumbers}>7</button>
<button id="eight" class="numberButton" value="8" onClick={this.setNumbers}>8</button>
<button id="nine" class="numberButton" value="9" onClick={this.setNumbers}>9</button>
<button id="divide" class="numberButton" value="/" onClick={this.setOperator}>/</button>
<br />
<button id="four" class="numberButton" value="4" onClick={this.setNumbers}>4</button>
<button id="five" class="numberButton" value="5" onClick={this.setNumbers}>5</button>
<button id="six" class="numberButton" value="6" onClick={this.setNumbers}>6</button>
<button id="multiply" class="numberButton" value="*" onClick={this.setOperator}>*</button>
<br />
<button id="one" class="numberButton" value="1" onClick={this.setNumbers}>1</button>
<button id="two" class="numberButton" value="2" onClick={this.setNumbers}>2</button>
<button id="three" class="numberButton" value="3" onClick={this.setNumbers}>3</button>
<button id="subtract" class="numberButton" value="-" onClick={this.setOperator}>-</button>
<br />
<button id="zero" class="numberButton" value="0" onClick={this.setNumbers}>0</button>
<button id="decimal" class="numberButton" value="." onClick={this.addDecimal}>.</button>
<button id="equals" class="numberButton" value="=" onClick={this.compute}>=</button>
<button id="add" class="numberButton" value="+" onClick={this.setOperator}>+</button>
</div>

		</div>
)
	}
};

ReactDOM.render(<Calculator />, document.getElementById("calculator"));
