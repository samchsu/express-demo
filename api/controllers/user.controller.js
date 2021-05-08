
var users = {
    user1: {
        firstname: "Sam",
        lastname: "Hsu",
        age: 25,
        id: 1
    },
    user2: {
        firstname: "Captain",
        lastname: "America",
        age: 37,
        id: 2
    },
    user3: {
        firstname: "Peter",
        lastname: "Parker",
        age: 17,
        id: 3
    },
    user4: {
        firstname: "Black",
        lastname: "Widow",
        age: 24,
        id: 4
    }
}

exports.create = function(req, res) {
    console.log(req.body)
var newUser = req.body;
// users[user5] = newUser;
users["user" + newUser.id] = newUser;
console.log("--->After Post, users:\n" + JSON.stringify(users, null, 4));
res.end("Post Successfully: \n" + JSON.stringify(newUser, null, 4));
};

exports.findAll = function(req, res) {
console.log("--->Find All: \n" + JSON.stringify(users, null, 4));
res.end("All users: \n" + JSON.stringify(users, null, 4));  
};

exports.findOne = function(req, res) {
var user = users["user" + req.params.id];
console.log("--->Find user: \n" + JSON.stringify(user, null, 4));
if (JSON.stringify(user, null, 4) === undefined)
    res.end( "User with ID #" + req.params.id + " does not exist. Please try another.");
else
    res.end( "Find a User:\n" + JSON.stringify(user, null, 4));
};

exports.findNum = function(req, res) {
    console.log("Total number of users: " + Object.keys(users).length);
    res.send({ numOfUsers: Object.keys(users).length });
};

exports.update = function(req, res) {
var id = parseInt(req.params.id);
var updatedUser = req.body; 
if(users["user" + id] != null){
// update data
users["user" + id] = updatedUser;

console.log("--->Update Successfully, users: \n" + JSON.stringify(users, null, 4))

// return
res.end("Update Successfully! \n" + JSON.stringify(updatedUser, null, 4));
}else{
res.end("User doesn't exist:\n:" + JSON.stringify(updatedUser, null, 4));
}
};

exports.delete = function(req, res) {
var deleteUser = users["user" + req.params.id];
    if (JSON.stringify(deleteUser, null, 4) === undefined)
        res.end( "User with ID #" + req.params.id + " does not exist. Please try another to delete.");
    else
    {
        delete users["user" + req.params.id];
        console.log("--->After deletion, user list:\n" + JSON.stringify(users, null, 4) );
        res.end( "Deleted user: \n" + JSON.stringify(deleteUser, null, 4));
    }
};