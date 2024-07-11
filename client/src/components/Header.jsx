import GDSC from "../assets/GDSC.png";

const Header = () => {
  return (
    <>
      <div className="flex justify-between p-5">
        <img src={GDSC} alt="GDSC Logo" className="w-8 h-8" />
        <div>
          <h1 className="ml-2 text-lg font-semibold">
            Mock Interview Matching
          </h1>
        </div>
        <button className="px-4 py-2 text-white bg-blue-500 rounded">
          Logout
        </button>
      </div>
    </>
  );
};

export default Header;
