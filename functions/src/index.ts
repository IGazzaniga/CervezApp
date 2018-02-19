import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import * as express from 'express'
const cors = require('cors')({origin: true});
const app = express();

firebase.initializeApp(functions.config().firebase);
const usersRef = firebase.database().ref('/users');

/*
const validateFirebaseIdToken = (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !req.cookies.__session) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  }
  admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
  }).catch(error => {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
  });
};*/

app.use(cors);
//app.use(validateFirebaseIdToken);

app.get('/user/search', (req, res) => {
    const val = req.query.val;
    usersRef.orderByChild('nombre_busqueda').startAt(val).endAt(`${val}\uf8ff`).once('value', (snap) => {
      if (snap.val() !== null) {
        var returnArr = [];
        for (var key in snap.val()) {
          if (snap.val().hasOwnProperty(key)) {
            var user = snap.val()[key];
            returnArr.push(user);
          }
        }
        res.status(200).json(returnArr);
      } else {
        res.status(200).json([]);
      }
    }).catch(error => {
        console.log('Error getting user details', val, error.message);
        res.sendStatus(500);
    });
});

app.get('/user/search-by-location', (req, res) => {
    const placeId = req.query.placeId;
    usersRef.orderByChild('place_id').equalTo(placeId).once('value', (snap) => {
      if (snap.val() !== null) {
        var returnArr = [];
        for (var key in snap.val()) {
          if (snap.val().hasOwnProperty(key)) {
            var user = snap.val()[key];
            returnArr.push(user);
          }
        }
        res.status(200).json(returnArr);
      } else {
        res.status(200).json([]);
      }
    }).catch(error => {
        console.log('Error getting user details', placeId, error.message);
        res.sendStatus(500);
    });
});

app.get('/user/username', (req, res) => {
    const username = req.query.val;
    const userId = req.query.id;
    console.log('user id ' + userId);
    usersRef.orderByChild('username').equalTo(username).once('value', (snap) => {
      console.log(snap.val()[userId]);
      if (snap.val() == null || snap.val()[userId]) {
        res.status(200).json({val:true});
      } else {
        res.status(200).json({val:false});
      }
    }).catch(error => {
        console.log('Error getting user details', username, error.message);
        res.sendStatus(500);
    });
});

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.api = functions.https.onRequest(app);
