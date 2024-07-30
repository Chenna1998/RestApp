import Navbar from "./components/navbar";
import '../hr/hr.css';
import HRStat from "./components/hrstat";
import ItemForm from "./components/itemForm";

function HR() {
    return (
        <div className="hr-container">
            <Navbar />
            <div className="hr-content">
                <HRStat />
                <ItemForm />
            </div>
        </div>
    );
}

export default HR;
