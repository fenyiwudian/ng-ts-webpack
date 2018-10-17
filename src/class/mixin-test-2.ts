// class Point {
//   constructor(public x: number, public y: number) { }
//   export() {
//     return { x: this.x, y: this.y };
//   }
// }
// type Constructor<T> = new (...args: any[]) => T;
// function Tagged<T extends Constructor<Point>>(Base: T) {
//   return class extends Base {
//     _tag: string;
//     constructor(...args: any[]) {
//       super(...args);
//       this._tag = "";
//     }
//     export() {
//       return {
//         ...super.export(),
//         _tag: this._tag,
//       };
//     }
//   };
// }

// const TaggedPoint = Tagged(Point);

// let tag = new TaggedPoint(10, 20);
// tag._tag = "hello";
// // typescript does not complaint about ._tag
// console.log(tag.export()._tag);
// function Madded<T extends Constructor<Point>>(Base: T) {
//   return class extends Base {
//     _mad: string;
//     constructor(...args: any[]) {
//       super(...args);
//       this._mad = "";
//     }
//     export() {
//       return {
//         ...super.export(),
//         _mad: this._mad,
//       };
//     }
//   };
// }


// const MadedTaggedPoint = Madded(TaggedPoint);
// const mad = new MadedTaggedPoint(10, 20);
// // typescript complaints:
// // [ts] Property '_tag' does not exist on type '{ _mad: string; x: number; y: number; }'.
// // because MadedTaggedPoint mixed TaggedPoint, so I thought mad.export() shuold have _tag property
// // console.log(mad.export()._tag);
