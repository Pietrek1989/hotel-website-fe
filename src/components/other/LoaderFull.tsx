import "../../styles/loader.css";

const LoaderFull = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 h-screen w-screen flex-col flex items-center justify-center">
      <div className="loader "></div>
      <p className="mt-10">LOADING...</p>
    </div>
  );
};

export default LoaderFull;
