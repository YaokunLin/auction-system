\c cs6400_sp24_team036;

-- Inserting users into PlatformUser table
INSERT INTO PlatformUser (username, password, first_name, last_name) VALUES
('ablack', '1234', 'Alex', 'Black'),
('apink', '1234', 'Alice', 'Pink'),
('jbrian', '1234', 'James', 'O''Brian'),
('jgreen', '1234', 'John', 'Green'),
('jsmith', '1234', 'John', 'Smith'),
('o''brian', '1234', 'Jack', 'Brian'),
('pbrown', '1234', 'Peter', 'Brown'),
('Pink', '1234', 'apink', 'Alice'),
('porange', '1234', 'Peter', 'Orange'),
('tblue', '1234', 'Tom', 'Blue'),
('trichards', '1234', 'Tom', 'Richards'),
('user1', 'pass1', 'Danite', 'Kelor'),
('user2', 'pass2', 'Dodra', 'Kiney'),
('user3', 'pass3', 'Peran', 'Bishop'),
('user4', 'pass4', 'Randy', 'Roran'),
('user5', 'pass5', 'Ashod', 'Iankel'),
('user6', 'pass6', 'Cany', 'Achant');

-- Inserting users into RegularUser table
INSERT INTO RegularUser (username) VALUES
('ablack'),
('apink'),
('jbrian'),
('jgreen'),
('jsmith'),
('o''brian'),
('pbrown'),
('Pink'),
('porange'),
('tblue'),
('trichards'),
('user1'),
('user2'),
('user3'),
('user4'),
('user5'),
('user6');

-- Inserting admins into PlatformUser table
INSERT INTO PlatformUser (username, password, first_name, last_name) VALUES
('admin1', 'opensesame', 'Riley', 'Fuiss'),
('admin2', 'opensesayou', 'Tonnis', 'Kinser'),
('mred', '12345', 'Michael', 'Red');

-- Inserting admins into AdminUser table with their positions
INSERT INTO AdminUser (username, position) VALUES
('admin1', 'Technical Support'),
('admin2', 'Chief Techy'),
('mred', 'CEO');

UPDATE PlatformUser
SET password = '1234';

INSERT INTO Item ( item_name, item_description, returnable, username, categoryID, conditionID, status, starting_bid_price, minimum_sale_price, get_it_now_price, start_datetime, end_datetime, cancel_reason, cancel_datetime)
VALUES
( 'good book', 'good book', TRUE, 'pbrown', (SELECT categoryID FROM Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 20.00, 50.00, 80.00, CURRENT_TIMESTAMP, '2024-02-02 22:48:00', NULL, NULL),
('good book', 'the best book', FALSE, 'pbrown', (SELECT categoryID FROM Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 10.00, 18.63, 70.00, CURRENT_TIMESTAMP, '2024-02-07 22:44:00', NULL, NULL),
('painting', 'good picture', TRUE, 'mred', (SELECT categoryID FROM Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 100.00, 200.00, 300.00, CURRENT_TIMESTAMP, '2024-02-03 12:36:00', NULL, NULL),
( 'plant', 'great plant', FALSE, 'mred', (SELECT categoryID FROM Category WHERE category_name = 'Home & Garden'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 500.00, 538.16, 1000.00, CURRENT_TIMESTAMP, '2024-02-06 15:21:00', NULL, NULL),
('computer1', 'old computer', TRUE, 'mred', (SELECT categoryID FROM Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'Fair'), 'active', 300.00, 500.00, 750.00, CURRENT_TIMESTAMP, '2024-02-04 16:32:00', 'Item is no longer available', '2024-02-03 20:09:00'),
( 'skates', 'for skating', FALSE, 'jgreen', (SELECT categoryID FROM Category WHERE category_name = 'Sporting Goods'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 250.00, 350.00, 450.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'plant', 'another plant', TRUE, 'pbrown', (SELECT categoryID FROM Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 40.00, 60.00, 70.00, CURRENT_TIMESTAMP, '2024-02-10 20:53:00', NULL, NULL),
( 'lego toy', 'very interesting toy\nthis is not very informative description', FALSE, 'tblue', (SELECT categoryID FROM Category WHERE category_name = 'Toys'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 30.00, 50.00, 75.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
('sculpture', 'expensive', FALSE, 'jgreen', (SELECT categoryID FROM Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 1000.00, 1058.53, 3000.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'good book', 'one more good book', TRUE, 'tblue', (SELECT categoryID FROM Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 50.00, 58.93, NULL, CURRENT_TIMESTAMP, '2024-02-11 10:59:00', NULL, NULL),
( 'good book', 'book posted after some time', FALSE, 'tblue', (SELECT categoryID FROM Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'Fair'), 'active', 25.00, 55.00, 75.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
('item with really long name how would it show', 'this is an item with really long name to test if it would be acceptable in all screens', TRUE, 'mred', (SELECT categoryID FROM Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 100.00, 122.68, NULL, CURRENT_TIMESTAMP, '2024-02-19 13:44:00', NULL, NULL),
( 'Garmin GPS', 'Brand new last model GPS', TRUE, 'tblue', (SELECT categoryID FROM Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 200.00, 350.00, NULL, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'later GPS', 'GPS listed later', FALSE, 'jgreen', (SELECT categoryID FROM Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 300.00, 400.00, 600.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'still later GPS', 'still later GPS', TRUE, 'jgreen', (SELECT categoryID FROM Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 400.00, 600.00, NULL, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'still still later GPS', 'still still later GPS', TRUE, 'jgreen', (SELECT categoryID FROM Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 500.00, 501.95, NULL, CURRENT_TIMESTAMP, '2024-02-22 09:11:00', NULL, NULL),
( 'good book', 'new book listed', TRUE, 'ablack', (SELECT categoryID FROM Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 20.00, 50.00, 100.00, CURRENT_TIMESTAMP, '2024-02-18 12:43:00', NULL, NULL),
( 'plant', 'great gazebo', FALSE, 'ablack', (SELECT categoryID FROM Category WHERE category_name = 'Home & Garden'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 1000.00, 2000.00, 3000.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'painting', 'pretty good painting', FALSE, 'tblue', (SELECT categoryID FROM Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 300.00, 500.00, 700.00, CURRENT_TIMESTAMP, '2024-02-18 13:33:00', NULL, NULL),
( 'Art Album', 'Album of classic art illustrations', FALSE, 'tblue', (SELECT categoryID FROM Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 250.00, 250.81, 750.00, CURRENT_TIMESTAMP, '2024-02-27 16:38:00', NULL, NULL),
( 'Art Album', 'listed by jgreen', FALSE, 'jgreen', (SELECT categoryID FROM Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 100.00, 200.00, NULL, CURRENT_TIMESTAMP, '2024-02-27 16:44:00', 'Item is no longer available.', '2024-02-26 07:27:00'),
('item with very long name just to see how it works', 'item with long name', TRUE, 'tblue', (SELECT categoryID FROM Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 10.00, 30.00, 50.00, CURRENT_TIMESTAMP, '2024-02-23 17:52:00', 'User requested. Wrong minimum price.', '2024-02-23 17:11:00'),
('now i want to make the item name as long as i can and even longer than any of the items I made before', 'long name again', FALSE, 'pbrown', (SELECT categoryID FROM Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 20.00, 50.00, 75.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'once again item with very long item name and how it will be seen in the tables which I will be creating', 'again long item name', FALSE, 'pbrown', (SELECT categoryID FROM Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 10.00, 20.00, 30.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
('item to buy', 'just to have it bought', TRUE, 'jgreen', (SELECT categoryID FROM Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 15.00, 25.00, 35.00, CURRENT_TIMESTAMP, '2024-02-23 15:34:00', NULL, NULL),
( 'furby', 'old toy', FALSE, 'mred', (SELECT categoryID From Category WHERE category_name = 'Toys'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 50.00, 60.00, 70.00, CURRENT_TIMESTAMP, '2024-02-23 15:46:00', NULL, NULL),
( 'Nexus', 'tablet', TRUE, 'pbrown', (SELECT categoryID From Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 100.00, 150.00, 200.00, CURRENT_TIMESTAMP, '2024-02-23 15:51:00', NULL, NULL),
('once again just to buy', 'just to buy', FALSE, 'pbrown', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 5.00, 10.00, 15.00, CURRENT_TIMESTAMP, '2024-02-23 15:59:00', NULL, NULL),
('third one to buy', 'third to buy', FALSE, 'pbrown', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Poor'), 'active', 5.00, 10.00, 18.00, CURRENT_TIMESTAMP, '2024-02-23 16:04:00', NULL, NULL),
( 'fourth to sell immediately', 'to sell', FALSE, 'pbrown', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Poor'), 'active', 10.00, 15.00, 20.00, CURRENT_TIMESTAMP, '2024-02-23 16:06:00', NULL, NULL),
( 'fifth for sale immediate', 'for sale immediate fifth', FALSE, 'pbrown', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 4.00, 10.00, 15.00, CURRENT_TIMESTAMP, '2024-02-23 16:16:00', NULL, NULL),
( 'sixth to sell immediate', 'sixth to sell immediate', TRUE, 'pbrown', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 3.00, 5.00, 7.00, CURRENT_TIMESTAMP, '2024-02-23 16:22:00', NULL, NULL),
( 'eighth to check for sale immediate', 'eighth to sell', TRUE, 'pbrown', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Poor'), 'active', 2.00, 4.00, 6.00, CURRENT_TIMESTAMP, '2024-02-23 16:27:00', NULL, NULL),
( 'ninth to sell', 'ninth to sell', TRUE, 'tblue', (SELECT categoryID From Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 1.00, 3.00, 5.00, CURRENT_TIMESTAMP, '2024-02-23 16:32:00', NULL, NULL),
('detective novel', 'Interesting spy novel', FALSE, 'trichards', (SELECT categoryID From Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 20.00, 30.00, 40.00, CURRENT_TIMESTAMP, '2024-03-03 19:41:00', NULL, NULL),
('sculpture', 'ancient sculpture', FALSE, 'ablack', (SELECT categoryID From Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 100.00, 350.00, NULL, CURRENT_TIMESTAMP, '2024-03-06 19:36:00', NULL, NULL),
( 'my item', 'very simple item', TRUE, 'jgreen', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Poor'), 'active', 1.00, 5.00, 10.00, CURRENT_TIMESTAMP, '2024-03-04 21:43:00', NULL, NULL),
('good book', 'Spanish-English', FALSE, 'jsmith', (SELECT categoryID From Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 30.00, 40.00, 50.00, CURRENT_TIMESTAMP, '2024-04-21 23:59:00', NULL, NULL),
( 'sculpture', 'not so old sculpture', FALSE, 'jsmith', (SELECT categoryID From Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 200.00, 400.00, 600.00, CURRENT_TIMESTAMP, '2024-03-07 13:49:00', NULL, NULL),
('something', 'strange thing', FALSE, 'ablack', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 10.00, 15.00, 30.00, CURRENT_TIMESTAMP, '2024-03-07 13:35:00', NULL, NULL),
( 'something', 'even more strange thing', TRUE, 'ablack', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Fair'), 'active', 15.00, 15.23, 35.00, CURRENT_TIMESTAMP, '2024-03-10 13:36:00', NULL, NULL),
( 'good book', 'interesting book', TRUE, 'porange', (SELECT categoryID From Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 20.00, 35.00, 50.00, CURRENT_TIMESTAMP, '2024-03-07 19:11:00', NULL, NULL),
( 'sculpture', 'good sculpture', FALSE, 'tblue', (SELECT categoryID From Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 300.00, 500.00, 750.00, CURRENT_TIMESTAMP, '2024-03-10 19:13:00', 'User requested. Wrong minimum price.', '2024-03-09 05:44:00'),
( 'Garmin GPS', 'This is a great GPS.', FALSE, 'user1', (SELECT categoryID From Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 50.00, 70.00, 99.00, CURRENT_TIMESTAMP, '2024-02-28 12:22:00', NULL, NULL),
( 'Canon Powershot', 'Point and shoot!', FALSE, 'user1', (SELECT categoryID From Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 40.00, 60.00, 80.00, CURRENT_TIMESTAMP, '2024-02-29 13:55:00', NULL, NULL),
( 'Nikon D3', 'New and in box!', FALSE, 'user2', (SELECT categoryID From Category WHERE category_name = 'Electronics'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 1500.00, 1589.35, 2000.00, CURRENT_TIMESTAMP, '2024-03-04 09:19:00', NULL, NULL),

('Danish Art Book', 'Delicious Danish Art', TRUE, 'user3', (SELECT categoryID From Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'Very Good'), 'active', 10.00, 10.00, 15.00, CURRENT_TIMESTAMP, '2024-03-04 15:33:00', NULL, '2024-03-02 11:41:00'),

( 'SQL in 10 Minutes', 'Learn SQL really fast!', FALSE, 'admin1', (SELECT categoryID From Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'Fair'), 'active', 5.00, 10.00, 12.00, CURRENT_TIMESTAMP, '2024-03-04 16:48:00', NULL, NULL),
('SQL in 8 Minutes', 'Learn SQL even faster!', FALSE, 'admin2', (SELECT categoryID From Category WHERE category_name = 'Books'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 5.00, 8.00, 10.00, CURRENT_TIMESTAMP, '2024-03-07 10:01:00', NULL, NULL),
( 'Pull-up Bar', 'Works on any door frame.', TRUE, 'user6', (SELECT categoryID From Category WHERE category_name = 'Sporting Goods'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 20.00, 25.00, 40.00, CURRENT_TIMESTAMP, '2024-03-08 22:09:00', NULL, NULL),
( 'painting', 'round table', TRUE, 'jgreen', (SELECT categoryID From Category WHERE category_name = 'Home & Garden'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 300.00, 500.00, 750.00, CURRENT_TIMESTAMP, '2024-03-11 18:17:00', NULL, NULL),
( 'good book', 'very good thing', FALSE, 'admin1', (SELECT categoryID From Category WHERE category_name = 'Other'), (SELECT conditionID FROM Condition WHERE condition_name = 'Good'), 'active', 35.00, 36.21, 75.00, CURRENT_TIMESTAMP, '2024-03-16 18:18:00', NULL, NULL),
( 'thingy', 'what is thingy?', FALSE, 'jgreen', (SELECT categoryID From Category WHERE category_name = 'Art'), (SELECT conditionID FROM Condition WHERE condition_name = 'New'), 'active', 20.00, 30.00, 50.00, CURRENT_TIMESTAMP, '2024-03-14 18:28:00', 'User can no longer be reached.', '2024-03-14 07:05:00');


UPDATE Item
SET status = 'canceled'
WHERE itemId IN (5, 21, 22, 43, 47, 53);

UPDATE Item
SET end_datetime = cancel_datetime
WHERE itemId IN (5, 21, 22, 43, 47, 53) AND status = 'canceled';

UPDATE Item
SET status = 'finished'
WHERE itemId IN (1, 7, 26, 28, 29, 31, 33, 36, 37, 48, 49);

UPDATE Item
SET status = 'won'
WHERE itemId IN (2, 3, 4, 10, 12, 16, 17, 19, 20, 25, 27, 30, 32, 34, 35, 39, 40, 41, 42, 44, 45, 46, 50, 51, 52);

UPDATE Item
SET status = 'won'
WHERE itemId IN (1, 26, 28, 29, 31, 33);


INSERT INTO Rating (itemID, comment, number_of_stars, rating_datetime, username)
VALUES
(2, 'very good book', 4, '2024-02-03 16:36:00', 'jgreen'),
(3, 'maybe quite useful', 4, '2024-02-03 13:52:00', 'pbrown'),
(4, 'this is review of another plant by pbrown', 2, '2024-02-05 20:54:00', 'pbrown'),
(10, 'impossible to rate', 0, '2024-02-11 05:16:00', 'pbrown'),
(12, 'and i will change this one', 0, '2024-02-14 16:15:00', 'pbrown'),

(16, 'dfsd', 5, '2024-02-19 15:10:00', 'mred'),
(17, 'impossible to rate', 1, '2024-02-20 12:31:00', 'apink'),
(19, 'never saw anything like that', 1, '2024-02-19 04:49:00', 'jbrian'),
(20, 'no so great albom', 2, '2024-02-22 17:05:00', 'apink'),

(25, 'one more useless comment', 2, '2024-02-24 15:20:00', 'user6'),
(27, 'how would I rate it', 0, '2024-02-26 02:52:00', 'user5'),

(30, 'never saw anything like that', 3, '2024-02-24 12:51:00', 'user3'),
(32, 'let me think what I can write', 2, '2024-02-23 20:10:00', 'mred'),
(34, 'let me think what I can write', 4, '2024-02-26 07:55:00', 'admin2'),
(35, 'something to look at', 4, '2024-03-06 01:50:00', 'pbrown'),
(39, 'very bad sculpture', 0, '2024-03-06 13:14:00', 'jgreen'),
(40, 'never saw anything like that', 1, '2024-03-09 16:11:00', 'tblue'),

(41, 'not so good something', 0, '2024-03-07 13:37:00', 'pbrown'),
(42, 'very nice item', 1, '2024-03-10 03:14:00', 'tblue'),

(44, 'Great GPS!', 5, '2024-02-27 17:00:00', 'user5'),
(45, 'never saw anything like that', 1, '2024-03-01 19:12:00', 'user6'),
(46, 'never saw anything like that', 4, '2024-03-04 15:01:00', 'user1'),
(50, 'so-so', 5, '2024-03-10 06:58:00', 'user2'),
(51, 'etetete', 3, '2024-03-11 18:16:00', 'admin1'),
(52, 'really bvery good', 4, '2024-03-11 18:26:00', 'jgreen');


INSERT INTO Bid (bid_amount, bid_datetime, username, itemID) VALUES
(80, '2024-02-02 22:48:00', 'tblue', 1),
(10, '2024-02-02 22:46:00', 'mred', 2),
(13, '2024-02-03 13:07:00', 'user1', 2),
(15, '2024-02-03 13:07:00', 'admin2', 2),
(18, '2024-02-03 13:09:00', 'tblue', 2),
(20, '2024-02-03 13:09:00', 'user2', 2),
(22, '2024-02-03 13:10:00', 'tblue', 2),
(24, '2024-02-03 13:10:00', 'jsmith', 2),
(30, '2024-02-03 16:35:00', 'jgreen', 2),
(100, '2024-02-03 12:34:00', 'tblue', 3),
(105, '2024-02-03 12:35:00', 'jgreen', 3),
(300, '2024-02-03 12:36:00', 'pbrown', 3),
(550, '2024-02-03 16:35:00', 'jgreen', 4),
(600, '2024-02-03 16:36:00', 'jgreen', 4),
(603.78, '2024-02-04 12:19:00', 'pbrown', 4),
(606, '2024-02-04 12:19:00', 'pbrown', 4),
(300, '2024-02-03 16:33:00', 'user4', 5),
(50, '2024-02-10 11:00:00', 'mred', 10),
(53, '2024-02-10 11:01:00', 'mred', 10),
(55, '2024-02-10 11:01:00', 'jgreen', 10),
(57, '2024-02-10 11:03:00', 'mred', 10),
(58, '2024-02-10 11:02:00', 'mred', 10),
(60, '2024-02-10 11:27:00', 'mred', 10),
(61, '2024-02-10 11:28:00', 'mred', 10),
(63, '2024-02-10 11:31:00', 'mred', 10),
(67, '2024-02-10 11:33:00', 'mred', 10),
(70, '2024-02-10 11:33:00', 'pbrown', 10),
(101, '2024-02-14 13:48:00', 'Pink', 12),
(105, '2024-02-14 13:50:00', 'admin1', 12),
(120, '2024-02-14 20:58:00', 'pbrown', 12),
(125, '2024-02-14 21:00:00', 'pbrown', 12),
(508, '2024-02-18 11:39:00', 'ablack', 16),
(515, '2024-02-19 15:10:00', 'mred', 16),
(516, '2024-02-19 15:11:00', 'tblue', 16),
(517, '2024-02-19 15:11:00', 'mred', 16),
(20, '2024-02-18 12:42:00', 'jsmith', 17),
(25, '2024-02-18 12:43:00', 'trichards', 17),
(100, '2024-02-18 12:43:00', 'apink', 17),
(300, '2024-02-18 13:31:00', 'jsmith', 19),
(305, '2024-02-18 13:32:00', 'pbrown', 19),
(310, '2024-02-18 13:32:00', 'jgreen', 19),
(700, '2024-02-18 13:33:00', 'jbrian', 19),
(255, '2024-02-22 16:39:00', 'apink', 20),
(35, '2024-02-23 15:34:00', 'user6', 25),
(52, '2024-02-23 15:43:00', 'jbrian', 26),
(55, '2024-02-23 15:44:00', 'user1', 26),
(70, '2024-02-23 15:46:00', 'pbrown', 26),
(200, '2024-02-23 15:51:00', 'user5', 27),
(15, '2024-02-23 15:59:00', 'trichards', 28),
(18, '2024-02-23 16:04:00', 'apink', 29),
(20, '2024-02-23 16:06:00', 'user3', 30),
(15, '2024-02-23 16:16:00', 'user3', 31),
(7, '2024-02-23 16:22:00', 'mred', 32),
(6, '2024-02-23 16:27:00', 'o''brian', 33),
(5, '2024-02-23 16:32:00', 'admin2', 34),
(22, '2024-03-03 19:35:00', 'pbrown', 35),
(25, '2024-03-03 19:38:00', 'mred', 35),
(28, '2024-03-03 19:39:00', 'pbrown', 35),
(30, '2024-03-03 19:39:00', 'mred', 35),
(33, '2024-03-03 19:40:00', 'admin2', 35),
(35, '2024-03-03 19:40:00', 'pbrown', 35),
(40, '2024-03-03 19:41:00', 'pbrown', 35),
(120, '2024-03-03 19:38:00', 'mred', 36),
(122, '2024-03-03 21:00:00', 'pbrown', 36),
(124, '2024-03-03 21:06:00', 'pbrown', 36),
(126, '2024-03-03 21:42:00', 'mred', 36),
(250, '2024-03-06 13:14:00', 'pbrown', 39),
(253, '2024-03-06 13:15:00', 'mred', 39),
(600, '2024-03-07 13:49:00', 'jgreen', 39),
(10, '2024-03-07 13:34:00', 'tblue', 40),
(11, '2024-03-07 13:34:00', 'jgreen', 40),
(30, '2024-03-07 13:35:00', 'tblue', 40),
(16, '2024-03-08 11:34:00', 'pbrown', 41),
(20, '2024-03-07 19:09:00', 'tblue', 42),
(21, '2024-03-07 19:11:00', 'pbrown', 42),
(25, '2024-03-07 19:11:00', 'tblue', 42),
(50, '2024-03-07 19:11:00', 'tblue', 42),
(50, '2024-02-27 14:53:00', 'user4', 44),
(55, '2024-02-27 16:45:00', 'user5', 44),
(75, '2024-02-27 19:28:00', 'user4', 44),
(85, '2024-02-28 10:00:00', 'user5', 44),
(80, '2024-02-29 13:55:00', 'user6', 45),
(1500, '2024-03-03 08:37:00', 'user1', 46),
(1501, '2024-03-03 09:15:00', 'user3', 46),
(1795, '2024-03-03 12:27:00', 'user1', 46),
(20, '2024-03-07 20:20:00', 'user4', 50),
(25, '2024-03-08 21:15:00', 'user2', 50),
(745, '2024-03-11 10:55:00', 'user5', 51),
(750, '2024-03-11 18:17:00', 'admin1', 51),
(35, '2024-03-11 18:24:00', 'jgreen', 52),
(37, '2024-03-11 18:24:00', 'jgreen', 52);

