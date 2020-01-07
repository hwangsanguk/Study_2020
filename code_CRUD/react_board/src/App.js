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
// App2를 기본으로 여기에 코드를 추가할 것임
//App2는 보드 형식으로 저장하는 법
class App2 extends Component{
  constructor(props){
    super(props);
    this.child = React.createRef();
  }
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
    console.log('이것은 데이타..',data.brdno)
    let boards = this.state.boards;
    if(data.brdno === null || data.brdno ==='' || data.brdno === undefined){
      this.setState({ //maxNo+1 이 된후 작동 이상, 고치기
        maxNo:this.state.maxNo+1,
        boards: boards.concat({brdno: this.state.maxNo, brddate: new Date(), ...data})
      });
      console.log("맥스넘버",this.state.maxNo)
    } else{
      this.setState({
        boards: boards.map(row => data.brdno === row.brdno ? {...data}: row)
      })
    }
    }
    
  handleRemove = (brdno) =>{ //데이터 삭제 기능
    this.setState({
      boards: this.state.boards.filter(row => row.brdno !== brdno)
    })
  }
  handleSelectRow = (row) =>{
    this.child.current.handleSelectRow(row);
  }
  render(){
    const { boards } = this.state;
    return (
      <div>
        <BoardForm onSaveData = {this.handleSaveData}  ref={this.child} />
        <table border="1">
          <tbody>
            <tr align='center'>
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {
              boards.map(row =>
                (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

class BoardItem extends React.Component{
  handleRemove = () =>{
    const { row, onRemove } =this.props;
    onRemove(row.brdno);
  }
  handleSelectRow = () =>{
    const { row,onSelectRow } = this.props;
    onSelectRow(row);
  }
  render(){
    console.log(this.props.row.brdno);
    return (
      <tr>
        <td>{this.props.row.brdno}</td>
        <td><a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a></td>
        <td>{this.props.row.brdtitle}</td>
        <td>{this.props.row.brdwriter}</td>
        <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
        <td><button onClick={this.handleRemove}>x</button></td>
      </tr>
    )
  }
}

class BoardForm extends Component{
  state = {
    brdwriter:'',
    brdtitle:'',
  }
  handleChange = (e) =>{
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
    console.log(this.state)
  }

  handleSelectRow =(row) =>{
    this.setState(row);
  }

  handleSubmit = (e) =>{
    console.log(e)
    e.preventDefault(); // 실제로 서버로 보내는 것이 아니기 때문에 preventDefault를 사용하여 전파되는 것을 방지
    this.props.onSaveData(this.state); //onSaveData함수를 호출하여 데이터 저장
   //onSaveData()는 App컴포넌트에서  받아오기에 this.props.onSaveData()로 사용
   //onSavedata()는 부모로 부터 파라미터(this.props로 받음
   //저장할 값이 state에 있으므로 this.state로 넘겨줌 
    this.setState({
      brdno:'',
      brdwriter:'',
      brdtitle:'',
    });
  }
  
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input placeholder='title' name='brdtitle' value={this.state.brdtitle} onChange={this.handleChange} />
        <input placeholder='name' name='brdwriter' value={this.state.brdwriter} onChange={this.handleChange} />
        <button type='submit'>Save</button>
      </form>
    )
  }
}

export default App2;