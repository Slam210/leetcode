/**
 *
 * We’re given two Quad-Trees, each representing an n×n binary matrix. We must return a new Quad-Tree representing
 * the logical bitwise OR of these two matrices. If either matrix has 1 in a position, the result should have 1
 * there. We operate directly on the Quad-Tree representation, without expanding to the full matrix. The isLeaf
 * flag tells us whether a node represents a uniform grid of all 0s or all 1s. The Quad-Tree structure lets us avoid
 * processing every single cell when large uniform regions exist. We can use recursion. After recursion, if all four
 * children are leaves with the same value, merge them into one leaf node to keep the Quad-Tree compact.
 *
 */

class _Node {
  val: boolean;
  isLeaf: boolean;
  topLeft: _Node | null;
  topRight: _Node | null;
  bottomLeft: _Node | null;
  bottomRight: _Node | null;

  constructor(
    val?: boolean,
    isLeaf?: boolean,
    topLeft?: _Node,
    topRight?: _Node,
    bottomLeft?: _Node,
    bottomRight?: _Node
  ) {
    this.val = val === undefined ? false : val;
    this.isLeaf = isLeaf === undefined ? false : isLeaf;
    this.topLeft = topLeft === undefined ? null : topLeft;
    this.topRight = topRight === undefined ? null : topRight;
    this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
    this.bottomRight = bottomRight === undefined ? null : bottomRight;
  }
}

function intersect(
  quadTree1: _Node | null,
  quadTree2: _Node | null
): _Node | null {
  if (!quadTree1) return quadTree2;
  if (!quadTree2) return quadTree1;

  if (quadTree1.isLeaf && quadTree2.isLeaf) {
    return new _Node(quadTree1.val || quadTree2.val, true);
  }

  if (quadTree1.isLeaf) {
    if (quadTree1.val) return new _Node(true, true);
    return quadTree2;
  }

  if (quadTree2.isLeaf) {
    if (quadTree2.val) return new _Node(true, true);
    return quadTree1;
  }

  const topLeft = intersect(quadTree1.topLeft!, quadTree2.topLeft!);
  const topRight = intersect(quadTree1.topRight!, quadTree2.topRight!);
  const bottomLeft = intersect(quadTree1.bottomLeft!, quadTree2.bottomLeft!);
  const bottomRight = intersect(quadTree1.bottomRight!, quadTree2.bottomRight!);

  if (
    topLeft!.isLeaf &&
    topRight!.isLeaf &&
    bottomLeft!.isLeaf &&
    bottomRight!.isLeaf &&
    topLeft!.val === topRight!.val &&
    topRight!.val === bottomLeft!.val &&
    bottomLeft!.val === bottomRight!.val
  ) {
    return new _Node(topLeft!.val, true);
  }

  return new _Node(
    false,
    false,
    topLeft!,
    topRight!,
    bottomLeft!,
    bottomRight!
  );
}

function main(): void {
  const leaf1 = new _Node(true, true);
  const leaf0 = new _Node(false, true);

  const result = intersect(leaf1, leaf0);
  console.log(result);
}

main();

/**
 *
 * Time complexity is O(n)
 * Space complexity is O(n)
 *
 */
