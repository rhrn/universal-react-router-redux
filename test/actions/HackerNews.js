'use strict'

require('babel-core/register')({
  only: '/src/'
})

const expect = require('chai').expect

const HackerNewsActions = require('../../src/actions/HackerNews')

const fetchTopStoriesSubscribe = HackerNewsActions.fetchTopStoriesAsync()

const expectedActions = [

  action => {
    expect(action.type).to.be.equal('FETCH_TOP_STORIES')
  },

  action => {
    expect(action.type).to.be.equal('FETCH_TOP_STORIES_SUCCESS')

    expect(action.data).to.be.instanceOf(Array)
      .and.have.length.above(10)

    expect(action.data[0]).to.contain.all.keys(['by', 'descendants', 'id', 'kids', 'score', 'time', 'title', 'url'])
  }

]

let fetchTopStoriesSubscribeIndex = 0

fetchTopStoriesSubscribe(action => {

  expectedActions[fetchTopStoriesSubscribeIndex](action)

  fetchTopStoriesSubscribeIndex++

})
