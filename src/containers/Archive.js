import React from "react";
import ListArea from "../components/ListArea";
import Loader from "../components/Loader/Loader";
import axios from "axios";
export default class Archive extends React.Component {
  state = {
    listItems: [],
    shouldUpdateList: false,
    loading: true,
  };
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
  render() {
    let list;

    if (this.state.listItems.length) {
      list = (
        <ul>
          {this.state.listItems.map((item, index) => {
            if (item.data.archiveStatus) {
              return (
                <ListArea
                  key={index}
                  value={item.data.value}
                  checked={item.data.status}
                  onChange={() => this.handleInputCheckBox(index)}
                  onRemove={() => this.handleRemoveList(index)}
                  checkBox={false}
                ></ListArea>
              );
            }
          })}
        </ul>
      );
    }
    return (
      <React.Fragment>{this.state.loading ? <Loader /> : list}</React.Fragment>
    );
  }
}
