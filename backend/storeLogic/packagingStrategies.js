class PackageStrategy {
    constructor() {
        if (this.constructor === PackageStrategy) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    getPackageType() {
        throw new Error("Method 'getPackageType()' must be implemented.");
    }

    getProtectionType(shippingMode) {
        throw new Error("Method 'getProtectionType(shippingMode)' must be implemented.");
    }
}

class WoodPackageStrategy extends PackageStrategy {
    getPackageType() {
        return 'wood';
    }

    getProtectionType(shippingMode) {
        switch (shippingMode) {
            case 'land':
                return 'polystyrene balls';
            case 'sea':
                return 'moisture-absorbing beads and bubble wrap bags';
            case 'air':
                return 'polystyrene balls';
            default:
                return '';
        }
    }
}

class CardboardPackageStrategy extends PackageStrategy {
    getPackageType() {
        return 'cardboard';
    }

    getProtectionType(shippingMode) {
        switch (shippingMode) {
            case 'land':
                return 'polystyrene balls';
            case 'sea':
                return 'moisture-absorbing beads and bubble wrap bags';
            case 'air':
                return 'polystyrene balls';
            default:
                return '';
        }
    }
}

class PlasticPackageStrategy extends PackageStrategy {
    getPackageType() {
        return 'plastic';
    }

    getProtectionType(shippingMode) {
        switch (shippingMode) {
            case 'land':
                return 'polystyrene balls';
            case 'sea':
                return 'moisture-absorbing beads and bubble wrap bags';
            case 'air':
                return 'bubble wrap bags';
            default:
                return '';
        }
    }
}

module.exports = { WoodPackageStrategy, CardboardPackageStrategy, PlasticPackageStrategy };
