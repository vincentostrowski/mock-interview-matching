import DropDown from "./DropDown";
import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

const FilterBar = () => {
  const { filters, setFilters } = useContext(FilterContext);
  const type = ["Non-Guided", "Guided"];
  const easeOptions = ["Easy", "Medium", "Hard"];
  const topic = [
    "Arrays & Hashing",
    "Two Pointers",
    "Sliding Window",
    "Stack",
    "Binary Search",
    "Linked List",
    "Trees",
    "Heap",
    "Backtracking",
    "Trie",
    "Graphs",
  ];

  const setTopic = (value) => {
    setFilters({ ...filters, topic: value });
  };

  const setType = (value) => {
    setFilters({ ...filters, type: value });
  };

  const setEase = (value) => {
    setFilters({ ...filters, ease: value });
  };

  return (
    <div className="flex justify-center gap-20">
      <DropDown options={type} setOption={setType} />
      <DropDown options={easeOptions} setOption={setEase} />
      <DropDown options={topic} setOption={setTopic} />
    </div>
  );
};

export default FilterBar;
