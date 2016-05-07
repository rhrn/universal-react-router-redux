import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import React from 'react'

import Story from './Story'

import { fetchTopStoriesAsync } from '../actions/HackerNews'

const TopStories = React.createClass({

  componentDidMount: function() {
    this.props.dispatch(fetchTopStoriesAsync())
  },

  render: function() {

    let loading = '';

    if (this.props.stories.loading) {
      loading = 'loading...'
    }

    return (
      <div>
        <Helmet title="Top Stories" />
        <h1>Top Stories</h1>
        <div>{ loading }</div>
        <div>
          { this.props.stories.data.map((story, index) => <Story key={index} {...story} />) }
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {
    stories: state.topStories
  }
}

export default connect(mapStateToProps)(TopStories)
