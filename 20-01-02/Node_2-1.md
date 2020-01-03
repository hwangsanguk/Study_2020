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

# 2.1.5 비구조화 할당

객체와 배열로부터 속성이나 요소를 쉽게 꺼낼 수 있다.
~~~~~javascript
var candyMachine = {
    status: {
        name: 'node',
        count : 5,
    },
    getCandy : function(){
        this.status.count--;
        return this.status.count;
    }
};
var getCandy = candyMachine.getCandy;
var count = candyMachine.status.count;
//객체의 속성을 같은 이름의 변수에 대입하는 코드이다. 이를 다음과 같이 변경 가능

const candyMachine2 = {
    status : {
        name:'node',
        count:5,
    },
    getCandy(){
        this.status.count--;
        return  this.status.count;
    }
};
const {getCandy, status:{ count }} = candyMachine;
~~~~~

# 2.1.6 프로미스
자바스크립트와 노드에서는 주로 비동기 프로그래밍을 한다. 특히 이벤트 주도 방식 때문에 콜백 함수를 자주 사요한다. ES2015 부터는 자바스크립트와 노드의 API들이 콜백 대신 프로미스 기반으로 재구성 되었다. 이를 통해 콜백 헬 을 극복했다고 한다.

**프로미스 예제**
~~~~~javascript
const condition = true; //true 면 resolve, false면 reject
const promise = new Promise((resolve,reject) =>{ // --(1) new Promise 로 프로미스를 생성, 안에 resolve와 reject를 매개변수로 갖는 콜백 함수를 넣어줌
    if(condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

promise //--(2) 이렇게 만든 promise 변수에 then과 catch 메서드를 붙일 수 있음 
    .then ((message)=>{//resolve가 호출시 then 실행
        console.log(message); // 성공(resolve)한 경우 실행
    })
    .catch((error)=>{//reject가 호출시 catch 실행
        console.error(error); //실패(reject) 한 경우 실행
    })

//then이나 catch에서 다시 다른 then 이나 catch를 붙일 수 있다.
promise
    .then((message)=>{
        return new Promise((resolve,reject) =>{// 다른 then에 then을 붙이기 위해 return 값을 만들어 넘겨준다
        //프로미스를 return 한 경우 프로미스가 수행된 후 다음 then이나 catch가 호출된다.
            resolve(message);
        });
    })
    .then((message2) =>{
        console.log(message2);
        return new Promise ((resolve,reject)=>{
            resolve(message2);
        });
    })
    .then((message3)=>{
        console.log(message3);
    })
    .catch((error)=>{
        console.error(error);
    });
~~~~~

이것을 활용해서 콜백을 프로미스로 바꿀 수 있다.
**<콜백을 쓰는 패턴을 프로미스로 바꿔보자>**
~~~~~javascript
//콜백 패턴
function findAndSaveUser(Users){
    Users.findOne({},(err,user) =>{// 첫번째 콜백
    if(err) {
        return console.error(err);
    }
    user.name = 'zero';
    user.save((err)=>{// 두번째 콜백
        if(err){
            return console.error(err);
        }
        Users.findOne({gender:'m'}, (err,user)=>{// 세번째 콜백
            //생략
        });
    });
    });
}
//콜백 함수가 세번 중첩되어 있다. 콜백 함수가 나올 때마다 코드의 깊이가 깊어진다.
//각 콜백 함수마다 에러도 따로 처리해야한다. 이것을 다음과 같이 바꿀수 있음
~~~~~

~~~~~javascript
// 프로미스를 통한 콜백 함수 해결
function findAndSaveUser(Users){
    Userse.findOne({})
        .then((user)=>{
            user.name ='zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({ gender: 'm'});
        })
        .then((user)=>{
            //생략
        })
        .catch(err =>{
            console.error(err);
        });
}
~~~~~
코드의 깊이가 더 이상 깊어지지 않습니다. then 메서드들은 순차적으로 실행이 된다. 콜백에서 매번 따로 처리해야 했던 에러도 마지막 catch에서 한번에 처리할 수 있다.
하지만 모든 콜백 함수를 위와 같이 바꿀 수 있는 것은 아니다. 메서드가 프로미스 방식을 지원해야 한다.
예제의 코드는 findOne과 save 메서드가 내부적으로 프로미스 객체를 가지고 있어서 가능한 것이다.

프로미스 여러 개를 한번에 실행하는 방법
~~~~~javascript
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1,promise2])
    .then((result) =>{
        console.log(result); //['성공1','성공2']
    })
    .catch((error)=>{
        console.error(error);
    })
~~~~~
Promise.resolve는 즉시 resolve 하는 프로미스를 만드는 방법이다. 비슷한 것으로 즉시 reject하는 Promise.reject도 있다. 프로미스가 여러 개 있을 때 Promise.all에 넣으면 모두 resolve 될 때까지 기다렸다가 then으로 넘어갑니다. result 매개변수에 각각의 프로미스 결괏값이 배열로 들어 있다. promise중 하나라도 reject가 되면 catch 로 넘어간다