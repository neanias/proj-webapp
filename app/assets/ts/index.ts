import * as d3 from "d3-selection";
import * as $ from "jquery";
import Blazon from "./Blazon";
import ChargeShapes from "./ChargeShapes";
import { ECharge, ETincture, IBlazon, ICharge, IQuarterly } from "./interfaces";

const svg = d3.select("svg");
const shield = svg.select("#shield");
const chargeLayer = svg.select("#charge_layer");

function main(data: { key: string; }): void {
  const blazon: Blazon = new Blazon(svg, data);
  blazon.draw();
}

function drawShield(blazon: IBlazon): void {
  clearShield();
  shield.classed(blazon.field, true);
  for (const charge of blazon.charges) { drawCharge(charge); }
}

function drawCharge(charge: ICharge): void {
  const chargeId = `${charge.charge}_${getRandomInt(512)}`;
  if (charge.charge === ECharge.Chief) {
    chargeLayer.append("rect").attr("id", chargeId);
  } else {
    chargeLayer.append("path").attr("id", chargeId);
  }
  const currentCharge = svg.select(`#${chargeId}`);

  // Apply specifications
  if (!ChargeShapes.chargePaths.has(charge.charge)) {
    throw new Error(`Don't know how to draw ${charge.charge}`);
  }

  // forEach returns the value before the pair
  // ChargeShapes.chargePaths.get(charge.charge)!.forEach((property, attribute) => {
  //   currentCharge.attr(attribute, property)
  //                .classed(charge.tincture, true);
  // });

  if (charge.sinister) {
    currentCharge.attr("transform", "matrix(-1,0,0,1,236.58573,0) translate(-23.2, -0.5)");
  }
}

function clearShield(): void {
  $("#charge_layer").children().each((_, element) => { element.remove(); });
  $("#shield").removeClass();
}

function createLayer(chargeId: string): Element {
  const newChargeLayer: Element = document.createElement("g");
  const chargeIdNumber: string = chargeId.split("_", 1)[1];
  newChargeLayer.setAttribute("id", `layer_${chargeIdNumber}`);
  return newChargeLayer;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
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
      main(data);
    }).fail((jqXHR, textStatus) => {
      alert("Request failed: " + textStatus);
    });
    event.preventDefault();
  });
});
