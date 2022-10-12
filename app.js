function Example() {
  const [count, setCount] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "You clicked ", count, " times"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCount(count + 1)
  }, "Click me"));
}

ReactDOM.render(React.createElement(Example), document.getElementById("app"));
