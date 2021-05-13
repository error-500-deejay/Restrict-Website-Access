//on every page load, check whether to block current site or not, ie. is the block operation enabled by user
//if  yes than check if current url is whitelisted, if yes dont block else redirect it to block page
chrome.runtime.sendMessage(
  { datarequest: "blockrequestdata" },
  function (response) {
    console.log(response);
    datajson = response.webListData;
    console.log(datajson);
    let extensionurl = chrome.runtime.getURL("bg.PNG");
    //let extensionurl =
    //"https://lh3.googleusercontent.com/W6vKpQRJlXBt2nC7bzz-nkz72ig9daz-GRCuznyGylGZgpZz3qNuj_6pVqWHHqxFffI4rZIT27Bmjw=w1920-h902-rw";
    console.log(extensionurl);
    if (datajson.action == "block") {
      if (
        location.hostname != datajson.url &&
        location.hostname != new URL(extensionurl).hostname
      ) {
        location.href = extensionurl;
      }
    } else {
      console.log("Not Blocked");
    }
  }
);
