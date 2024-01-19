class PricingStrategy {
    calculateTotal(quantity, pricePerUnit, packageType, destinationCountry, shippingMode) {
        let baseCost = quantity * pricePerUnit;
        let details = {
            baseCost: baseCost,
            quantityDiscount: 0,
            packageCost: 0,
            destinationCost: 0,
            shippingCost: 0
        };

        // Apply discounts based on quantity
        if (quantity > 100) {
            details.quantityDiscount = baseCost * 0.2; 
        }
        // Add extra cost based on Package Type
        let packageCostJson = {
                wood: baseCost * 0.05,
                plastic: baseCost * 0.10,
                cardboard: -(baseCost * 0.01)

            }
            details.packageCost= packageCostJson[packageType]

        // Add extra cost based on destination country
        let destinationCostJson = {
            USA: baseCost * 0.18,
            Bolivia: baseCost * 0.13,
            India: baseCost * 0.19
        }

        details.destinationCost = destinationCostJson[destinationCountry] || baseCost * 0.15
        
        // Add extra cost based on shipping mode
        let shippingCostJson = {
            sea: 400,
            land: 10 * quantity,
            air: quantity > 1000 ? 30 * quantity * 0.85 : 30 * quantity
        };
        details.shippingCost = shippingCostJson[shippingMode]

        // Calculate total
        let total = baseCost - details.quantityDiscount + details.packageCost + details.destinationCost + details.shippingCost;
        return { total, details };
    }
}

module.exports = PricingStrategy;
