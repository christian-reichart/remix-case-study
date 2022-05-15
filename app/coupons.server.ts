export type Coupon = {
  blockedTypes: Array<string>,
}

export function getAllPossibleCouponCombinations(coupons: Array<Coupon>): Array<Array<Coupon>> {
  let result: Array<Array<Coupon>> = [];
  coupons.forEach(coupon => {
      result = [...result, ...getPossibleCouponCombinationsForSingleCoupon(coupon, coupons, result)];
  })
  return result;
}

function getPossibleCouponCombinationsForSingleCoupon(coupon: Coupon, coupons: Array<Coupon>, currentResult: Array<Array<Coupon>>): Array<Array<Coupon>> {
    let combisForCoupon: Array<Array<Coupon>> = [];
    let firstCombiElementIndex: number | undefined;
    const combi = [coupon];

    coupons.filter(c => c !== coupon).forEach(couponIterator => {
      if(!couponBlockedByOthers(couponIterator, combi)) {
        combi.push(couponIterator);
        if(firstCombiElementIndex === undefined) {
          firstCombiElementIndex = coupons.findIndex(indexC => indexC === couponIterator);
        }
      }
    })

    if(!currentResult.find(prevCombi => arrayIncludesAllElements(prevCombi, combi))) {
      combisForCoupon.push(combi);
    }

    // first combi match might have blocked other combinations with subsequent elements
    if(firstCombiElementIndex !== undefined && coupons.length > firstCombiElementIndex + 1) {
      combisForCoupon = [
        ...combisForCoupon,
        ...getPossibleCouponCombinationsForSingleCoupon(
            coupon,
            coupons.slice(firstCombiElementIndex + 1),
            [...currentResult, ...combisForCoupon]
          )
      ];
    }

    return combisForCoupon;
    
}

function arrayIncludesAllElements<T extends unknown>(array: Array<T>, elements: Array<T>): boolean {
  return elements.every(el => array.includes(el));
}

function couponBlockedByOthers(coupon: Coupon, others: Array<Coupon>) {
  return others.some(otherCoupon => 
    otherCoupon.blockedTypes.some(blockedType => coupon.blockedTypes.includes(blockedType))
  );
}
