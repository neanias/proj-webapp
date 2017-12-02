import * as d3 from "d3";
import { chargePaths, IBlazon, ICharge } from "./charge_shapes";

const svg = d3.select("svg");
const shield = svg.select("#shield");
const blazonConfig: IBlazon = {
  charges: [
    {
      charge: "saltire",
      tincture: "argent",
    },
  ],
  field: "azure",
};

function drawShield(blazon: IBlazon): void {
  shield.attr("class", blazon.field);
  for (const charge of blazon.charges) {
    svg.append("path")
          .attr("id", charge.charge)
          .attr("class", charge.tincture)
          .attr("d", chargePaths[charge.charge]);
  }
}

drawShield(blazonConfig);
