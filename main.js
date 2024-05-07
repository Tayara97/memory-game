let duration = 1000;
let btn = document.querySelector(".control .btn");
btn.onclick = () => {
  let username = prompt("what's your name");
  if (username === null || username === "") {
    document.querySelector(".info .name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".info .name span").innerHTML = username;
  }

  document.querySelector(".control").remove();
};
let blocksContainer = document.querySelector(".memory-blocks");
let blocks = Array.from(blocksContainer.children);

let orderrange = [...Array(blocks.length).keys()];
shuffle(orderrange);
blocks.forEach((block, index) => {
  block.style.order = orderrange[index];

  block.addEventListener("click", () => {
    flip(block);
    let allFlipped = blocks.filter((flippedblocks) =>
      flippedblocks.classList.contains("flip")
    );

    // condition if the two flipped===2
    if (allFlipped.length === 2) {
      // during the time out add no clicking Class
      stopclicking();
      checkmatching(allFlipped[0], allFlipped[1]);
    }
    // set timeout to return unfflipped again
    setTimeout(() => {
      blocksContainer.classList.remove("no-clicking");
    }, duration);
    //matched blocks
    // settimout to return unflip
  });
});
//matched blocks&unmatched blocks
function checkmatching(firstBlock, secondBlock) {
  let tries = document.querySelector(".info .tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    document.getElementById("success").play();
    firstBlock.classList.remove("flip");
    secondBlock.classList.remove("flip");
    firstBlock.classList.add("matching");
    secondBlock.classList.add("matching");
  } else {
    document.getElementById("fail").play();
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("flip");
      secondBlock.classList.remove("flip");
    }, duration);
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
//flip function
function flip(selectedOne) {
  selectedOne.classList.add("flip");
}
function stopclicking() {
  blocksContainer.classList.add("no-clicking");
}

/*
timer for the game 
reset button
local storage  */
