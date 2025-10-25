export function formatMoney(amount: number | string): string {
  if (amount === null || amount === undefined || amount === "") return "0₮";

  const num = Number(amount);
  if (isNaN(num)) return "0₮";

  return num.toLocaleString("en-US") + "₮";
}
