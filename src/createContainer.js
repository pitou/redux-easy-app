import {connect} from 'react-redux';

export default function(component, actions, mapStateToProps) {

    return connect(mapStateToProps, actions)(component);
}
