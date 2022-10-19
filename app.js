const isEmpty = (str) => !str.trim().length;
const input = document.querySelector("#input-link");
const btn = document.querySelector("#short-btn");
const emptyInputText = document.querySelector("#empty-input");
const isValidHttpUrl = (string) => {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};
btn.addEventListener("click", () => {
  linkHandler();
});
const linkHandler = () => {
  if (isEmpty(input.value)) {
    input.classList.add("empty");
    input.classList.remove("normal");
    emptyInputText.classList.add("emptytxt");
    console.log("false");
  } else if (isValidHttpUrl(input.value) == false) {
    input.classList.add("empty");
    input.classList.remove("normal");
    emptyInputText.classList.add("emptytxt");
    console.log("false");
  } else {
    emptyInputText.classList.remove("emptytxt");
    input.classList.remove("empty");
    input.classList.add("normal");
    apiHandler();
  }
};
let link;
let orgLink;
const apiHandler = () => {
  const API_URL_ALL = `https://api.shrtco.de/v2/shorten?url=${input.value}`;
  fetch(API_URL_ALL)
    .then((res) => res.json())
    .then((linksRaw) => {
      link = linksRaw.result.full_short_link;
      orgLink = linksRaw.result.original_link;
      renderLink(link, orgLink);
    });
};

const renderLink = (link, orgLink) => {
  const root = document.querySelector(".root");
  const div = document.createElement("div");
  const orgLinkDiv = document.createElement("div");
  const shortlinkDiv = document.createElement("div");
  const orgLinkText = (document.createElement("p").innerText = orgLink);
  const shortLinkText = (document.createElement("p").innerText = link);
  const btn = document.createElement("button");

  div.className = "link-box";
  btn.innerText = "Copy";
  orgLinkDiv.className = "org-link";
  shortlinkDiv.className = "short-link";

  root.append(div);
  div.append(orgLinkDiv, shortlinkDiv);
  orgLinkDiv.append(orgLinkText);
  shortlinkDiv.append(shortLinkText, btn);

  btn.addEventListener("click", () => {
    let copyText = link;
    navigator.clipboard.writeText(copyText);
    btn.innerText = "Copied!";
    btn.classList.add("active");
    setTimeout(() => {
      btn.innerText = "Copy";
      btn.classList.remove("active");
    }, 5000);
  });
};
