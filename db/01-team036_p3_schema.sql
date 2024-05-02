-- Creating roles
-- CREATE ROLE newuser WITH LOGIN PASSWORD 'password';
CREATE ROLE gatechUser WITH LOGIN PASSWORD 'pwd';

-- Dropping the database if it exists
DROP DATABASE IF EXISTS cs6400_sp24_team036;

-- Creating the database with UTF8 encoding
CREATE DATABASE cs6400_sp24_team036
    WITH ENCODING='UTF8'
    LC_COLLATE='en_US.utf8'
    LC_CTYPE='en_US.utf8'
    TEMPLATE=template0;

-- Connecting to the database to grant privileges
\c cs6400_sp24_team036;

-- Granting privileges to gatechUser
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO gatechUser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO gatechUser;

-- Tables

CREATE TABLE PlatformUser (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

CREATE TABLE RegularUser (
    username VARCHAR(255) PRIMARY KEY,
    CONSTRAINT fk_RegularUser_username_PlatformUser_username FOREIGN KEY (username) REFERENCES PlatformUser (username)
);

CREATE TABLE AdminUser (
    username VARCHAR(255) PRIMARY KEY,
    position VARCHAR(255),
    CONSTRAINT fk_AdminUser_username_PlatformUser_username FOREIGN KEY (username) REFERENCES PlatformUser (username)
);

CREATE TABLE Category (
     categoryID SERIAL PRIMARY KEY,
     category_name VARCHAR(100) NOT NULL
);

CREATE TABLE Condition (
     conditionID SERIAL PRIMARY KEY,
     condition_name VARCHAR(100) NOT NULL
);

CREATE TABLE Item (
    itemID SERIAL PRIMARY KEY,
    item_name VARCHAR(200) NOT NULL,
    item_description VARCHAR(1000) NOT NULL,
    returnable BOOLEAN NOT NULL DEFAULT FALSE,
    username VARCHAR(100) NOT NULL,
    categoryID INT NOT NULL,
    conditionID INT NOT NULL,
    status VARCHAR(255) CHECK (status IN ('active', 'finished', 'won', 'canceled')),
    starting_bid_price NUMERIC(10, 2) NOT NULL,
    minimum_sale_price NUMERIC(10, 2) NOT NULL,
    get_it_now_price NUMERIC(10, 2),
    start_datetime TIMESTAMP NOT NULL,
    end_datetime TIMESTAMP,
    cancel_reason VARCHAR(255),
    cancel_datetime TIMESTAMP, -- new addition
    canceled_by VARCHAR(255), -- username of admin user who canceled the auction
    CONSTRAINT fk_Item_username_PlatformUser_username FOREIGN KEY (username) REFERENCES PlatformUser (username),
    CONSTRAINT fk_Item_categoryID_Category_categoryID FOREIGN KEY (categoryID) REFERENCES Category (categoryID),
    CONSTRAINT fk_Item_conditionID_Condition_conditionID FOREIGN KEY (conditionID) REFERENCES Condition (conditionID),
    CONSTRAINT fk_Item_canceled_by_AdminUser_username FOREIGN KEY (canceled_by) REFERENCES AdminUser(username),
    CHECK (
        (get_it_now_price IS NOT NULL AND starting_bid_price <= minimum_sale_price AND minimum_sale_price < get_it_now_price)
        OR
        (get_it_now_price IS NULL AND starting_bid_price <= minimum_sale_price)
    )
);

CREATE TABLE Bid (
    itemID INTEGER NOT NULL,
    bid_amount NUMERIC(10, 2) NOT NULL,
    bid_datetime TIMESTAMP NOT NULL,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (itemID, bid_amount),
    CONSTRAINT fk_Bid_itemID_Item_itemID FOREIGN KEY (itemID) REFERENCES Item(itemID),
    CONSTRAINT fk_Bid_username_PlatformUser_username FOREIGN KEY (username) REFERENCES PlatformUser(username)
);

CREATE TABLE Rating (
    itemID INTEGER PRIMARY KEY,
    comment TEXT,
    number_of_stars INTEGER NOT NULL CHECK (number_of_stars >= 0 AND number_of_stars <= 5),
    rating_datetime TIMESTAMP NOT NULL,
    username VARCHAR(255), -- If the user is the winner of the item, they may enter a rating from this screen
    CONSTRAINT fk_Rating_username_PlatformUser_username FOREIGN KEY (username) REFERENCES PlatformUser(username),
    CONSTRAINT fk_Rating_itemID_Item_itemID FOREIGN KEY (itemID) REFERENCES Item(itemID)
);

-- Trigger function to ensure only admins can cancel auctions
CREATE OR REPLACE FUNCTION ensure_canceled_by_is_admin()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT username FROM AdminUser WHERE username = NEW.canceled_by) IS NULL THEN
        RAISE EXCEPTION 'Only admins can cancel auctions';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to invoke the function before insert or update on Item when canceled_by is not null
CREATE TRIGGER check_canceled_by_admin
BEFORE UPDATE OR INSERT ON Item
FOR EACH ROW
WHEN (NEW.canceled_by IS NOT NULL)
EXECUTE FUNCTION ensure_canceled_by_is_admin();

-- Insert categories
INSERT INTO Category (category_name) VALUES ('Art');
INSERT INTO Category (category_name) VALUES ('Books');
INSERT INTO Category (category_name) VALUES ('Electronics');
INSERT INTO Category (category_name) VALUES ('Home & Garden');
INSERT INTO Category (category_name) VALUES ('Sporting Goods');
INSERT INTO Category (category_name) VALUES ('Toys');
INSERT INTO Category (category_name) VALUES ('Other');

-- insert conditions
INSERT INTO Condition (condition_name) VALUES ('New');
INSERT INTO Condition (condition_name) VALUES ('Very Good');
INSERT INTO Condition (condition_name) VALUES ('Good');
INSERT INTO Condition (condition_name) VALUES ('Fair');
INSERT INTO Condition (condition_name) VALUES ('Poor');
