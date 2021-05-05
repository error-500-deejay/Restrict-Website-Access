//get the block/ublock status from the bacground and tehn set the block/unblock text accorrdingly
chrome.runtime.sendMessage(
  { datarequest: "blockrequestdata" },
  function (response) {
    datajson = response.webListData;
    console.log(datajson);
    if (datajson.action == "block") {
      document.getElementById("block-button").innerHTML =
        "&#128275; Unrestrict access to all sites";
      document
        .getElementById("block-button")
        .setAttribute("todoAction", "Unblock");
    } else {
      document.getElementById("block-button").innerHTML =
        "&#128272; Restrict access to all Sites except Current Website";
      document
        .getElementById("block-button")
        .setAttribute("todoAction", "Block");
    }
  }
);

//on click the block/unblock button send request to backend to update the block/unblock status and
//according show it on the button
document.getElementById("block-button").addEventListener("click", function () {
  //let reqtype = document.getElementById("block-button").innerHTML.trim();
  let reqtype = document
    .getElementById("block-button")
    .getAttribute("todoAction");
  chrome.runtime.sendMessage(
    {
      datarequest: "blockrequest",
      content: reqtype.toLowerCase(),
    },
    function () {
      let actionDisplay = reqtype == "Block" ? "Unblock" : "Block";
      let textDisplay =
        reqtype == "Block"
          ? "&#128275; Unrestrict access to all sites"
          : "&#128272; Restrict access to all Sites except Current Website";

      document.getElementById("block-button").innerHTML = textDisplay;
      document
        .getElementById("block-button")
        .setAttribute("todoAction", actionDisplay);
    }
  );
});
