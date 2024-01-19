const express = require('express');
const PackageFactory = require('../storeLogic/packageFactory')
const PricingStrategy = require('../storeLogic/pricingStrategies');

const router = express.Router();
const pricingStrategy = new PricingStrategy();

// Example price per unit, this could be included with the req
const PRICE_PER_UNIT = 10; 

router.post('/', (req, res) => {
    try {
        const { color, size, quantity, destinationCountry, shippingMode } = req.body;
        if (!size || !quantity || !destinationCountry || !shippingMode) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const packageStrategy = PackageFactory.createPackage(size);
        const packageType = packageStrategy.getPackageType();
        const protectionType = packageStrategy.getProtectionType(shippingMode);
        const {total,details} = pricingStrategy.calculateTotal(quantity, PRICE_PER_UNIT, packageType, destinationCountry, shippingMode);

        res.json({
            packageType,
            protectionType,
            total,
            details
        });
    } catch (error) {
        console.error('Error processing order:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;