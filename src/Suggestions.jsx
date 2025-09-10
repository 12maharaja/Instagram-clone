import axios from "axios";
import React, { useEffect, useState } from "react";

function Suggestions() {
  const [profile, setprofile] = useState(null);
  const [suggestions, setsuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/profile")
      .then((data) => data.json())
      .then((data) => setprofile(data))
      .catch((err) => console.log(err));

    fetch("http://localhost:3000/suggestion")
      .then((data) => data.json())
      .then((data) => setsuggestions(data))
      .catch((err) => console.log(err));
  }, []);

  const handleFollw =async(id, username)=>{
    axios.post('http://localhost:3000/followers',{"id":id,"username":username})
    .catch(err => console.log(err))
  }

  return (
    <div>
      <div className="suggestion m-4">
        {profile ? (
          <div className="d-flex">
            <img
              className="dp rounded-circle"
              src={profile.profile_pic}
              alt="Profile Pic"
            />
            <h5>{profile.username}</h5>
            <small className="ms-auto text-primary">Switch</small>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}

        <div className="d-flex mt-3">
          <p>Suggested for you</p>
          <b className="ms-auto">See All</b>
        </div>

        {suggestions.length > 0 ? (
          <div>
            {suggestions.map((suggestion) => (
              <div className="my-1" key={suggestion.id}>
                <div className="d-flex">
                  <img
                    className="dp rounded-circle"
                    src={suggestion.profile_pic}
                    alt="Profile Pic"
                  />
                  <h5>{suggestion.username}</h5>
                  <a className="text-primary ms-auto text-decoration-none" onClick={()=>{handleFollw(suggestion.id,suggestion.username)}}>Follow</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading suggestions...</p>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
