/* eslint-disable react/prop-types */

const Error = ({ message }) => {

  return (
      <>
        <div className="text-center text-red-500 bg-red-200 p-2 rounded-md hover:bg-red-300 duration-300">{message || "Something Error "}</div>
      </>
    );
};

export default Error;