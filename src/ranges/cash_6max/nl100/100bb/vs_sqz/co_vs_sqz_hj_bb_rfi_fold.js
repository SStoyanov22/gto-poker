// CO vs sqz HJ+BB rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz HJ+BB (RFI fold)",
  description: "CO cold called HJ, faces BB squeeze, HJ folded — 6-max, 100bb",
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
        '100bb': "[2.20624426]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/2.20624426], [3.8166831599999997]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/3.8166831599999997], [20.0833055]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/20.0833055]"
      },
      call: {
        '15bb': "[0.86942402]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/0.86942402], [1.39288807]Th9h, Td9d, Ts9s, Tc9c[/1.39288807], [1.6660722]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/1.6660722], [1.68972514]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/1.68972514], [1.8993357400000002]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.8993357400000002], [2.51778132]6h5h, 6d5d, 6s5s, 6c5c[/2.51778132], [2.62285684]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/2.62285684], [2.90677339]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/2.90677339], [3.26273048]KhTh, KdTd, KsTs, KcTc[/3.26273048], [3.6511137300000005]7h6h, 7d6d, 7s6s, 7c6c[/3.6511137300000005], [4.04296596]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/4.04296596], [4.46338719]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/4.46338719], [5.06369601]Ah5h, Ad5d, As5s, Ac5c[/5.06369601], [5.6210257200000004]5h4h, 5d4d, 5s4s, 5c4c[/5.6210257200000004], [5.96806484]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/5.96806484], [6.0794141900000005]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/6.0794141900000005], [19.17584037]AhJh, AdJd, AsJs, AcJc[/19.17584037], [22.3854]AhQh, AdQd, AsQs, AcQc[/22.3854], [23.0884945]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/23.0884945], [26.46426991]KhQh, KdQd, KsQs, KcQc[/26.46426991]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
