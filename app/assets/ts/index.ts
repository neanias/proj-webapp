import * as d3 from "d3-selection";
import * as $ from "jquery";
import Blazon from "./Blazon";

const svg = d3.select("svg");

function main(data: { key: string }): void {
  const blazon: Blazon = new Blazon(svg, data);
  blazon.draw();
}

// Capture form output, then send it to backend
$(document).ready(() => {
  $("form").submit((event) => {
    const formData = {
      blazon: $("textarea[name=blazon]").val(),
    };
    void $.ajax({
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(formData),
      dataType: "json",
      type: "POST",
      url: "/_parse",
    })
      .done((data) => {
        main(data);
      })
      .fail((jqXHR, textStatus) => {
        alert("Request failed: " + textStatus);
      });
    event.preventDefault();
  });
});
