# CS340Project
This is a repository for a Introduction to Databases Course. 

#  Overview

The Book Database will be a database driven website that will record Books to Authors, Series and Genres. It will be utilized to keep a growing personal library organized. The library in question currently contains approximately 1,000 books, with about 30 new books being added each month. That will amount to a 33% increase by the end of the year, with an estimation of similar percentage growth for the next 10 years.

#  Database Outline

###  Books

Holds information about the different books in the database.

**book_id:** int(50000), increment, unique, not Null, PK

**title:** varchar(255), not Null

**author_id:** int(50000), not Null, FK

**in_series:** bool, not Null

**series_id:** int(50000), FK, Null

**genre_id:** int(50), not Null, FK

**Relationship:** a 1:M relationship between Series and Books is implemented with series_id as FK inside of Books. 

**Relationship:** a M:N relationship between Authors and Books is implemented through the Books_Author intersection table.

**Relationship:** a 1:M relationship between Genres and Books is implemented with genre_id as FK inside of Books. 


### Authors

Holds information about the different authors that have books in the database.

**author_id:** int, increment, unique, not Null, PK

**first_name:** varchar(45), not Null

**last_name:** varchar(45), not Null

**Relationship:** a M:N relationship between Authors and Books is implemented through the Books_Author intersection table.

**Relationship:** a M:N relationship between Authors and Series is implemented through the Series_Author intersection table.



### Series

Holds information about the different series of books that are in the database.

**series_id:** int(50000), increment, unique, not Null, PK

**author_id:** int(50000), not Null, FK

**series_length:** int(1000), not Null

**genre_id:** int(50), not Null, FK

**Relationship:** a 1:M relationship between Series and Books is implemented with series_id as FK inside of Books. 

**Relationship:** a 1:M relationship between Genres and Series is implemented with genre_id as FK inside of Series. 

**Relationship:** a M:N relationship between Authors and Series is implemented through the Series_Author intersection table.



### Genres
Holds information about the different genres of books that are contained in the database.

**genre_id:** int(50), increment, unique, not Null, PK

**description:** varchar(255), not Null

**Relationship:** a 1:M relationship between Genres and Books is implemented with genre_id as FK inside of Books. 

**Relationship:** a 1:M relationship between Genres and Series is implemented with genre_id as FK inside of Series. 





# Entity-Relationship Diagram

![EntityDiagram](./Common/entityRelationship.jpg)