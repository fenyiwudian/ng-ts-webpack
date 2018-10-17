class Point {
  constructor(public x: number, public y: number) { }
  export() {
    return { x: this.x, y: this.y };
  }
}

interface HEHEHE {
  a: 0;
}

type HAHAHA = () => any;

type Constructor<T> = new (...args: any[]) => T;
type OverrideExportReturn<T extends Constructor<Point>, TNewReturn> = {
  new(...args: (T extends new (...a: infer A) => any ? A : [])):
    { export(): ReturnType<InstanceType<T>['export']> & TNewReturn } &
    Pick<InstanceType<T>, Exclude<keyof InstanceType<T>, 'export'>>
} & Pick<T, keyof T>;

function Tagged<T extends Constructor<Point>>(Base: T) {
  class MTagged extends Base {
    _tag: string;
    constructor(...args: any[]) {
      super(...args);
      this._tag = "";
    }
    export() {
      return {
        ...super.export(),
        _tag: this._tag,
      };
    }
  }
  return MTagged as unknown as OverrideExportReturn<typeof MTagged, { _tag: string }>;
}
function Maded<T extends Constructor<Point>>(Base: T) {
  class MMaded extends Base {
    _mad: string;
    constructor(...args: any[]) {
      super(...args);
      this._mad = "";
    }
    export() {
      return {
        ...super.export(),
        _mad: this._mad,
      };
    }
  }
  return MMaded as unknown as OverrideExportReturn<typeof MMaded, { _mad: string }>;
}

const TaggedPoint = Tagged(Point);

let point = new TaggedPoint(10, 20);
point._tag = "hello";
console.log(point.export()._tag);


const MadedTaggedPoint = Maded(TaggedPoint);
const mad = new MadedTaggedPoint(10, 20);
console.log(mad.export()._mad);
console.log(mad.export()._tag);
