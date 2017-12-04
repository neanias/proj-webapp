import * as d3 from "d3";
import * as $ from "jquery";
import { chargePaths, IBlazon, ICharge } from "./charge_shapes";

const svg = d3.select("svg");
const shield = svg.select("#shield");

function drawShield(blazon: IBlazon): void {
  clearShield();
  shield.attr("class", blazon.field);
  for (const charge of blazon.charges) {
    svg.append("path")
          .attr("id", charge.charge)
          .attr("class", charge.tincture)
          .attr("d", chargePaths[charge.charge]);
  }
}

function clearShield(): void {
  $("path").each((index, element) => {
    if (!$(element).is("#shield")) {
      element.remove();
    }
  });
}

// Capture form output, then send it to backend
$(document).ready(() => {
  $("form").submit((event) => {
    const formData = {
      blazon: $("textarea[name=blazon]").val(),
    };
    $.ajax({
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(formData),
      dataType: "json",
      type: "POST",
      url: "/_parse",
    }).done((data) => {
      drawShield(data);
    }).fail((jqXHR, textStatus) => {
      alert("Request failed: " + textStatus);
    });
    event.preventDefault();
  });
});
