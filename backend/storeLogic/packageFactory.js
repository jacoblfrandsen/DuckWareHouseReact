const { WoodPackageStrategy, CardboardPackageStrategy, PlasticPackageStrategy } = require('./packagingStrategies');

class PackageFactory {
    static createPackage(size) {
        switch(size) {
            case 'XLarge':
            case 'Large':
                return new WoodPackageStrategy();
            case 'Medium':
                return new CardboardPackageStrategy();
            case 'Small':
            case 'XSmall':
                return new PlasticPackageStrategy();
            default:
                throw new Error('Invalid size');
        }
    }
}

module.exports = PackageFactory;