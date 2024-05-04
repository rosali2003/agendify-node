// import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { useEffect, useRef, useState, createContext, useContext, useCallback } from 'react'

// // Ensures cookie is sent
// axios.defaults.withCredentials = true

// const serverUrl = process.env.REACT_APP_SERVER_URL

// const AuthContext = createContext()

// const AuthContextProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(null)
//   const [user, setUser] = useState(null)

//   const checkLoginState = useCallback(async () => {
//     try {
//       const {
//         data: { loggedIn: logged_in, user },
//       } = await axios.get(`${serverUrl}/auth/logged_in`)
//       setLoggedIn(logged_in)
//       user && setUser(user)
//     } catch (err) {
//       console.error(err)
//     }
//   }, [])

//   useEffect(() => {
//     checkLoginState()
//   }, [checkLoginState])

//   return <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>{children}</AuthContext.Provider>
// }

// const Dashboard = () => {
//     const { user, loggedIn, checkLoginState } = useContext(AuthContext)
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//       ;(async () => {
//         if (loggedIn === true) {
//           try {
//             // Get posts from server
//             const {
//               data: { posts },
//             } = await axios.get(`${serverUrl}/user/posts`)
//             setPosts(posts)
//           } catch (err) {
//             console.error(err)
//           }
//         }
//       })()
//     }, [loggedIn])
  
//     const handleLogout = async () => {
//       try {
//         await axios.post(`${serverUrl}/auth/logout`)
//         // Check login state again
//         checkLoginState()
//       } catch (err) {
//         console.error(err)
//       }
//     }
  
//     return (
//       <>
//         <h3>Dashboard</h3>
//         <button className="btn" onClick={handleLogout}>
//           Logout
//         </button>
//         <h4>{user?.name}</h4>
//         <br />
//         <p>{user?.email}</p>
//         <br />
//         <img src={user?.picture} alt={user?.name} />
//         <br />
//         <div>
//           {posts.map((post, idx) => (
//             <div>
//               <h5>{post?.title}</h5>
//               <p>{post?.body}</p>
//             </div>
//           ))}
//         </div>
//       </>
//     )
//   }

export const oauthButton = () => {
    
}