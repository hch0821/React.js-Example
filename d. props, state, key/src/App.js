import React, { Component } from 'react';
import './App.css';

class Subject extends Component {
  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

class TOC extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    );
  }
}

class Content extends Component{
  render(){
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

class App extends Component {
  render() {
    // 내가 만든 Subject 태그를 사용할 수 있다.
    // template literal 없이 태그를 사용할 수 있다.
    return (
      <div className="App">
        <Subject title="WEB" sub="world wide web"/>
        <Subject title="React" sub="For UI"/>
        <TOC/>
        <Content title="HTML" desc="HTML is HyperText markup Language"/>
      </div>
    );
  };
}

export default App;