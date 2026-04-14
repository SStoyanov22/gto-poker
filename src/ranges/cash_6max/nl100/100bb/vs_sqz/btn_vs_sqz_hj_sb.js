// BTN vs sqz HJ+SB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz HJ+SB",
  description: "BTN called HJ, faces SB squeeze — 6-max, 100bb",
  pfrSizes: {
    '2bb': {
      raise: "",
      call: "",
    },
    '2.25bb': {
      raise: "",
      call: "",
    },
    '2.5bb': {
      raise: {
        '100bb': "[1.72352413]5h4h, 5d4d, 5s4s, 5c4c[/1.72352413], [2.22673978]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/2.22673978], [5.051634819999999]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/5.051634819999999], [5.78002799]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/5.78002799], [7.677677750000001]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/7.677677750000001], [7.83343081]6h5h, 6d5d, 6s5s, 6c5c[/7.83343081], [11.67615068]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/11.67615068], [14.30287549]AhJh, AdJd, AsJs, AcJc[/14.30287549], [16.17115007]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/16.17115007], [17.62101169]KhQh, KdQd, KsQs, KcQc[/17.62101169], [18.48844871]AhQh, AdQd, AsQs, AcQc[/18.48844871], [18.85492589]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/18.85492589], [21.43829865]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/21.43829865], [31.652359569999998]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/31.652359569999998]"
      },
      call: {
        '15bb': "[3.3789343200000004]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/3.3789343200000004], [3.67615663]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/3.67615663], [18.52948951]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/18.52948951]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
