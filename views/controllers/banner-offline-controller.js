import React from "react-native";
import BannerOffline from "../components/banner-offline";
import controller from "./controller";

const {
	InteractionManager
} = React;

@controller
export default class BannerOfflineController extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			connectionStatus: null
		};
	}

	componentWillMount() {
		this._updateData();

		this.handle("statechange", changes => {
			if (changes.app && changes.app.connectionStatus) {
				this._updateData();
			}
		});
	}

	_updateData() {
		InteractionManager.runAfterInteractions(() => {
			this.setState({
				connectionStatus: this.store.get("app", "connectionStatus")
			});
		});
	}

	render() {
		return (
			<BannerOffline {...this.props} {...this.state} />
		);
	}
}
