import React from "react";
import InputArea from "./components/InputArea";
import ListArea from "./components/ListArea";
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [{ value: "", status: false }],
      emptyInput: "",
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleInputEnter = this.handleInputEnter.bind(this);
  }
  handleInputEnter(event) {
    if (event.key === "Enter" && event.target.value !== "") {
      const listItems = [...this.state.listItems];
      listItems.push({ value: event.target.value, status: false });
      this.setState({
        listItems,
        emptyInput: "",
      });
    }
    return null;
  }
  handleInputOnChange(event) {
    this.setState({
      emptyInput: event.target.value,
    });
  }

  handleInputCheckBox(index) {
    const listItems = [...this.state.listItems];
    listItems[index].status = !listItems[index].status;
    this.setState({
      listItems,
    });
  }

  handleRemoveList(index) {
    const listItems = [...this.state.listItems];
    listItems.splice(index, 1);
    this.setState({
      listItems,
    });
  }
  componentDidMount() {
    if (
      this.state.listItems.length === 1 &&
      this.state.listItems[0].value === ""
    ) {
      const listItems = [...this.state.listItems];
      listItems.splice(0, 1);
      this.setState({
        listItems,
      });
    }
  }
  render() {
    let list = (
      <ul>
        {this.state.listItems.map((item, index) => {
          return (
            <ListArea
              key={index}
              value={item.value}
              checked={item.status}
              onChange={() => this.handleInputCheckBox(index)}
              onRemove={() => this.handleRemoveList(index)}
            />
          );
        })}
      </ul>
    );

    return (
      <React.Fragment>
        <InputArea
          value={this.state.emptyInput}
          onEnter={this.handleInputEnter}
          onChange={this.handleInputOnChange}
        />
        {list}
      </React.Fragment>
    );
  }
}
