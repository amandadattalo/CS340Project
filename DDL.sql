SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- ################
-- Drop Tables
-- ################
DROP TABLE IF EXISTS Genre;
DROP TABLE IF EXISTS Series;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Authors;
DROP TABLE IF EXISTS Books_Authors;
DROP TABLE IF EXISTS Series_Authors;

-- ################
-- Create Tables
-- ################

-- Create Genre Table
CREATE TABLE Genre (
    genre_id int UNIQUE NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (genre_id)
);

-- Create Series Table
CREATE TABLE Series (
    series_id int UNIQUE NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    genre_id int NOT NULL,
    series_length int NOT NULL,
    PRIMARY KEY (series_id),
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);

-- Create Books Table
CREATE TABLE Books (
    book_id int UNIQUE NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    in_series bool NOT NULL,
    series_id int,
    genre_id int NOT NULL,
    PRIMARY KEY (book_id),
    FOREIGN KEY (series_id) REFERENCES Series(series_id) ON DELETE SET NULL,
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);

-- Create Authors Table
CREATE TABLE Authors (
    author_id int UNIQUE NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    PRIMARY KEY (author_id)
);

-- Create Books_Authors Table
CREATE TABLE Books_Authors (
    book_author_id int UNIQUE NOT NULL AUTO_INCREMENT,
    book_id int NOT NULL,
    author_id int NOT NULL,
    PRIMARY KEY (book_author_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE
);

-- Create Series_Authors Table
CREATE TABLE Series_Authors (
    series_author_id int UNIQUE NOT NULL AUTO_INCREMENT,
    series_id int NOT NULL,
    author_id int NOT NULL,
    PRIMARY KEY (series_author_id),
    FOREIGN KEY (series_id) REFERENCES Series(series_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE
);


-- ################
-- Insert Data
-- ################

-- Insert Genre Data
INSERT INTO Genre (description)
VALUES ('Fantasy'),
('Science Fiction'),
('Mistery');

-- Insert Series Data
INSERT INTO Series (title, genre_id, series_length)
VALUES ('Lord of the Rings', 1, 3),
('Harry Potter', 1, 7),
('Hunger Games', 2, 4);

-- Insert Books Data
INSERT INTO Books (title, in_series, series_id, genre_id)
VALUES ('The Fellowship of the Ring', TRUE, 1, 1),
('The Two Towers', TRUE, 1, 1),
('The Return of the King', TRUE, 1, 1);

-- Insert Authors Data
INSERT INTO Authors (first_name, last_name)
VALUES ('J.R.R.', 'Tolkien'),
('J.K.', 'Rowling'),
('Suzanne', 'Collins');

-- Insert Series_Authors Data
INSERT INTO Series_Authors (series_id, author_id)
VALUES (1, 1),
(2, 2),
(3, 3);

-- Insert Books_Authors Data
INSERT INTO Books_Authors (book_id, author_id)
VALUES (1, 1),
(2, 1),
(3, 1);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
