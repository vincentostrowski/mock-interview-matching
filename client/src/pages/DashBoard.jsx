import Calendar from "../components/Calendar/Calendar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterBar from "../components/Filters/FilterBar";
import { FilterProvider } from "../context/FilterContext";

const Dashboard = () => {
  return (
    <FilterProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <FilterBar />
          <Calendar />
        </div>
        <Footer />
      </div>
    </FilterProvider>
  );
};

export default Dashboard;
