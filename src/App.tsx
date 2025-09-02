import { Provider } from "react-redux";
import { MoviesList } from "./components/MovieList";
import { store } from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <MoviesList />
    </Provider>
  );
}
