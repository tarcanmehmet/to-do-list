import React from "react";
import InputArea from "../components/InputArea";
import ListArea from "../components/ListArea";
import Loader from "../components/Loader/Loader";
import axios from "axios";
export default class AddingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      emptyInput: "",
      shouldUpdateList: false,
      loading: true,
    };
  }
  handleInputEnter = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      this.setState({
        loading: true,
      });
      let listedItem = {
        value: event.target.value,
        status: false,
        archiveStatus: false,
      };
      axios
        .post("/lists.json", listedItem)
        .then((response) =>
          this.setState({
            emptyInput: "",
            shouldUpdateList: true,
            loading: false,
          })
        )
        .catch((err) => console.log(err));
    }
    return null;
  };
  handleInputOnChange = (event) => {
    this.setState({
      emptyInput: event.target.value,
    });
  };

  handleInputCheckBox(index) {
    this.setState({
      loading: true,
    });
    axios
      .put(
        `/lists/${this.state.listItems[index].fireBaseKey}/status.json`,
        !this.state.listItems[index].data.status
      )
      .then((response) => {
        this.setState({
          shouldUpdateList: true,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  handleAddingToArchive(index) {
    this.setState({
      loading: true,
    });
    axios
      .put(
        `/lists/${this.state.listItems[index].fireBaseKey}/archiveStatus.json`,
        true
      )
      .then((response) => {
        this.setState({
          shouldUpdateList: true,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  handleRemoveList(index) {
    this.setState({
      loading: true,
    });
    axios
      .delete(
        `/lists/${this.state.listItems[index].fireBaseKey}.json`,
        !this.state.listItems[index].data.status
      )
      .then((response) => {
        this.setState({ shouldUpdateList: true, loading: false });
      })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    this.getListFromServer();
  }

  componentDidUpdate() {
    if (this.state.shouldUpdateList) {
      this.getListFromServer();
    }
  }

  getListFromServer() {
    axios
      .get("/lists.json")
      .then((response) => {
        const listItems = [];
        for (var fireBaseKey in response.data) {
          listItems.push({
            fireBaseKey,
            data: response.data[fireBaseKey],
          });
        }
        this.setState({
          listItems: listItems,
          shouldUpdateList: false,
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let list;

    if (this.state.listItems.length) {
      list = (
        <ul>
          {this.state.listItems.map((item, index) => {
            if (!item.data.archiveStatus) {
              return (
                <ListArea
                  key={index}
                  value={item.data.value}
                  checked={item.data.status}
                  onChange={() => this.handleInputCheckBox(index)}
                  onRemove={() => this.handleAddingToArchive(index)}
                  checkBox={true}
                ></ListArea>
              );
            }
          })}
        </ul>
      );
    }
    return (
      <React.Fragment>
        <InputArea
          value={this.state.emptyInput}
          onEnter={this.handleInputEnter}
          onChange={this.handleInputOnChange}
        />
        {this.state.loading ? <Loader /> : list}
      </React.Fragment>
    );
  }
}
