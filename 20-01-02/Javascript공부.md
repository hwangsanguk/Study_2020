# Navigator 객체

Cross-Browsing?
: W3C 의 HTML,CSS 스펙에 따라 브라우저를 만듬
업체들 마다 다르기에 우리의 코드가 다른 결과를 만들수도 있음
이러한 이슈를 cross-browsing이슈라 부르며 이것을 해결하기 위해 navigator 객체를 사용할 것임

javascript는 netscape가 만든 언어임

~~~~javascript
console.dir(navigator);
console.dir(navigator.appName); => netscape(fire fox) 라는 브라우저인것을 알 수 있음 // 웹브라우저의 이름이다.
console.dir(navigator.appVersion); 브라우저에 관한 자세한 정보가 나옴// 브라우저의 버전을 의미한다.
console.dir(navigator.userAgent); 필요한 정보를 가져오는데 그때, 브라우저가 서버에게 요청을 하는데 이때 어떤 브라우저인지에 대한 정보를 catch함// 브라우저가 서버측으로 전송하는 USEr-Agent HTTP 헤더의 내용이다.
consoel.dir(navigator.platform) // 브라우저가 동작하고 있는 운영체제에 대한 정보이다.

~~~~





## Template Literal

const , let => ES6,
ES7 ,ES8 등등 새로운게 나오고 있음

~~~~javascript
function hello(name){
	console.log(`hello ${name}`);
    return
}
//or
function hello(name){
    return `Hello ${name}` //여기서 함수가 끝남
}
   
hello(wook);
~~~~

연습)

~~~~~~javascript
function getGrade(score){
	if(score === 100){
        return 'A+';
    } else if(score >= 90){
        return 'A';
    } else if(score ===89)
        // ....
        // 이런식으로 작성하여 grade로 가능
}

const grade = getGrade(100);
console.log(grade)
~~~~~~



## Arrow function

~~~~~~javascript
const add = (a,b)=>{
	return a+b;
}

const add = (a,b) => a+b;
const sum = add(1,2);
console.log(sum);
~~~~~~

특징: 함수 내부에서 바로 어떤 값을 리턴하고 있는데 이러한 경우에 더 짧게 코드 작성이 가능
화살표 함수와 그냥 함수의 차이점: 화살표 함수가 가르키는 this라는 값이랑 다르다.



## 객체

~~~~~javascript
const dogName = '멍멍이';
const dogAge = 2;
console.log(dogName);
console.log(dogAge);
// 
const dog = {
	name: '멍멍이',
	age:2,
}; // name,age 등은 key라고 불림, 보통 문자열로 되어있음(공백이 존재하면 안됨, '' 으로 감싸주면 공백이 가능)
console.log(dog); //{name:'멍멍이', age:2}
console.log(dog.name); // 멍멍이
console.log(dog.age); //2
~~~~~

연습)

~~~~~javascript
const ironMan = {
	name: '토니 스타크',
	actor: '로버트 다우니 주니어',
	alias: '아이언맨',
}
const captainAmerica ={
	name: '스티븐 로저스',
	actor: '크리스 에반스',
	alias: '캡틴 아메리카'
}
console.log(ironMan);
console.log(captainAmerica);

function print(hero){
    const text = `${hero.alias}(${hero.name})역할을 맡은 배우는 ${hero.actor}입니다.`
    console.log(text);
}
print(ironMan);// 아이언맨(토니 스타크) 역할을 맡은 배우는 로버트 다우니 주니어 입니다.

print(captainAmerica);// 캡틴 아메리카(스티븐 로저스) 역할을 맡은 배우는 크리스 에반스 입니다.

~~~~~



**비구조화 할당**

~~~~~javascript
function print({alias, name, actor}){//(2) 이 방식으로 사용 가능
    
    //const {alias, name, actor} = hero;(1) 이 방식을
    const text = `${alias}(${name})역할을 맡은 배우는 ${actor}입니다.`
    console.log(text);
}
print(ironMan);// 아이언맨(토니 스타크) 역할을 맡은 배우는 로버트 다우니 주니어 입니다.

print(captainAmerica);// 캡틴 아메리카(스티븐 로저스) 역할을 맡은 배우는 크리스 에반스 입니다.
// 즉 비구조화 할당은 객체내에서의 key값들을 미리 지정해 주어서 사용하는것
~~~~~



## 객체 안에 함수 넣기

~~~javascript
const dog = {
	name: '멍멍이',
	sound: '멍멍!',
	//say: function say(){
		//console.log(this.sound)
	//},
    say(){
		console.log(this.sound)
	}
   
    //화살표 함수는 사용 불가능 , 
    say: () =>{
        console.log(this) // Error가 남
    }
// function 함수는 자신이 어디에 속해 있는 곳을 가르키는 this가 사용 가능한데, arrow function은 어디에 속해 있는곳으로 연결이 불가하여 this적용이 불가
};
const cat = {
    name: '야옹이',
    sound: '야옹~',
}
cat.say = dog.say;  //dog의 say()함수에 매칭, this가 cat.sound에 매칭이 됨
dog.say(); // 멍멍!
cat.say(); // 야옹~

const catSay = cat.say;// 객체안의 함수를 밖으로 꺼내면 ,꺼내는 순간 this와의 관계가 사라져서 Error가 나게 됨.
catSay();// Error undefined
~~~

## Getter 와 Setter 함수

~~~~~~javascript
const numbers = {
    a:1,
    b:2,
    get sum() {
        console.log('sum 함수 실행');
        return this.a + this.b
    }
};
console.log(numbers.sum); //  sum 함수 실행, 3 값이 나옴

numbers.b = 5;
console.log(numbers.sum); // sum 함수 실행,6 이 나옴
~~~~~~

~~~~~javascript
const dog = {
	_name: '멍멍이', // Setter함수와 겹치지 않게 하기위해 _ 사용
	set name(value) {
	console.log('이름이 바뀝니다.' + value)
	this._name = value;
	}
};
console.log(dog._name); //멍멍이
dog.name = '뭉뭉이'; //이름을 바꿈
console.log(dog._name); //이름이 바뀝니다 뭉뭉이
~~~~~

~~~javascript
활용 1)
const numbers = { 
	_a: 1,
	_b: 2,
	sum:3,
	calculate() {
	console.log('calculate');
	this.sum = this._a + this._b
	},
	get a() {
		return this._a
	}
	get b() {
		return this._b
	},
	set a (value){
		this._a = value;
		this.calculate();
	},
	set b(value){
		this._b = value;
		this.calculate();
	}
}
console.log(numbers.sum);
numbers.a=5;
~~~

~~~~~
활용 1-1) 비효울적// 콘솔에 계속 sum 이라는 단어가 계속 뜸
const numbers = { 
	_a: 1,
	_b: 2,
	get sum() {
		console.log('sum');
		return this.a + this.b;
	}
} // 비효율적인 방법
~~~~~

### e.preventDefault() 함수

이벤트를 취솔할 수 있는 경우, 이벤트의 전파를 막지않고 그 이벤트를 취소한다.
즉, 현재 이벤트의 기본 동작을 중단한다.

e.stopPropagation() : 현재 이벤트가 상위로 전파되지 않도록 중단
e.stopImmediatePorpagation() : 현재 이벤트가 상위뿐 아니라 현재 레벨에 걸린 다른 이벤트도 동작하지 않도록 중단.
return false :  jQuery 사용시 위의 두개 모두를 수행한 것과 같고, jQuery를 사용하지 않을 때는 e.preventDefault와 같다.

설명 추가 : <https://programmingsummaries.tistory.com/313>


### 동기 / 비동기
Synchronous(동기) , Asynchronous(비동기)
동기적 처리(Synchronous)는 코드가 위에서 부터 아래로 순차적으로 실행되므로 콘솔에 찍힐 것으로 예상되는 것이다. 따라서 코드가 위에서 부터 아래로 내려오며 하나가 끝나면 다음 코드가 실행되는 방식을 동기적 처리라고 한다
비동기적 처리(Asynchronous)는 요청을 보낸 후 결과와는 상관없이 다음방식이 동작하는 방식이다. 결과가 주어지는데 시간이 걸리더라도 그 시간 동안 다른 작업을 할 수 있으므로 자원을 효율적으로 사용할 수 있다.