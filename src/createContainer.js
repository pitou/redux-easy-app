import { connect } from 'react-redux'

export default (component, actions, mapStateToProps) =>
  connect(mapStateToProps, actions)(component)
