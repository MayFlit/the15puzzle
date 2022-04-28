import { store } from '../../redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "../Game/Game";





function App() {
  return (
          <Provider store={store}>
              <BrowserRouter>
                  {/*<Nav />*/}

                  <Routes>
                      <Route path="/" element={<Game />} />
                      {/*<Route path="/users" element={<UserList />} />*/}
                      {/*<Route path="/students" element={<StudentList />} />*/}
                      {/*<Route path="/students/:id" element={<CurrentStudentCard />} />*/}
                      {/*<Route path="*" element={<Error404 />} />*/}
                  </Routes>

              </BrowserRouter>
          </Provider>
  );
}

export default App;