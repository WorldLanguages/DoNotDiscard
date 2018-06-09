window.onload = function() {

    value = localStorage.getItem("value");
    document.getElementById("textarea").value = value;

    document.getElementById("textarea").onkeyup = function() {
      if(document.getElementById("textarea").value.length === 0) {
        localStorage.removeItem("urls");
        localStorage.removeItem("value");
        return;
      }
      localStorage.setItem("value", document.getElementById("textarea").value);
      array = document.getElementById("textarea").value.split("\n");
      for (i = 0; i < array.length; i++) {
        array[i] = "*://" + array[i] + "/*";
        if(i === array.length-1)
        localStorage.setItem("urls", array)
      }
    }

    document.getElementById("discards").onclick = function() {
      chrome.tabs.create({url: "chrome://discards"})
    }

}
