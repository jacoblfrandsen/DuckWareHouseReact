const { WoodPackageStrategy, CardboardPackageStrategy, PlasticPackageStrategy } = require('./packagingStrategies');

class PackageFactory {
    static createPackage(size) {
        let Strategy = undefined
        if(size){
            let json = {
                XLarge: WoodPackageStrategy,
                Large: WoodPackageStrategy,
                Medium: CardboardPackageStrategy,
                Small: PlasticPackageStrategy,
                XSmall: PlasticPackageStrategy,
            }
            if(json[size]){
                Strategy = new json[size]()
            }
        }
        return Strategy

    }
}

module.exports = PackageFactory;