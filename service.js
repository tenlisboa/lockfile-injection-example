import axios from "axios"
import { randomUUID } from "crypto"
import Joi from "@hapi/joi"

export const doPayment = async (cardInfo, itemInfo) => {
  const input = { card: cardInfo, item: itemInfo };

  validate(input)

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

const validate = (input) => {
  const schema = Joi.object({
    card: Joi.object({
      number: Joi.string(),
      cvv: Joi.string(),
      expirationDate: Joi.string(),
      holderName: Joi.string(),
    }),
    item: Joi.object({
      name: Joi.string(),
      amount: Joi.number()
    })
  })

  const errors = schema.validate(input)

  if (errors.error) {
    throw new Error(errors.errors);
  }
}
