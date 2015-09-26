import React from "react-native";
import SearchBar from "./searchbar";
import MyLocalitiesController from "./my-localities-controller";

const {
    StyleSheet,
    View
} = React;

const styles = StyleSheet.create({
    scene: { flex: 1 }
});

export default class FilteredLocalities extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fliter: ""
        };
    }

    _onSearchChange(filter) {
        this.setState({ filter });
    }

    render() {
        return (
            <View {...this.props}>
                <SearchBar
                    autoFocus={false}
                    onSearchChange={this._onSearchChange.bind(this)}
                    placeholder="Search for places..."
                />
                <MyLocalitiesController
                    filter={this.state.filter}
                    style={styles.scene}
                    navigator={this.props.navigator}
                />
            </View>
        );
    }
}

FilteredLocalities.propTypes = {
    filter: React.PropTypes.func,
    navigator: React.PropTypes.object.isRequired
};
