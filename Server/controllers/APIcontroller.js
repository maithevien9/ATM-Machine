'use strict';
const SmartContractDAO = require('../data/SmartContractDAO');
const helper = require('./helper');

exports.withdraw = async function withdraw(req, res) {
  try {
    let { address, amount } = req.body;
    if (address === undefined || amount === undefined || amount <= 0) {
      req.status(400).json(helper.APIReturn(101, 'Bad request'));
    }
    console.log('Call smart contract');

    let dao = new SmartContractDAO();
    let trans = await dao.withdraw(address, amount);
    console.log('HC', trans);

    return res.status(200).json(
      helper.APIReturn(
        0,
        {
          to: address,
          amount: amount,
          txHash: trans,
        },
        'success'
      )
    );
  } catch (error) {
    console.log({
      error,
    });

    return res.status(599).json(helper.APIReturn(101, 'Something is wrong'));
  }
};
