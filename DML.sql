-- #########################
-- BOOKS
-- #########################

-- Query for Books table 
SELECT Books.title AS Title,  CONCAT("", Authors.first_name, " ", Authors.last_name) AS Author, 
CASE WHEN Books.in_series then 'Yes' else 'No' end InSeries,
Series.title AS Series, 
Genres.name AS Genre
FROM Books
JOIN Books_Authors
ON Books.book_id = Books_Authors.book_id
JOIN Authors
ON Books_Authors.author_id = Authors.author_id
JOIN Genres
ON Books.genre_id = Genres.genre_id
LEFT JOIN Series
ON Books.series_id = Series.series_id;

-- Query for adding a new book
-- Author select options
SELECT concat_ws("", Authors.first_name, " ", Authors.last_name) AS Author
FROM Authors;

-- Series dropdown options
SELECT Series.title AS Series
FROM Series;

-- Genre dropdown options
SELECT Genres.name AS Genre
FROM Genres;

-- Add new book 
INSERT INTO Books (title, in_series, series_id, genre_id)
VALUES (:titleInput, :in_series_from_dropdown_Input, :series_id_from_dropdown_Input, :genre_id_from_dropdown_Input);

-- Query for editing a book
-- Edit book
UPDATE Books
SET title = :titleInput, in_series = :in_series_from_dropdown_Input, series_id = :series_id_from_dropdown_Input, genre_id = :genre_id_from_dropdown_Input
WHERE id = :book_id_from_the_update_form;

-- Query for deleting a book
-- Delete book
DELETE FROM Books
WHERE id = :book_id_selected_from_browse_delete_page;

-- Delete book M:N
DELETE FROM Books_Authors
WHERE id = :book_id_selected_from_browse_delete_page;


-- #########################
-- AUTHORS
-- #########################

-- Query for Authors table 
SELECT Authors.first_name, Authors.last_name
FROM Authors;

-- Query for adding a new author
-- Add new author
INSERT INTO Author (first_name, last_name)
VALUES (:first_nameInput, :last_nameInput);

-- Query for editing an author
-- Edit author
UPDATE Authors
SET first_name = :first_nameInput, last_name = :last_nameInput 
WHERE id = :author_id_from_the_update_form;

-- Query for deleting an author
-- Delete author
DELETE FROM Authors
WHERE id = :author_id_selected_from_browse_delete_page;

-- Delete author M:N
DELETE FROM Books_Authors
WHERE id = :author_id_selected_from_browse_delete_page;

DELETE FROM Series_Authors
WHERE id = :author_id_selected_from_browse_delete_page;


-- #########################
-- SERIES
-- #########################

-- Query for Series table 
SELECT Books.title AS Title, Genres.name AS Genre, Series.series_length AS Series_Length
FROM Series
JOIN Books 
ON Series.series_id = Books.series_id
JOIN Genres
ON Books.genre_id = Genres.genre_id;

-- Query for adding a new series
-- Genre dropdown options
SELECT Genres.name AS Genre
FROM Genres;

-- Add new series
INSERT INTO Series (title, genre_id, series_length)
VALUES (:titleInput, :genre_id_from_dropdown_Input, :series_length_from_dropdown_Input);

-- Query for editing a series
-- Edit series
UPDATE Series
SET title = :titleInput, genre_id = :genre_id_from_dropdown_Input, series_length = :series_length_from_dropdown_Input
WHERE id = :series_id_from_the_update_form;

-- Query for deleting a series
-- Delete series
DELETE FROM Series
WHERE id = :series_id_selected_from_browse_delete_page;

-- Delete series M:N
DELETE FROM Series_Authors
WHERE id = :series_id_selected_from_browse_delete_page;


-- #########################
-- GENRES
-- #########################

-- Query for Genres table 
SELECT Genres.name AS Name, Genres.description AS Description
FROM Genres;

-- Query for adding a new genre
-- Add new genre
INSERT INTO Genres (name, description)
VALUES (:nameInput, :descriptionInput);

-- Query for editing a genre
-- Edit genre
UPDATE Genres
SET name = :nameInput, description = :descriptionInput
WHERE id = :genre_id_from_the_update_form;

-- Query for deleting a genre
-- Delete genre
DELETE FROM Genres
WHERE id = :genre_id_selected_from_browse_delete_page;


-- #########################
-- BOOKS_AUTHORS
-- #########################

-- Query for Books_Authors table 
SELECT Books.title AS Books,  CONCAT("", Authors.first_name, " ", Authors.last_name) AS Author
FROM Books
JOIN Books_Authors
ON Books.book_id = Books_Authors.book_id
JOIN Authors
ON Books_Authors.author_id = Authors.author_id


-- #########################
-- SERIES_AUTHORS
-- #########################

-- Query for Series_Authors table 
SELECT Series.title AS Series,  CONCAT("", Authors.first_name, " ", Authors.last_name) AS Author
FROM Series
JOIN Series_Authors
ON Series.series_id = Series_Authors.series_id
JOIN Authors
ON Series_Authors.author_id = Authors.author_id