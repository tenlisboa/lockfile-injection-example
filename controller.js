export const controller = async (req, res) => {
  const { cardNumber, cvv, amount, holderName, expirationDate, itemName } = req.body;

  try {
    await doPayment({
      number: cardNumber,
      cvv,
      holderName,
      expirationDate
    }, {
      amount,
      name: itemName
    });

    return res.json({
      message: "Purchased succeeded!"
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal error"
    })
  }
}
