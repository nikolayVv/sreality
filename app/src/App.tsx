import Flats from './components/Flats/Flats'
import FlatsContextProvider from "./store/flats-context";
import Pagination from "./components/Pagination/Pagination";

const App = () => {
    return (
    <FlatsContextProvider>
        <Flats />
        <Pagination />
    </FlatsContextProvider>
    );
}

export default App;
