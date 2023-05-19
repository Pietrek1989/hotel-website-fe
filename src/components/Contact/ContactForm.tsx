import { useState } from "react";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = {
        email: formValues.email,
        name: formValues.name,
        message: formValues.message,
        isTicket: isChecked,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/email/send-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-6">
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleInput7"
          placeholder="Name"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
        />
      </div>
      <div className="form-group mb-6">
        <input
          type="email"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleInput8"
          placeholder="Email address"
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
        />
      </div>
      <div className="form-group mb-6">
        <textarea
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="exampleFormControlTextarea13"
          rows={3}
          placeholder="Message"
          value={formValues.message}
          onChange={(e) =>
            setFormValues({ ...formValues, message: e.target.value })
          }
        ></textarea>
      </div>
      <div className="form-group form-check text-center mb-6">
        <input
          type="checkbox"
          className="form-check-input h-4 w-4 border rounded-sm bg-white checked:bg-currentDay focus:outline-none transition duration-200 mt-1 align-top bg-center bg-contain mr-2 cursor-pointer"
          id="exampleCheck87"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor="exampleCheck87"
        >
          Send me a copy of this message
        </label>
      </div>
      <button className="w-full px-6 py-2.5 bg-blue-600 text-black bg-logo font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Send
      </button>
    </form>
  );
};

export default ContactForm;
