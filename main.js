const art = document.querySelector("article");
const btnNext = document.querySelector(".btnNext");
const btnPrev = document.querySelector(".btnPrev");
const spanPage = document.querySelector(".spanPage");

function createText(ifClass = "", ifId = "", type, text) {
  const element = document.createElement(type);

  if (ifClass) element.className = ifClass;
  if (ifId) element.id = ifId;
  element.textContent = text;

  return element;
}

function createContainer(ifClass = "", ifId = "", type) {
  const element = document.createElement(type);

  if (ifClass) element.className = ifClass;
  if (ifId) element.id = ifId;

  return element;
}

function createImg(ifClass = "", ifId = "", src, alt) {
  const element = document.createElement("img");

  if (ifClass) element.className = ifClass;
  if (ifId) element.id = ifId;
  element.src = src;
  element.alt = alt;
  return element;
}

function createCard(img, nom, type, pv, att, def, vit) {
  const section = createContainer("card", "", "section");

  const pokeImg = createImg("card-img", "", img, "pokemon");

  const name = createText("card-name", "", "h2", nom);

  const divType = createContainer("divType", "", "div");
  if (type.length == 1) {
    const ptype1 = createText(
      `card-type ${type[0].type.name}`,
      "",
      "p",
      type[0].type.name,
    );
    divType.appendChild(ptype1);
  } else {
    const ptype1 = createText(
      `card-type ${type[0].type.name}`,
      "",
      "p",
      type[0].type.name,
    );
    const ptype2 = createText(
      `card-type ${type[1].type.name}`,
      "",
      "p",
      type[1].type.name,
    );
    divType.appendChild(ptype1);
    divType.appendChild(ptype2);
  }

  const divInfo = createContainer("card-stat", "", "div");
  const pvStat = createText("", "", "p", `pv: ${pv}`);
  const attStat = createText("", "", "p", `att: ${att}`);
  const defStat = createText("", "", "p", `def: ${def}`);
  const vitStat = createText("", "", "p", `vit: ${vit}`);

  divInfo.appendChild(pvStat);
  divInfo.appendChild(attStat);
  divInfo.appendChild(defStat);
  divInfo.appendChild(vitStat);

  section.appendChild(pokeImg);
  section.appendChild(name);
  section.appendChild(divType);
  section.appendChild(divInfo);

  return section;
}

let offset = 0;
let limit = 20;

async function pokeApi() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  );
  const data = await res.json();

  art.innerHTML = "";

  for (const poke of data.results) {
    const resDetails = await fetch(poke.url);
    const details = await resDetails.json();

    const card = createCard(
      details.sprites.front_default,
      details.name,
      details.types,
      details.stats[0].base_stat,
      details.stats[1].base_stat,
      details.stats[2].base_stat,
      details.stats[5].base_stat,
    );
    art.appendChild(card);
  }
}

pokeApi();

let count = 0;

btnPrev.disabled = count === 0;
btnNext.disabled = count === 67;

btnNext.addEventListener("click", () => {
  count++;
  spanPage.textContent = count;
  offset += limit;
  pokeApi();
  btnNext.disabled = count === 67;
  btnPrev.disabled = false;
});

btnPrev.addEventListener("click", () => {
  if (count > 0) {
    count--;
    spanPage.textContent = count;
    offset -= limit;
    pokeApi();
  }
  btnPrev.disabled = count === 0;
  btnNext.disabled = false;
});
