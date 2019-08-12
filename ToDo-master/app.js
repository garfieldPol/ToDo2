const List = props => (
  <ul>
    {props.items.map((item, index) => (
      <>
        <li
          onClick={props.click}
          className={props.changed}
          index={index}
          key={index}
        >
          {item} {""}
        </li>
      </>
    ))}
  </ul>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      items: [],
      isDone: false,
      index: this.props.key
    };
  }

  handleClicked = e => {
    this.setState({ isDone: !this.state.isDone });
  };

  handleFormText = e => {
    const text = e.target.value;
    const currentText = text;
    this.setState({
      text: currentText
    });
  };

  handleFormAdd = e => {
    e.preventDefault();
    this.setState({
      text: "",
      items: [...this.state.items, this.state.text]
    });
  };

  componentDidMount() {
    localStorage.getItem("tasks") &&
      this.setState({
        items: JSON.parse(localStorage.getItem("tasks")),
        isLoading: false
      });
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("tasks", JSON.stringify(nextState.items));
    localStorage.setItem("tasksData", Date.now());
  }

  render() {
    return (
      <>
        <form className="main">
          <label>
            <h1>To Do List</h1>
            <input
              onSubmit={this.handleFormAdd}
              type="text"
              value={this.state.text}
              onChange={this.handleFormText}
              name="name"
            />
          </label>
          <button onClick={this.handleFormAdd}>Add</button>
          <List
            items={this.state.items}
            click={this.handleClicked}
            changed={this.state.isDone ? "done" : "notDone"}
            key={this.props.index}
          />
        </form>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
