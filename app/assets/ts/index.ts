import * as d3 from "d3-selection";
import Blazon from "./Blazon";

const svg = d3.select("svg");

function main(data: { key: string }): void {
  const blazon: Blazon = new Blazon(svg, data);
  blazon.draw();
}

const request: Request = new Request("_parse");
const textarea = document.getElementById("#blazon") as HTMLInputElement;
const button = document.querySelector(
  "button.btn.btn-success[type=submit]"
) as HTMLButtonElement;
button.addEventListener("click", () => {
  void window
    .fetch(request, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ blazon: textarea.value }),
    })
    .then(async (response) => {
      if (!response.ok) {
        alert(`Request failed: ${response.statusText}`);
        return;
      }
      const data: { key: string } = await response.json();
      main(data);
    });
});
