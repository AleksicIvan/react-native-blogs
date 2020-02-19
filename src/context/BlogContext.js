import React, { useState, useReducer } from 'react'

import createDataContext from './createDataContext'


const blogReducer = (state, action) => {
  switch (action.type) {
    case 'add_blogpost':
      return [
        ...state,
        { id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content}
      ]
    case 'delete_blogpost':
      return state.filter(b => b.id !== action.payload)
    case 'edit_blogpost':
      const foundBlog = state.find(b => b.id === action.payload.id)
      foundBlog.title = action.payload.title
      foundBlog.content = action.payload.content

      return [
        ...state.filter(b => b.id !== action.payload.id),
        foundBlog
      ]
    default:
      return state
  }
}

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({
      type: "add_blogpost",
      payload: {
        title,
        content
      }
    })
    if (callback) {
      callback()
    }
  }
}

const deleteBlogPost = (dispatch) => {
  return (id) => dispatch({ type: "delete_blogpost", payload: id  })
}

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ type: "edit_blogpost", payload: {
      id,
      title,
      content
    }})
    if (callback) {
      callback()
    }
  }
}

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{title: "TEST POST", content: "content bed", id: 1}]
)

