chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //this is for message passing , the liist of website to limit usage is stored in the chrome storage local,
  //but it cant be direct accessed form the front end ie. context sites ,s o we use message passing wherein this background worker
  //reads the dat form locla storeage and send =s it to the contect
  if (request.datarequest == "blockrequestdata") {
    //console.log(" BAckground Send To client", datajson);
    getDatFromLocalStorage(request, sender, sendResponse);
    return true;
    // sendResponse({ webListData: datajson });
  } else if (request.datarequest == "blockrequest") {
    getUrlFromAction(request, sender, sendResponse);
    return true;
  }
});

//read the data of bloacked webllist and send it to the frontemd or context pages
function getDatFromLocalStorage(request, sender, sendResponse) {
  chrome.storage.local.get(["blockrequest"], function (data) {
    let datajsonin = data["blockrequest"];

    if (
      datajsonin == "" ||
      datajsonin == [] ||
      datajsonin == undefined ||
      datajsonin == null
    ) {
      datajsonin = { action: "unblock", url: "" };
    }
    datajson = datajsonin;
    console.log({ webListData: datajson });
    sendResponse({ webListData: datajson });
  });
}

//get the url of the current page and set action as block/unblock, also store the current url as one to be whitelist
//so on neew page, it check is the whitelistested url, if yes than dont block access else bock acces
function getUrlFromAction(request, sender, sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    console.log(new URL(tabs[0].url).hostname);
    let urlweb = new URL(tabs[0].url).hostname;
    chrome.storage.local.set({
      blockrequest: { action: request.content, url: urlweb },
    });
    console.log((" BAckground Update datajson ", datajson));

    sendResponse({ status: "success" });
  });
}
