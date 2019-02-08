# api-buddy

URLS to test with:

GET pets for owner: http://localhost:3030/api/pets?id=o1

DELETE pet of owner: http://localhost:3030/api/pets?id=p1549625228932

POST pet of owner: http://localhost:3030/api/owners/o1/pets
{
    "name": "Alan Turin",
    "avatarUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjOqKI0kZG7nIV2w7AFRWfPUGiqeM0J26TbCp8irR1jZiNG556",
    "favouriteFood": "Digestive Biscuits",
    "owner": "o1"
}

PUT update owner age: http://localhost:3030/api/owner/o1
{
    "id": "o1",
    "name": "Steve",
    "age": 1228
}
Check it's updated:
GET http://localhost:3030/api/owners
