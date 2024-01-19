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

        switch (packageType) {
            case 'wood':
                details.packageCost = baseCost * 0.05;
                break;
            case 'plastic':
                details.packageCost = baseCost * 0.10; 
                break;
            case 'cardboard':
                details.packageCost = -(baseCost * 0.01); 
                break;

        }

        // Add extra cost based on destination country
        switch (destinationCountry) {
            case 'USA':
                details.destinationCost = baseCost * 0.18; 
                break;
            case 'Bolivia':
                details.destinationCost = baseCost * 0.13;
                break;
            case 'India':
                details.destinationCost = baseCost * 0.19; 
                break;
            default:
                details.destinationCost = baseCost * 0.15; 
                break;
        }

        // Add extra cost based on shipping mode
        switch (shippingMode) {
            case 'sea':
                details.shippingCost = 400; 
                break;
            case 'land':
                details.shippingCost = 10 * quantity; 
                break;
            case 'air':
                details.shippingCost = 30 * quantity;
                if (quantity > 1000) {
                    details.shippingCost *= 0.85; 
                }
                break;
        }

        // Calculate total
        let total = baseCost - details.quantityDiscount + details.packageCost + details.destinationCost + details.shippingCost;
        return { total, details };
    }
}

module.exports = PricingStrategy;
