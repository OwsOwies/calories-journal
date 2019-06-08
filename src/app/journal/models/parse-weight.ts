export function calculateUnit(unit_num, value): number {
    const calcMap = {
        1: function(e) {
            return e;
        },
        2: function(e) {
            const t = (35.274 * e) / 100;
            return Math.round(t) / 10;
        },
        4: function(e) {
            let t = (3.5273962 * e) / 100,
                A = parseInt(String(t / 16)),
                n = t - 16 * A;
            n = Number(n.toFixed(1));
            const I = A + ':' + n;
            return I;
        },
        8: function(e) {
            return e;
        },
        16: function(e) {
            const t = (35.195 * e) / 100;
            return Math.round(t) / 10;
        },
        20: function(e) {
            return e / 1e3;
        },
    };
    return calcMap[unit_num](value);
}

export function compileState(data): any {
    const state = {
        unit: '',
        measurement: 0.0,
        negative: false,
        batt_low: false,
        overload: false,
        measurement_still: false,
    };

    state.unit = getUnit(data[0]);
    const hex_components = [data[2] >> 4, data[3] >> 4, data[4] >> 4, data[5] >> 4];
    state.batt_low = (data[1] & 4) > 0;
    state.negative = (data[1] & 8) > 0;
    state.overload = (data[1] & 2) > 0;
    state.measurement_still = (data[1] & 1) > 0;

    let hex_string = '';
    for (let i = 0; i < hex_components.length; i++) {
        hex_string = hex_string + hex_components[i].toString(16);
    }
    state.measurement = parseInt(hex_string, 16);
    state.measurement = calculateUnit(data[0], state.measurement);

    if (state.negative) {
        state.measurement = state.measurement * -1;
    }

    return state;
}

function getUnit(num): string {
    const unitMap = {
        1: 'g',
        2: 'oz',
        4: 'oz:lb',
        8: 'ml',
        16: 'fl.oz',
        20: 'kg',
    };
    return unitMap[num];
}
