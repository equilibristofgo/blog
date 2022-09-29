function Example() {
    const [count, setCount] = React.useState(0);
  
    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
ReactDOM.render(React.createElement(Example), document.getElementById("app"));