import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../../../redux/actions/counter";
import {
  clearResources,
  getAllResources,
} from "../../../redux/actions/resources";
import { getAllPokemons } from "../../../redux/actions/pokemons";

const Login = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const count = useSelector((state) => state.counterReducer.count);
  const resources = useSelector((state) => state.resourcesReducer.resources);
  const pokemons = useSelector((state) => state.pokemonReducer.pokemon);

  console.log(pokemons, "pokemons");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await axios.post('http://localhost:5000/login', form);
    //   const { token, user } = res.data;

    //   // Store token (for example, in localStorage)
    //   localStorage.setItem('token', token);
    //   setMessage(`Welcome, ${user.name}! You're logged in.`);
    //   navigate('/profile');
    // } catch (err) {
    //   setMessage(err.response?.data?.message || 'Login failed');
    // }
    try {
      dispatch(login(form));
      navigate("/profile");
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

  return (
    <div className="signup-container">
      {/* <h2>Login</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
      <p>{failureMessage}</p> */}

      {/* <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <p>{count}</p> */}

      {/* <button onClick={() => dispatch(getAllResources())}>
          fetch all resources
        </button>

        <button onClick={() => dispatch(clearResources())}>
          Clear resources
        </button>

        {resources &&
          resources.map((resource) => (
            <div key={resource.id}>
              <h3>{resource.title}</h3>
            </div>
          ))} */}
      <button onClick={() => dispatch(getAllPokemons())}>
        fetch all pokemons
      </button>

      {/* <button onClick={() => dispatch(clearResources())}>
        Clear resources
      </button> */}

      {/* {pokemons &&
        pokemons.map((pokemon) => (
          <div key={pokemon.id}>
            <h3>{pokemon.name}</h3>
          </div>
        ))} */}
    </div>
  );
};

export default Login;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllResources,
//   updateResource,
// } from "../../../redux/actions/resources";

// const Login = () => {
//   const dispatch = useDispatch();

//   const [isEditable, setIsEditable] = useState({
//     id: null,
//     title: "",
//   });

//   const resources = useSelector((state) => state.resourcesReducer.resources);

//   const handleUpdate = (id) => {
//     const payload = {
//       id,
//       title: isEditable.title,
//     };
//     dispatch(updateResource(payload));
//     setIsEditable({ id: null, title: "" });
//   };

//   const handleChange = (e, id) => {
//     setIsEditable({ id, title: e.target.value });
//   };
//   console.log(resources, "resources");

//   useEffect(() => {
//     dispatch(getAllResources());
//   }, []);

//   return (
//     <div>
//       {resources.map((resource) => (
//         <>
//           <input
//             key={resource.id}
//             // readOnly={isEditable.id === resource.id ? false : true}
//             value={
//               isEditable.id === resource.id ? isEditable.title : resource.title
//             }
//             onChange={(e) => handleChange(e, resource.id)}
//           />
//           <button
//             onClick={() => handleUpdate(resource.id)}
//             disabled={isEditable.id === resource.id ? false : true}
//           >
//             Update
//           </button>
//         </>
//       ))}
//     </div>
//   );
// };

// export default Login;
