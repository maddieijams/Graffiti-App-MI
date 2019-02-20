module.exports = (sequelize, DataTypes) => {
    const Graffiti = sequelize.define('graffiti', {
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lat: {
            type: DataTypes.DECIMAL, //??
            allowNull: false
        },
        lng: {
            type: DataTypes.DECIMAL, //??
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Graffiti;
}

// [
//     {
//         "id": 5,
//         "title": "Space Kitty Aristotle",
//         "image": "https://media-cdn.tripadvisor.com/media/photo-s/04/78/40/e2/hope-outdoor-gallery.jpg",
//         "info": "Side of a building from the pay to park lot.",
//         "lat": "39.1060845",
//         "lng": "-84.514153",
//         "owner": 25,
//         "createdAt": "2019-02-19T14:06:50.532Z",
//         "updatedAt": "2019-02-19T14:06:50.532Z"
//     },
//     {
//         "id": 2,
//         "title": "Faded Camera",
//         "image": "https://i.imgur.com/ARsfdej.jpg",
//         "info": "Behind the Robert's Camera downtown",
//         "lat": "39.7781976",
//         "lng": "-86.1553557",
//         "owner": 25,
//         "createdAt": "2019-02-18T15:42:15.528Z",
//         "updatedAt": "2019-02-19T14:23:00.295Z"
//     },
//     {
//         "id": 1,
//         "title": "Angry Ballerinas",
//         "image": "http://piecesofdetroit.com/wp-content/uploads/detroit-graffiti-dfw-640x360.jpg",
//         "info": "no longer there, sorry.",
//         "lat": "39.8279396",
//         "lng": "-86.148336",
//         "owner": 25,
//         "createdAt": "2019-02-18T15:38:33.320Z",
//         "updatedAt": "2019-02-19T14:26:02.330Z"
//     },
//     {
//         "id": 3,
//         "title": "Bart Simpson on Drugs",
//         "image": "http://farm6.static.flickr.com/5489/14405338298_93857209ed.jpg",
//         "info": "Down an alley in Xi'an, China",
//         "lat": "34.1710063",
//         "lng": "109.0063435",
//         "owner": 25,
//         "createdAt": "2019-02-18T15:44:56.268Z",
//         "updatedAt": "2019-02-19T14:28:13.018Z"
//     },
//     {
//         "id": 4,
//         "title": "Space Kitty Aristotle",
//         "image": "http://www.chinadaily.com.cn/culture/art/img/attachement/jpg/site1/20150126/00221910da6c162fc42a04.jpg",
//         "info": "Side of a building from the pay to park lot.",
//         "lat": "39.1060845",
//         "lng": "-84.514153",
//         "owner": 25,
//         "createdAt": "2019-02-18T15:49:32.697Z",
//         "updatedAt": "2019-02-19T14:30:05.135Z"
//     }
// ]