import error404 from "../../assets/error404.gif"
const NotFound = () => {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-center text-4xl md:text-6xl">Error 404 - PAGE NOT FOUND</h1>
      <img
        src={error404}
        alt="Error 404"
        className="mt-8 md:mt-16 w-96 md:w-2/4"
      />
    </div>
  );
};

export default NotFound;