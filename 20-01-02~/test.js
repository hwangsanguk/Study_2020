// 코드 TEST JS파일
// var relationship1 = {
//     name: 'zero',
//     friends : ['nero','hero','xero'],
//     logFriends : function() {
//         var that = this; //relationship1 을 가르키는 this 를 that에 저장
//         this.friends.forEach(function(friend){
//             console.log(that.name,friend); //this의 내용을 var을 통해 that에 저장하였기에 that의 저장 내용을 받아 올 수 있음
//         });
//     },
// };
// relationship1.logFriends();

const relationship2 = {
    name: 'zero',
    friends : ['nero','hero','xero'],
    logfriends(){
        this.friends.forEach(friend =>{
            console.log(this.name, friend);
        })
    }
}
relationship2.logfriends()