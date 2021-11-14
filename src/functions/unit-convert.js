/* ===========================================================

    The unitConverter() function recieve 3 parameters.
    unit: The unit value you train to convert
    from: The initial measure of convertion
    to: The final measure of convertion

    Types of measures that can be converted:
    
    International System
    km: Kilometer
    hm: Hectometer
    dam: Decameter
    m: Meter
    dm: Decimeter
    cm: Centimeter
    mm: Milimeter

    American System
    mi: Mile
    yd: Yard
    ft: Foot
    in: Inch

   =========================================================== */

const int_sys_units = ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm']
const bri_sys_units = ['mi','yd','ft','in']
const bri_sys_ratio = [1, 1760, 5280, 63360]
const mi_to_km = 1.60935

// This function below verify if the unit parameter is numeric (integer or float)
Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
        isFinite(value) && 
        Math.floor(value) === value
}

const validate = (unit, from, to) => {
    // Call number verify function
    if (!Number.isInteger(unit)) {
        console.log('Is not a number.')
        return false
    }

    // Verify if the unit os measure is in units const
    if (int_sys_units.indexOf(from) < 0 && bri_sys_units.indexOf(from) < 0) {
        console.log('The initial unit of measure is invalid.')
        return false
    }

    if (int_sys_units.indexOf(to) < 0 && bri_sys_units.indexOf(to) < 0) {
        console.log('The final unit of measure is invalid.')
        return false
    }

    return true
}

const diferenceUnits = (from, to) => {
    return int_sys_units.indexOf(from) - int_sys_units.indexOf(to)
}

const conversionProccess = (unit, diference) => {
    let result = 0.0

    if (diference > 0) {
        result = Number.parseFloat(unit / (Math.pow(10, Math.abs(diference))))
    } else {
        result = Number.parseFloat(unit * (Math.pow(10, Math.abs(diference))))
    }

    return result
}

const intSysConverter = (unit, from, to) => {
    let result = 0.0

    // Returns the difference of the relation between the units of measure
    let dif = diferenceUnits(from, to)

    return conversionProccess(unit, dif)
}

const briSysConverter = (unit, from, to) => {
    if (unit === 0) {
        return unit
    }
    
    let result = Number.parseFloat(bri_sys_ratio.at(bri_sys_units.indexOf(to)) / Number.parseFloat(bri_sys_ratio.at(bri_sys_units.indexOf(from)) / unit))

    return result
}

const unitType = (type) => {
    return (int_sys_units.indexOf(type) >= 0 ? 'IS' : (bri_sys_units.indexOf(type) >= 0 ? 'AS' : 'undefined'))
}

module.exports = {
    unitConverter: (unit, from, to) => {
        if (unit === 0) {
            return unit
        }

        // Check if is converting to de same unit of measure
        if (from === to) {
            return unit
        }

        if (!validate(unit, from, to)) {
            return -1
        }

        if (unitType(from) === 'IS' && unitType(to) === 'IS') {
            return intSysConverter(unit, from, to)
        }
        if (unitType(from) === 'AS' && unitType(to) === 'AS') {
            return briSysConverter(unit, from, to)
        }
        if (unitType(from) === 'IS' && unitType(to) === 'AS') {
            return briSysConverter(intSysConverter(Number.parseFloat(unit / mi_to_km), from, 'km'), 'mi', to)
        }
        if (unitType(from) === 'AS' && unitType(to) === 'IS') {
            return intSysConverter(briSysConverter(Number.parseFloat(unit * mi_to_km), from, 'mi'), 'km', to)
        }
    }
}

console.log(module.exports.unitConverter(1,'ft','km'))