import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content" style={{marginLeft: '330px'}}>
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      )
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div className="item card mb-3" key={stream.id} style={{maxWidth: '540px', padding: '7px'}}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <i className="large icon camera" />
            </div>
            <div className="content col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  <Link to={`/streams/${stream.id}`} className="header">
                    {stream.title}
                  </Link>
                </h5>
                <p className="card-text">
                  {stream.description}
                </p>
              </div>
            </div>
            {this.renderAdmin(stream)}
          </div>
        </div>
      )
    })
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{ marginTop: '75px', marginLeft: '200px', marginRight: '200px' }}>
        <h2>streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
