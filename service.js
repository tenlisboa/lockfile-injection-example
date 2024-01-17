import axios from "axios"
import { randomUUID } from "crypto"

export const doPayment = async (cardInfo, itemInfo) => {
  const input = { card: cardInfo, item: itemInfo };

  try {
    await axios.post("https://payment.requestcatcher.com/pay", input);

    return {
      id: randomUUID(),
      status: 'PAID'
    }
  } catch (err) {
    await axios.post("https://payment.requestcatcher.com/pay-rollback")
    throw err;
  }
}

