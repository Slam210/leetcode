function mergeSortedArrays(arr1, arr2) {
  let merged = [];
  let i = 0,
    j = 0;

  // Merge while both arrays have elements
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  // Add remaining elements (only one of these will run)
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }

  return merged;
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const merge = mergeSortedArrays(nums1, nums2);
  const length = merge.length;

  if (length % 2 === 0) {
    const mid1 = merge[length / 2 - 1];
    const mid2 = merge[length / 2];
    return (mid1 + mid2) / 2;
  } else {
    return merge[Math.floor(length / 2)];
  }
};

const nums1 = [1, 3];
const nums2 = [2];
const result = findMedianSortedArrays(nums1, nums2);
console.log(result);
