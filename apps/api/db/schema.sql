CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE artists (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE albums (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   artist_id INT NOT NULL REFERENCES artists(id),
    title VARCHAR(255) NOT NULL,
    release_date DATE,
   cover_image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE tracks(
   id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   album_id INT NOT NULL REFERENCES albums(id),
   title VARCHAR(255) NOT NULL,
   duration INT NOT NULL,
   track_number INT NOT NULL,
   created_at TIMESTAMP DEFAULT current_timestamp,
   updated_at TIMESTAMP DEFAULT current_timestamp,
   audio_url VARCHAR(255) NOT NULL
   );


   CREATE table playlists(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    name  VARCHAR(255) NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    created_at TIMESTAMP DEFAULT current_timestamp

   );

   CREATE TABLE playlist_tracks (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    playlist_id INT NOT NULL REFERENCES playlists(id),
    track_id INT NOT NULL REFERENCES tracks(id),
    position INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (playlist_id, track_id)
);