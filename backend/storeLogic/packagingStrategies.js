class PackageStrategy {
    
    defaultShippingMode = {}
    type = undefined
    constructor() {
        if (this.constructor === PackageStrategy) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.defaultShippingMode = {
            land: 'polystyrene balls',
            sea: 'moisture-absorbing beads and bubble wrap bags',
            air: 'polystyrene balls'
        }
    }

    getPackageType() {
        return this.type
    }

    getProtectionType(shippingMode) {
        let shippingType = undefined
        if (shippingMode){
            shippingType = this.defaultShippingMode[shippingMode]
        }
        return shippingType
    }

}

class WoodPackageStrategy extends PackageStrategy {
    constructor() {
        super ();
        this.type = 'wood'
    }
}

class CardboardPackageStrategy extends PackageStrategy {
    constructor() {
        super ();
        this.type = 'cardboard'
    }
}

class PlasticPackageStrategy extends PackageStrategy {
    constructor() {
        super ();
        this.type = 'plastic'
        this.defaultShippingMode.air = 'bubble wrap bags'
    }
}

module.exports = { WoodPackageStrategy, CardboardPackageStrategy, PlasticPackageStrategy };
