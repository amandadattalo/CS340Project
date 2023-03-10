-- #########################
-- BOOKS
-- #########################

-- Query for Books table 
SELECT Books.book_id, Books.title AS Title, 
GROUP_CONCAT(CONCAT(Authors.first_name, ' ', Authors.last_name) SEPARATOR ', ') AS Author, 
CASE WHEN Books.in_series then 'Yes' else 'No' end AS InSeries, Series.title AS Series, 
Genres.name AS Genre 
FROM Books 
LEFT JOIN Books_Authors ON Books.book_id = Books_Authors.book_id 
LEFT JOIN Authors ON Books_Authors.author_id = Authors.author_id 
JOIN Genres ON Books.genre_id = Genres.genre_id 
LEFT JOIN Series ON Books.series_id = Series.series_id 
GROUP BY Books.book_id;

-- Query for adding a new book
-- Form queries
SELECT author_id, first_name, last_name FROM Authors;
SELECT series_id, title FROM Series;
SELECT genre_id, name FROM Genres;

-- Add new book 
INSERT INTO Books (title, in_series, series_id, genre_id) 
VALUES (:title, :in_series, :series_id, :genre_id)

-- Get book_id from newly inserted book
SELECT book_id FROM Books WHERE Books.title = :title

-- Add new book M:N 
INSERT INTO Books_Authors (book_id, author_id) VALUES (:book_id, :author_id)

-- Query for editing a book
-- Form queries
SELECT book_id FROM Books;
SELECT author_id, first_name, last_name FROM Authors;
SELECT series_id, title FROM Series;
SELECT genre_id, name FROM Genres;

-- Edit book
UPDATE Books 
SET title = :title, in_series = :in_series, series_id = :series_id, genre_id = :genre_id
WHERE Books.book_id = :book_id

DELETE FROM Books_Authors WHERE book_id = :book_id

INSERT INTO Books_Authors (book_id, author_id) VALUES (:book_id, :author_id)

-- Query for deleting a book
-- Delete book
DELETE FROM Books WHERE book_id = :book_id

-- Delete book M:N
DELETE FROM Books_Authors WHERE book_id = :book_id


-- #########################
-- AUTHORS
-- #########################

-- Query for Authors table 
SELECT Authors.author_id, Authors.first_name AS First_Name, Authors.last_name AS Last_Name, 
GROUP_CONCAT(Books.title SEPARATOR ', ') AS Books 
FROM Authors 
LEFT JOIN Books_Authors ON Authors.author_id = Books_Authors.author_id 
LEFT JOIN Books ON Books_Authors.book_id = Books.book_id 
GROUP BY Authors.author_id;

-- Query for adding a new author
-- Add new author
INSERT INTO Authors (first_name, last_name) VALUES (:first_name, :last_name)

-- Query for editing an author
-- Edit author
UPDATE Authors SET first_name = :first_name, last_name = :last_name 
WHERE Authors.author_id = :author_id;

-- Query for deleting an author
-- Delete author
DELETE FROM Authors WHERE author_id = :author_id;


-- #########################
-- SERIES
-- #########################

-- Query for Series table 
SELECT Series.series_id, Series.title AS Title, Genres.name AS Genre, 
Series.series_length AS `Series_Length` 
FROM Series 
JOIN Genres ON Series.genre_id = Genres.genre_id;

-- Query for adding a new series
-- Form queries
SELECT author_id, first_name, last_name FROM Authors;
SELECT Genres.name FROM Genres;

-- Add new series
INSERT INTO Series (title, genre_id, series_length) VALUES (:title, :genre_id, :series_length);

-- Get series_id from newly inserted series
SELECT series_id FROM Series WHERE Series.title = :title

-- Add new series M:N 
INSERT INTO Series_Authors (series_id, author_id) VALUES (:series_id, :author_id)

-- Query for editing a series
-- Edit series
UPDATE Series SET title = :title, genre_id = :genre_id, series_length = :series_length
WHERE Series.series_id = series_id;

DELETE FROM Series_Authors WHERE series_id = :series_id;

INSERT INTO Series_Authors (series_id, author_id) VALUES (:series_id, author_id);

-- Query for deleting a series
-- Delete series
DELETE FROM Series WHERE series_id = :series_id

-- Delete series M:N
DELETE FROM Series_Authors WHERE serie_id = :series_id;


-- #########################
-- GENRES
-- #########################

-- Query for Genres table 
SELECT Genres.genre_id, Genres.name AS Name, Genres.description AS Description FROM Genres;

-- Query for adding a new genre
-- Add new genre
INSERT INTO Genres (name, description) VALUES (:name, :description);

-- Query for editing a genre
-- Edit genre
UPDATE Genres SET name = :name, description = :description WHERE Genres.genre_id = :genre_id;

-- Query for deleting a genre
-- Delete genre
DELETE FROM Genres WHERE genre_id = :genre_id;
