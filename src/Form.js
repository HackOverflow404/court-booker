import "./Form.css";
import { useState } from "react";

function Form(props) {
  const [price, setPrice] = useState(0);

  function handleGuestChange(event) {
    const guest = event.target.value;
    setPrice(guest * props.price);

    const updatedFormInput = Object.assign({}, props.formInput, {
      guest: guest,
    });

    console.log(guest);

    handleFormChange(event);
  }

  function handleFormChange(event) {
    const idName = event.target.id;

    const updatedFormInput = Object.assign({}, props.formInput, {
      [idName]: event.target.value,
    });

    console.log(updatedFormInput);

    props.onChange(updatedFormInput);
  }

  return (
    <div className="form-panel">
      <form onSubmit={props.handleSubmit}>
        <label className="form-label" id="fname-label" for="firstName">
          First Name:
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleFormChange}
          required
        />

        <label className="form-label" id="lname-label" for="lastName">
          Last Name:
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleFormChange}
          required
        />
        <label className="form-label" id="hnum-label" for="houseNumber">
          House No.:
        </label>
        <input
          type="text"
          id="houseNumber"
          name="houseNumber"
          pattern="[A-Z]-[0-9]{3,4}"
          onChange={handleFormChange}
          required
        />

        <label className="form-label" id="pnum-label" for="phoneNumber">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          pattern="[0-9]{10}"
          onChange={handleFormChange}
          required
        />

        <label className="form-label" id="email-label" for="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleFormChange}
          required
        />

        <label className="form-label" id="guest-label" for="guest">
          Number of Guests:
        </label>
        <input
          type="number"
          id="guest"
          name="guest"
          min="0"
          defaultValue="0"
          onChange={handleGuestChange}
        />

        <label className="form-label" id="price-label">
          &#8377;{price}
        </label>

        <input type="submit" value="Make Booking" />
      </form>
    </div>
  );
}

export default Form;
