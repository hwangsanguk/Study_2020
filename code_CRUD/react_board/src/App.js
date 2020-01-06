import React, { Component } from 'react';

class App extends Component {
  state = { //변수를 선언
    boards: [ //Json 형식으로 가져옴
      {
        brdno:1,
        brdwriter: 'Sang Wook',
        brdtitle: 'React study',
        brddate: new Date()
      },
      {
        brdno:2,
        brdwriter: 'Sang hoon',
        brdtitle: 'Date..',
        brddate: new Date()
      },
    ]
  }
  render(){ //state를 여기서 출력, React에서 화면을 생성하기 위해 실행하는 이벤트
    console.log(this.state); //boards: 배열(2), 0 =>no 1 내용, 1=> no 2 내용이 들어있음
    const { boards } = this.state; //state를 render()에서 사용하기 위해 this.state로 지정
    // this는 자기 자신(component)를 의미
    const list = boards.map(function(row){ //가지고 온 데이터를 map 함수를 통해 2개 행의 글번호와 작성자를 묶어서 하나의 문자열로 작성
      return row.brdno + row.brdwriter
    });
    return(
      <div>
        {list} {/* 위에서의 list를 여기서 출력*/}
      </div>
    )
  }
}


// 위의 형식을 아래의 App2와 같은 형식으로도 적을 수 있음

//App2는 보드 형식으로 저장하는 법
class App2 extends Component{
  state = { //변수를 선언
    maxNo: 3,
    boards: [ //Json 형식으로 가져옴
      {
        brdno:1,
        brdwriter: 'Sang Wook',
        brdtitle: 'React study',
        brddate: new Date()
      },
      {
        brdno:2,
        brdwriter: 'Sang hoon',
        brdtitle: 'Date..',
        brddate: new Date()
      },
    ]
  }
  handleSaveData = (data) =>{
    this.setState({
      maxNo:this.state.maxNo+1,
      boards: this.state.boards.concat({brdno: this.state.maxNo++, brddate: new Date(), ...data})
    });
  }
  render(){
    const { boards} = this.state;
    return (
      <div>
        <BoardForm onSaveData = {this.handleSaveData} />
        <table border="1">
          <tbody>
            <tr align='center'>
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {
              boards.map(row => (<BoardItem key={row.brdno} row={row} />))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
class BoardForm extends Component{
  state = {}
  handleChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) =>{
    console.log(e)
    e.preventDefault();
    this.props.onSaveData(this.state);
    this.setState({});
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input placeholder='title' name='brdtitle' onChange={this.handleChange} />
        <input placeholder='name' name='brdwriter' onChange={this.handleChange} />
        <button type='submit'>Save</button>
      </form>
    )
  }
}
class BoardItem extends Component{
  render(){
    return (
      <tr>
        <td>{this.props.row.brdno}</td>
        <td>{this.props.row.brdtitle}</td>
        <td>{this.props.row.brdwriter}</td>
        <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
      </tr>
    )
  }
}
// https://forest71.tistory.com/187 값 입력받아 저장하기/글쓰기 기능 구현 설명 읽기
export default App2;