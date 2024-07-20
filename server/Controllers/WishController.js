const Wishlist = require("../database/models/Wishlist");
const User = require("../database/models/User");
const Property = require("../database/models/property");

exports.addToWishlist = async (req, res) => {
  try {
    const { UserId, PropertyId } = req.body;
    const wishlist = await Wishlist.create({ UserId, PropertyId });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
    where:{Userid:req.params.id}
    });
 const   propertiesIds=[]
    wishlist.map((property)=>{
      propertiesIds.push(property.dataValues.PropertyId)
    })
    const properties = await Property.findAll({
      where:{id:[...propertiesIds]}
      });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { UserId } = req.params;
    await Wishlist.destroy({ where: { UserId } });
    res.status(200).json({ message: "Property removed from wishlist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
