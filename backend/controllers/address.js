import { Address } from "../modals/Address.js";

const addAddress = async (req, res) => {
  try {
    const { fullName, country, state, city, pincode, phoneNumber, address } =
      req.body;
    const userId = req.user;
    let userAddress = new Address({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });
    await userAddress.save();
    res.json({
      message: "Address added",
      userAddress,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

const getAddress = async (req, res) => {
  try {
    let address = await Address.find({ userId: req.user }).sort({
      createdAt: -1
    });
    res.json({
      message: "Address",
      userAddress: address[0],
      success: true
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

export { addAddress, getAddress };
