# g. 리액트 리덕스

선행 공부해야할 목록은 다음과 같습니다.<br>
* [리덕스](https://github.com/hch0821/Redux-Example)

## 컴포넌트간 props와 state를 이용해 값을 전달하면
만약 컴포넌트간 Depth가 1억 개 이상이라면 props를 통해서 1억 번 전달해야한다. 이는 매우 불편하다.<br>
해결책: 모든 데이터를 중앙에서 관리하는 리덕스를 사용하자!

<img src="https://miro.medium.com/max/1000/1*zTXY3OfZm5nreThL4lnu4A.png" width="100%">

## store.js 모습
```javascript
import { createStore } from 'redux';
// Redux.createStore(reducer)의 구조와 똑같다.
// 인자: 이전의 state, dispatch를 통해 넘어온 action({type, payload}) 객체
export default createStore((state, action) => {
    if(!state){
        return {number: 0};
    }
    if(action.type === 'INCREMENT'){
        // ...: state를 immutable한 값으로 만들기 위해 복사한다.
        return {...state, number: state.number + action.size};
    }
    return state;
    },window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

## Redux와 React-redux
redux만으로 충분히 중앙 데이터 시스템을 구현할 수 있지만,<br>
react-redux를 이용해서 react와 더 친밀하고 사고를 적게 해주는 프로젝트를 개발할 수 있다.

## React-redux 설치
```
npm install react-redux
```

### React-Redux의 connect API

#### store를 Provider를 통해 모든 컴포넌트에서 사용할 수 있게 하기
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store'
// provider는 store를 provider의 모든 하위 컴포넌트에게 제공하는 역할을 한다.
// 즉 store를 import를 할 필요가 없게 한다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

#### connect 함수
connect는 리덕스와 컴포넌트를 연결해주는 함수다.<br>
연결이라는 말보다 컴포넌트를 감싼다는 표현이 정확하다.

#### connect 함수의 인자
##### mapReduxStateToReactProps
리덕스의 state와 리액트의 props를 연결시키는 함수이다.<br>
즉, 리덕스의 state가 액션의 dispatch 작업으로 인해 변경되었을 때,<br>
자동으로 연결된 컴포넌트의 props의 값을 변경시킨다.<br>


```javascript
// DisplayNumberContainer.js
import DisplayNumber from '../components/DisplayNumber';
import {connect} from 'react-redux';
function mapReduxStateToReactProps(state){
    return {
        number: state.number
    };
}
export default connect(mapReduxStateToReactProps)(DisplayNumber);
```

```javascript
// DisplayNumber.js
import React, { Component } from "react";
export default class DisplayNumber extends Component {
    //state가 변경될 때 자동 호출
    render() {
        return (
            <div>
                <h1>Display Number</h1>
                <input type="text" value={this.props.number} readOnly></input>
            </div>
        );
    }
}
```

##### mapReduxDispatchToReactProps
리덕스의 dispatch와 리액트의 props를 연결시키는 함수이다.<br>
즉, 리액트의 컴포넌트에서 이벤트가 발생하면(props에 있는 콜백함수 실행되면)<br>
리덕스의 dispatch가 실행되면 리덕스의 state가 변경된다.<br>
```javascript
//AddNumberContainer.js
import AddNumber from '../components/AddNumber'
import {connect} from 'react-redux'
function mapReduxDispatchToReactProps(dispatch)
{
    return {
        onClick:function(size){
            dispatch({type:'INCREMENT', size})
        }
    };
}
export default connect(null, mapReduxDispatchToReactProps)(AddNumber);
```

```javascript
// AddNumber.js
import React, { Component } from 'react';
export default class AddNumber extends Component {
    state = { size: 1 }
    render() {
        return (
            <div>
                <h1>Add Number</h1>
                <input type="button" value="+" onClick={() => {
                    this.props.onClick(this.state.size);
                }}></input>
                <input type="text" value={this.state.size} onChange={(e) => {
                    this.setState({ size: Number(e.target.value) });
                }}></input>
            </div>
        );
    }
}
```