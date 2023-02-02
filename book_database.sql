CREATE TABLE Genre (
	genre_id int UNIQUE NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (genre_id)
);

CREATE TABLE Genre (
	genre_id int UNIQUE NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    PRIMARY KEY (genre_id)
);

CREATE TABLE Series (
	series_id int UNIQUE NOT NULL AUTO_INCREMENT,
    genre_id int NOT NULL,
    series_lenght int NOT NULL,
	PRIMARY KEY (series_id),
    FOREIGN KEY (genre_id) REFERENCES Genre(genre_id)
);

CREATE TABLE Books (
    book_id int UNIQUE NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    in_series bool NOT NULL,
    series_id int,
    genre_id int NOT NULL,
    PRIMARY KEY (book_id),
    FOREIGN KEY (series_id) REFERENCES Series(series_id)
);

CREATE TABLE Authors (
    author_id int UNIQUE NOT NULL AUTO_INCREMENT,
    first_name varchar(45) NOT NULL,
    last_name varchar(45) NOT NULL,
    PRIMARY KEY (author_id)
);

CREATE TABLE Books_Authors (
    book_author_id int UNIQUE NOT NULL AUTO_INCREMENT,
    book_id int NOT NULL,
    author_id int NOT NULL,
    PRIMARY KEY (book_author_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);

CREATE TABLE Series_Authors (
    series_author_id int UNIQUE NOT NULL AUTO_INCREMENT,
    series_id int NOT NULL,
    author_id int NOT NULL,
    PRIMARY KEY (series_author_id),
    FOREIGN KEY (series_id) REFERENCES Series(series_id),
    FOREIGN KEY (author_id) REFERENCES Authors(author_id)
);


