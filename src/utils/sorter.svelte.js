export function createSorter(
    defaultAttribute = "points",
    defaultDescending = true
) {
    const sort = $state({
        attribute: defaultAttribute,
        descending: defaultDescending
    });

    function sortBy(attribute) {
        if (sort.attribute === attribute) {
            sort.descending = !sort.descending;
        } else {
            sort.attribute = attribute;
            sort.descending = defaultDescending;
        }
    }

    function compare(a, b) {
        const av = Number(a[sort.attribute] ?? 0);
        const bv = Number(b[sort.attribute] ?? 0);

        return sort.descending
            ? bv - av
            : av - bv;
    }

    return {
        sort,
        sortBy,
        compare
    };
}