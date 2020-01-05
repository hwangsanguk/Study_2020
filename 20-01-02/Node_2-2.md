# Front-End Javascript

## 2.2.1 AJAX
AJAX(Asynchronous Javascript And XML) 는 비동적 웹 서비스를 개발하기 위한 기법이다. 이름에 XML이 들어가 있지만 꼭 XML을 사용하는 것은 아니다. JSON을 많이 사용한다. AJAX는 페이지 이동 없이 서버에 요청을 보내고 응답을 받는 기술이다.
보통 AJAX 요청은 jQuery 나 axois 같은 라이브러리를 이용해 보낸다.

**예제 1**
~~~~~javascript
var xhr = new XMLHttpRequest(); //XMLHttpRequest 생성자로 xhr 객체를 생성
xhr.onreadystatechange = function(){ //요청에 대한 콜백
// onreadystatechange는 이벤트 리스너로 요청한 후 서버로부터 응답이 올 때 응답을 받을 수 있다.
    if(xhr.readyState === xhr.DONE) {//요청이 완료 되면
        if(xhr.status === 200 || xhr.status === 201){ //응답 코드가 200이나 201 이면 성공,
        console.log(xhr.responseText); // 서버에서 보내주는 값
        } else{
            console.error(xhr.responseText);
        }
    }
};
xhr.open('GET', 'https://www.zerocho.com/api/get'); //메서드와 주소 설정
//xhr.open 요청 메서드, 요청 주소를 넣고 
xhr.send(); // 요청 전송
//xhr.send 메서드로 보내면 된다.
~~~~~

**예제 2**
onreadystatechange 대신 onload 와 onerror 로 성공과 실패를 구별할 수 있다.
~~~~~javascript
var xhr = new XMLHttpRequest();
xhr.onload = function() {
    if(xhr.status === 200 || xhr.status === 201){
        console.log(xhr.responseText);
    }
};
xhr.onerror = function(){
    console.error(xhr.responseText);
};
xhr.open('GET', 'https://www.zerocho.com/api/get'); //메서드와 주소 설정
xhr.send(); //요청 전송
~~~~~
서버로 데이터를 같이 보내는 POST 요청의 경우이다. JSON 데이터를 보낸다.

**예제 3**
~~~~~javascript
var xhr =new XMLHttpRequest();
var data = {
    name: 'zerocho',
    birth : 1994,
};
xhr.onreadystatechange = function() {
    if(xhr.readyState === xhr.DONE) {
        if(xhr.status === 200 || xhr.status === 201){
            console.log(xhr.responseText);
        } else{
            console.error(xhr.responseText);
        }
    }
};
xhr.open('POST', 'https://www.zerocho.com/api/post/json');
xhr.setRequestHeader('Content-Type','application/json'); //콘텐츠 타입을 json으로
xhr.send(JSON.stringify(data)); //데이터를 동봉해 전송
~~~~~
전체적인 구조는 비슷한데 xhr.send 메서드에 데이터를 넣어 보내는 것이 다르다. xhr.setRequestHeader메서드로, 서버로 보내는 컨텐츠가 JSON 형식임을 알릴 수 있다. 현재 설정된 주소는 실제로 동작하는 주소라서 결괏값을 받을 수 있다. POST요청의 경우 에러가 발생하는데 이는 다음에 다뤄본다.