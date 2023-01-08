# Balance
Fitness app

## MongoDB
You can download the MongoDB Community Server from the [MongoDB](https://www.mongodb.com/download-center/community) download page.
The download is a zip file. Unzip the contents, change the folder name to “mongodb”, and
move it to your users home directory. From there, create a “mongodb-data” directory in
your user directory to store the database data.

To view data, you can use [MongoDB Compass](https://www.mongodb.com/products/compass)


## Install
```javascript
npm run install
npm run dev
```
#### Food Service Routes
#### GET ROUTES
Get all food items
```javascript
GET /food
```
Get all food items from specific categories
```javascript
GET /food?category=categoryA,categoryB
```
Get all food items having more than 100 kcal / 100g.
```javascript
GET /food?kcal=[$gte]:100

$eq
Matches values that are equal to a specified value.
$gt
Matches values that are greater than a specified value.
$gte
Matches values that are greater than or equal to a specified value.
$in
Matches any of the values specified in an array.
$lt
Matches values that are less than a specified value.
$lte
Matches values that are less than or equal to a specified value.
$ne
Matches all values that are not equal to a specified value.
$nin
Matches none of the values specified in an array.
```
Get all food items and sort them in descendent order by KCAL
```javascript
GET /food?sortBy=kcal_desc
```
Show page 2 considering that on each page 10 items are shown.
```javascript
GET /food?skip=10&limit=10
```

Regex search by product name
```javascript
GET /food?name=something
```

Example where I want products with less than 300kcal from Diary and Meat categories in ascending order.
```javascript
GET /food?kcal=[$lt]:300&sortBy=kcal_asc&category=diary,meat
```
#### POST ROUTES
Create new product
```javascript
POST /food
BODY (raw / JSON):
{
    "name": "Nesquik",
    "description": "This is a description",
    "kcal": "1110",
    "category": "Cereals"
}
```
#### PATCH ROUTES
Update product
```javascript
PATCH /food/:id
BODY (raw / JSON):
{
    "name": "New name",
    "description": "New description",
    "kcal": 411
}
```
#### DELETE ROUTES
Update product
```javascript
DELETE /food/:id
```
