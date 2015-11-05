import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export default function(component, actions, mapStateToProps) {

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(actions, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(component);
}
