import TMACC from "../assets/Tmacc.png";

const Header = () => {
  return (
    <>
      <div className="flex justify-between p-5">
        <img src={TMACC} alt="TMACC Logo" className="w-12 h-12" />
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
