import {
    SELECT_HOS
  } from './types'


  export const setPathName = (pathname) => {
      console.log(pathname)
    return {
      type: SELECT_HOS,
      pathname
    }
  }