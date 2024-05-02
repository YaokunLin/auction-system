-- PlatformUser data
insert into PlatformUser(username, password, first_name, last_name) values ('echoliu', '1234', 'Echo', 'Liu');
insert into Adminuser(username, position) values ('echoliu', 'main admin');
update Adminuser set position='admin' where username='echoliu';
insert into PlatformUser(username, password, first_name, last_name) values ('bettywu', '4321', 'Betty', 'Wu');

-- Item data
insert into item(itemid, item_name, item_description, returnable, username, categoryid,conditionid)
values (123, 'apple', 'Delicious apple', false, 'echoliu', 14, 1);
insert into item(itemid, item_name, item_description, returnable, username, categoryid,conditionid)
values (125, 'pear', 'Delicious pear', false, 'echoliu', 14, 2);
insert into item(itemid, item_name, item_description, returnable, username, categoryid,conditionid)
values (127, 'apple', 'Delicious apple', false, 'echoliu', 14, 2);

insert into item(itemid, item_name, item_description, returnable, username, categoryid,conditionid) 
values (124, 'tent', 'Snowpeak tent', false, 'bettywu', 5, 3);
insert into item(itemid, item_name, item_description, returnable, username, categoryid,conditionid) 
values (126, 'hiking poles', 'black diamond', false, 'bettywu', 5, 1);

-- Auction statistics
insert into Auction (itemid, status, starting_bid_price, minimum_sale_price, get_it_now_price, start_datetime,end_datetime) 
values (123, 'finished', 5, 10, 12, TO_TIMESTAMP('2024-03-15 9:30:20','YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP('2024-03-15 10:30:20','YYYY-MM-DD HH:MI:SS'));
update Auction set status='finished' where itemid=123;
insert into Auction (itemid, status, starting_bid_price, minimum_sale_price, get_it_now_price, start_datetime,end_datetime) 
values (125, 'finished', 3, 8, 10, TO_TIMESTAMP('2024-02-15 9:30:20','YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP('2024-02-18 10:30:20','YYYY-MM-DD HH:MI:SS'));
update Auction set status='active' where itemid=125;

insert into Auction (itemid, status, starting_bid_price, minimum_sale_price, get_it_now_price, start_datetime,end_datetime) 
values (124, 'finished', 40, 55, 70, TO_TIMESTAMP('2024-01-01 9:30:20','YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP('2024-02-15 10:30:20','YYYY-MM-DD HH:MI:SS'));
update Auction set status='won' where itemid=124;
insert into Auction (itemid, status, starting_bid_price, minimum_sale_price, get_it_now_price, start_datetime,end_datetime) 
values (126, 'finished', 25, 35, 45, TO_TIMESTAMP('2024-01-10 9:30:20','YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP('2024-01-15 10:30:20','YYYY-MM-DD HH:MI:SS'));

-- canceled auction
insert into Auction (itemid, status, starting_bid_price, minimum_sale_price, get_it_now_price, start_datetime, end_datetime, cancel_reason, canceled_by) 
values (127, 'canceled', 4, 6, 11, TO_TIMESTAMP('2024-01-10 9:30:20','YYYY-MM-DD HH:MI:SS'),TO_TIMESTAMP('2024-01-15 10:30:20','YYYY-MM-DD HH:MI:SS'), 'Too fragile, quality not good', 'echoliu');


-- Rating statistics
insert into Rating (itemid, number_of_stars, rating_datetime, username) 
values (123, 3, TO_TIMESTAMP('2024-03-16 9:30:20','YYYY-MM-DD HH:MI:SS'), 'bettywu');
insert into Rating (itemid, number_of_stars, rating_datetime, username) 
values (124, 5, TO_TIMESTAMP('2024-02-16 9:30:20','YYYY-MM-DD HH:MI:SS'), 'echoliu');
insert into Rating (itemid, number_of_stars, rating_datetime, username) 
values (124, 5, TO_TIMESTAMP('2024-02-16 9:30:20','YYYY-MM-DD HH:MI:SS'), 'echoliu');
insert into Rating (itemid, number_of_stars, rating_datetime, username) 
values (127, 4, TO_TIMESTAMP('2024-03-16 9:30:20','YYYY-MM-DD HH:MI:SS'), 'bettywu');