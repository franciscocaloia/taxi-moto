export async function getPricing(distance) {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/orders/prices", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw response;
  }
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
