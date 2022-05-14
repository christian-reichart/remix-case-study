export function getAllPossibleCouponCombinations<
  T extends { blockedTypes: Array<string> },
>(coupons: Array<T>): Array<Array<T>> {
  let result: Array<Array<T>> = [];

  // iterate through each coupon
  coupons.forEach(coupon => {
      getPossibleCouponCombinationsForSingleCoupon(coupon, coupons, result);
  })
  return result;
}

function arraysHoldSameValues<T extends unknown>(arr1: Array<T>, arr2: Array<T>): boolean {
  return arr1.length === arr2.length && arr1.every(el1 => arr2.includes(el1));
}

function arrayIsIncludedInArray<T extends unknown>(arr1: Array<T>, arr2: Array<T>): boolean {
  return arr1.every(el1 => arr2.includes(el1));
}

function getPossibleCouponCombinationsForSingleCoupon<T extends {blockedTypes: Array<string>}>(coupon: T, coupons: Array<T>, result: Array<Array<T>>): void {
    let firstCombiElementIndex: number | undefined;
    // fill combi array with current element
    const combi = [coupon];

    // try to attach other possible coupons
    coupons.forEach(c => {

      // if the same coupon, don't attach
      if(coupon === c) {
        return;
      }

  
      // if not blocked by any coupon already in combi AND the resulting combination doesn't exist already, add it to the combi
      if(!combi.find(combiCoupon => combiCoupon.blockedTypes.some(bt => c.blockedTypes.includes(bt))) &&
      !result.find(prevCombi => arraysHoldSameValues(prevCombi, [...combi, c]))) {
        combi.push(c);
        // Remember index of first addition to combi, to run it again with the following elements, because the first addition might lead to blocking of other elements
        if(firstCombiElementIndex === undefined) { firstCombiElementIndex = coupons.findIndex(indexC => indexC === c); }
      }
    })

    // if resulting combi isn't included in already existing combi, add it to the results
    if(!result.find(prevCombi => arrayIsIncludedInArray(combi, prevCombi))) {
      result.push(combi);
    }

    // run it again if there are elements left after first combi match
    if(firstCombiElementIndex !== undefined && coupons.length > firstCombiElementIndex + 1) {
        getPossibleCouponCombinationsForSingleCoupon(coupon, coupons.slice(firstCombiElementIndex + 1), result);
    }

    
}