//Fetches Random Images from the metmuseum-api ; Stores the ids in the keychain in order to prevent multiple calls
//Department ID = 11 is paintings ; use other if you wish
//var keychainkey = "paintingIDs";
//var metRes;

function getArtwork() {
  // Request list of artworks
  const metUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&departmentId=11&q=Painting';

  fetchAsync(metUrl)
    .then(function(metRes) {

      console.log('MET COLLECTION:');
      console.log(metRes);

      // Random number from total number of works
      const max = metRes.total-1;
      console.log("Max: "+max);
      const min = 0;
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      console.log("Random: "+random);
      // Retrieve the
      const picked = metRes.objectIDs[random];
      console.log("Picked: "+picked);


      const artworkUrl = ('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + picked);

      fetchAsync(artworkUrl)
        .then(function(artworkRes) {

          console.log('ARTWORK:');
          console.log(artworkRes);

          const artImgUrl = artworkRes.primaryImageSmall;

          console.log('ART IMG:');
          console.log(artImgUrl);

          return artImgUrl;

          // Fetch the image
          /*
          fetchImageAsync(artworkRes.primaryImageSmall)
            .then(function (artImg) {

              console.log('ART IMG:');
              console.log(artImg);

              // TOP OF PYRAMID


            })
            .catch(reason => console.log('FETCH IMAGE ERROR: ' + reason.message));
            */
        })
        .catch(reason => console.log('FETCH ARTWORK INFO ERROR: ' + reason.message));
    })
    .catch(reason => console.log('FETCH COLLECTION INFO ERROR: ' + reason.message));
}

// async function
async function fetchAsync (url) {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.json();
  // only proceed once second promise is resolved
  return data;
}

async function fetchImageAsync (url) {
  // await response of fetch call
  let response = await fetch(url);
  // only proceed once promise is resolved
  let data = await response.loadImage();
  // only proceed once second promise is resolved
  return data;
}
