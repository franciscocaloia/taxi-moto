import { fetchData } from "./fetch";

export async function getPricing(distance) {
  const response = fetchData("/orders/prices");
  const prices = await response.json();
  const pricing = {
    shipment: 0,
    additional: 0,
  };
  for (const key in prices) {
    if (distance >= parseInt(key)) {
      pricing.shipment += prices[key].shipment;
      pricing.additional += prices[key].additional;
    }
  }
  return pricing;
}
