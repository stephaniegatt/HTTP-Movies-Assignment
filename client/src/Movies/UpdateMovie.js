import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
    title: "", 
    director: "",
    metascore: "",
    stars: "",
};

const UpdateMovie = () => {
  const location = useLocation();
  const params = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialItem);


  useEffect(() => {
    if (location.state) {
      setMovie(location.state);
    } else {
      axios
        .get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => {
            console.log("data", res.data) 
            setMovie(res.data)
        })
        .catch(err => console.log(err));
    }
  }, []);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(() => {
        push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Score"
          value={movie.metascore}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
