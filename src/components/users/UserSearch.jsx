import { useState, useContext } from 'react'
import GithubContext from '../../context/github/GithubContext'
import AlertContext from '../../context/alert/AlertContext'
import { searchUsers } from '../../context/github/GithubActions'

function UserSearch() {

  // conventionally, 
  const [text, setText] = useState('')

  const { users, dispatch } = useContext(GithubContext)
  const { dispatch: alertDispatch } = useContext(AlertContext)

  const handleChange = (e) => setText(e.target.value)

  // Set an alert
  const setAlert = (msg, ErrorType) => {
    alertDispatch({
      type: 'SET_ALERT',
      payload: { msg, ErrorType },
    })
    // remove alert in 3s
    setTimeout(() => alertDispatch({ type: 'REMOVE_ALERT' }), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'error')
    } else {
      dispatch({ type: 'SET_LOADING' })// set loading to true
      const users = await searchUsers(text)
      if (users.length === 0) {
        setAlert(`Cannot find user '${text}'`,'error')
        dispatch({type:'RESET_LOADING'})
      } else {
        dispatch({ type: 'GET_USERS', payload: users })
        setText('')
      }
    }
  }

  const clearUsers = () => (
    dispatch({ type: 'CLEAR_USERS' })
  )

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* use conditon to show clear button */}
      {users.length > 0 && (
        <div>
          <button
            onClick={clearUsers}
            className='btn btn-ghost btn-lg'
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
