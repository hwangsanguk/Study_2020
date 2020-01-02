# 2.1.1 Const,let

보통 자바스크립트를 배울 때 var로 변수 선언하는 방법을 배움.
하지만 var은 이제 const와 let이 대체

~~~~~javascript
//예제
if (ture) { 
var x = 3;
}
console.log(x); //3 이 나옴

if (true) {
 const y = 3;
}
console.log(y) //Uncaught ReferenceError: y is not defined
~~~~~

### x는 정상출력, y는 에러 발생

var (예제의 x 변수) 는 함수 스코프를 가지므로 if 문의 블록과 관계없이 접근할 수 있습니다.
const & let (예제의 y 변수) 은 블록 스코프를 가지므로 블록 밖에서는 접근할 수 없다.(블록의 범위: if, while, for, function 등의 중괄호)
이를 통해 호이스팅 같은 문제도 해결되고 코드 관리도 수월해짐

### const 와 let 의 차이

~~~~~javascript
const a = 0;
a = 1; // Uncatught TypeError: Assignment to constant variable.
let b = 0;
b =1; // 1

const c; // Uncatught SyntaxError : Missing initalizer in const declaration
~~~~~
기본적으로 변수 선언 시에는 const 사용, 다른 값을 대입해야 하는 상황이 생겼을 시에는 let을 사용
# 2.1.2 템플릿 문자열

기존 ES5 문법
~~~~~javascript
var num1 = 1;
var num2 = 2;
var result = 3;
var string1 = num1 + ' 더하기 ' + num2 + '는 \'' reult + '\'';
console.log(string1); // 1 더하기 2는 '3'
~~~~~

문자열 string1 은 띄어쓰기와 변수, 더하기 기호 때문에 가독성이 좋지 않음

~~~~~javascript
const num3 = 1;
const num4 = 2;
const result2 = 3;
const string2 = `${num3} 더하기 ${num4}는 '${result2}'`;
console.log(string2); // 1 더하기 2 는 '3'
~~~~~

훨씬 깔끔해졌다. ${변수} 형식으로 변수를 더하기 기호 없이 문자열에 넣을 수 있다.

# 2.1.3 객체 리터럴
객체 리터럴에는 편리한 기능들이 추가되었다.

~~~~~~javascript
var sayNode = function(){
    console.log('Node');
};
var es = 'ES';
var oldObject = {
    sayJs : function(){
        console.log('JS');
    },
    sayNode: sayNode,
};
oldObject[es+6] = 'Fantastic';

oldObject.sayNode(); //Node
oldObject.sayJS();//JS
console.log(oldObject.ES6);//Fantastic
~~~~~~

~~~~~javascript
var sayNode = function(){
    console.log('Node');
};
var es = 'ES';
const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,
    [es +6]: 'fantastic',
};

newObject.sayJS(); // JS
newObject.sayNode // Node
console.log(newObject.ES6) //fantastic
~~~~~
객체의 메서드에 함수를 연결할 때 더는 콜론(:) 과 function을 붙이지 않아도 된다. 또한 sayNode : sayNode 와 같이 속성명과 변수명이 겹치는 경우에는 한 번만 쓸 수 있게 되었다.

ex)
{name: name, age: age} // es5
{name, age} //es6

객체의 속성명을 동적으로 생성하는 것도 가능해 졌다. (oldObject 밖에 es ='ES' , [es+6] 를 사용 하던 것을 newObject에서는 안에서 사용한다.)

# 2.1.4 Arrow function(화살표 함수)

화살표 함수라는 새로운 함수가 추가되었으며, 기존의 function(){} 도 그대로 사용 가능
~~~~~javascript
function add1(x,y){
    return x + y;
}
const add2 = (x,y) =>{
    return x + y;
}
const add3 = (x,y) => x+y;
const add4 = (x,y) => (x+y);
function not1(x){
    return !x;
}
const not2 = x =>!x;
~~~~~

add1,add2,add3,add4 는 다 같은 결과를 리턴해주는 함수이다. 마찬가지로 not1 과 not2 또한 같은 결과를 리턴해줌
화살표 함수에서는 function 선언 대신 => 기호로 함수를 선언할수 있다. 또한, 변수에 대입하면 나중에 재 사용할 수 있다.
add2와 같이 return을 적어주거나, add3,add4와 같이 바로 리턴값을 적을 수도 있으며, add4처럼 괄호로 묶어 사용 가능하다.


function 함수와 arrow 함수의 차이는 **this의 바인드 방식**이다.
**중요 예제**
~~~~~javascript
var relationship1 = {
    name: 'zero',
    friends : ['nero','hero','xero'],
    logFriends : function() {
        var that = this; //relationship1 을 가르키는 this 를 that에 저장 --(1)
        this.friends.forEach(function(friend){
            console.log(that.name,friend); //this의 내용을 var을 통해 that에 저장하였기에 that의 저장 내용을 받아 올 수 있음
        }); // forEach 문안에서 function을 사용하였기에 각자 다른 함수 스코프의 this를 가지고 있음, 그렇기에 (1) 처럼 저장하여 this를 간접적으로 접근하였음
    },
};
relationship1.logFriends();

const relationship2 = {
    name: 'zero',
    friends : ['nero','hero','xero'],
    logfriends(){
        this.friends.forEach(friendsd =>{
            console.log(this.name, friend);
        }); // forEach문에서 arrowFunction을 사용하였음 따라서 바깥 스코프인 logFriends의 this를 그대로 사용 할 수 있음. 상위 스코프의 this를 그대로 물려 받은 것이다.
    }
}
realationship2.logfriends()
~~~~~