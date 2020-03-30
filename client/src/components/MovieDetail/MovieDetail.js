import React, { useEffect, useState } from "react";
import MainImage from "../LandingPage/Sections/MainImage";
import GridCard from "../LandingPage/Sections/GridCard";
import { Descriptions, Button } from "antd";

import { API_URL, API_KEY, IMAGE_BASE_URL } from "../Calls";
import Favorite from "./Sections/Favorite";

const MovieDetail = props => {
  const movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        setMovie(response);

        fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            setCasts(response.cast);
          });
      });
  }, []);

  const handleClick = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {Movie && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path &&
            Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Favorite
            userFrom={localStorage.getItem("token")}
            movieId={movieId}
            movieInfo={Movie}
          />
        </div>
        
        {/* movie info table */}
        <Descriptions title="Movie Info" bordered>
          <Descriptions.Item label="Title">
            {Movie.original_title}
          </Descriptions.Item>

          <Descriptions.Item label="release_date">
            {Movie.release_date}
          </Descriptions.Item>

          <Descriptions.Item label="vote_average" span={2}>
            {Movie.vote_average}
          </Descriptions.Item>

          <Descriptions.Item label="revenue">{Movie.revenue}</Descriptions.Item>

          <Descriptions.Item label="runtime">{Movie.runtime}</Descriptions.Item>

          <Descriptions.Item label="vote_count">
            {Movie.vote_count}
          </Descriptions.Item>

          <Descriptions.Item label="status">{Movie.status}</Descriptions.Item>

          <Descriptions.Item label="popularity">
            {Movie.popularity}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClick}>Toggle Actor View</Button>
        </div>

        {/* Crew grid */}

        {ActorToggle && (
          <div className="container">
            <div className="row">
              <div
                className=""
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr",
                  gridGap: "1rem"
                }}
              >
                {Casts &&
                  Casts.map((cast, index) => (
                    <React.Fragment key={index}>
                      {cast.profile_path && (
                        <GridCard
                          actor
                          image={`${IMAGE_BASE_URL}w500${cast.profile_path}`}
                        />
                      )}
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MovieDetail;
