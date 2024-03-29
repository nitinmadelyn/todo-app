import { Component } from "react";
import Config from "../../Config/Config";
import { fetchRequest } from "../../Utilities/CommonFunctions";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.logErrorToMyService(error, errorInfo);
  }

  logErrorToMyService() {
    fetchRequest({ method: "POST", path: "log/", body: arguments }).then(
      (response) => {
        console.log("Error logged to server successfully!");
      }
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Oops! Something went wrong. Our talented team constantly looking to
          improve user experience.
        </h1>
      );
    }

    return this.props.children;
  }
}
