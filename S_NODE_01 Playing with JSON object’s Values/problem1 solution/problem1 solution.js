
const {readFile,readFileSync} = require('fs');

// 1. Read the json in problem1.jsons
let fluffy = JSON.parse(readFileSync('./problems/problem1.json',{encoding:'utf-8'}));


//2 Add Height and Weight to fluffy
 fluffy.height = 180;
 fluffy.weight = 80;



// 3. Fluffy name is spelled wrongly. Update it to Fluffyy
fluffy.name = 'Fluffyy';



// 4. List all the activities of Fluffyy’s catFriends.
const {catFriends} = fluffy;
const catFriendsActivities = catFriends.map(friend => [`${friend.name}'s Activities: `,friend.activities]);
console.log("catFriendsActivities: ",catFriendsActivities)

// 5. Print the catFriends names.
const catFriendsNames = catFriends.map(friend => friend.name);
console.log("catFriendsNames: ",catFriendsNames);


// 6. Print the total weight of catFriends
const calcTotalWeight = (catFriends) => {
    let totalWeight = 0;
    catFriends.forEach(element => { 
        totalWeight += element.weight;
    });
    return totalWeight;
}
console.log("Total Weight: ",calcTotalWeight(catFriends));


// 7. Print the total activities of all cats (op:6)
let catFriendsTotalActivities = fluffy.activities;
 fluffy.catFriends.map(friend => catFriendsTotalActivities = catFriendsTotalActivities.concat(friend.activities));
 console.log('Activities', catFriendsTotalActivities);

// 8. Add 2 more activities to bar & foo cats
fluffy.catFriends.map(friend  => friend.activities.push("washing","play"));
console.log(fluffy.catFriends);

// 9. Update the fur color of bar
const updateFurColor = (name , color) => {
    fluffy.catFriends.map(friend => friend.name === name ? friend.furcolor = color : '');
}
updateFurColor('bar', 'green');
console.log(fluffy.catFriends[0]);