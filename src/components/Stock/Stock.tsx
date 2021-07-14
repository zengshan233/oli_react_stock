import { Charts } from "../Charts/Charts";
import Info from "../Info/Info";
import Search from "../Search/Search";

function Stock() {
    return (
        <div className="App">
            <Search />
            <Charts />
            <Info />
        </div>
    );
}

export default Stock;
