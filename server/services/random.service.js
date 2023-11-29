// Id Maker
function* idMaker() {
  let index = 0;
  while (true) {
    yield ++index;
  }
}

export const generateID = idMaker().next().value