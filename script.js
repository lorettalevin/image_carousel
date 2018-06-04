var kitties = document.getElementsByClassName("kitty");
var dotz = document.getElementsByClassName("dot");
var isTransitioning = false;
var curKitty = 0;
var onDeck = 1;
var timerID;

function moveKitties() {
    kitties[curKitty].classList.remove("onscreen");
    kitties[curKitty].classList.add("exit");

    kitties[onDeck].classList.add("onscreen");

    setDot();

    curKitty = onDeck;
    onDeck += 1;

    if (onDeck >= kitties.length) {
        onDeck = 0;
    }
    isTransitioning = true;
}

function setDot() {
    for (var i = 0; i < dotz.length; i++) {
        dotz[i].classList.remove("current-dot");
    }
    dotz[onDeck].classList.add("current-dot");
}

timerID = setTimeout(moveKitties, 2000);

document.addEventListener("transitionend", function(e) {
    if (!e.target.classList.contains("exit")) {
        return;
    }
    e.target.classList.remove("exit");
    timerID = setTimeout(moveKitties, 2000);
    isTransitioning = false;
});

dotz = [].slice.call(dotz);
dotz.forEach(function(dot, i) {
    dot.addEventListener("click", function() {
        if (isTransitioning) {
            return;
        }
        clearTimeout(timerID);

        onDeck = i;

        moveKitties();
    });
});
