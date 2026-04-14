// CO vs sqz HJ+BTN rfi fold (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz HJ+BTN (RFI fold)",
  description: "CO cold called HJ, faces BTN squeeze, HJ folded — 6-max, 100bb",
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
        '100bb': "[0.74837219]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/0.74837219], [0.9838779799999999]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/0.9838779799999999], [2.5890468]Ah5h, Ad5d, As5s, Ac5c[/2.5890468], [3.6289544200000003]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/3.6289544200000003], [4.10552252]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/4.10552252], [6.43879945]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/6.43879945], [30.365705790000003]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/30.365705790000003]"
      },
      call: {
        '11bb': "[0.87308838]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/0.87308838], [1.29453116]9h8h, 9d8d, 9s8s, 9c8c[/1.29453116], [1.37907052]Th9h, Td9d, Ts9s, Tc9c[/1.37907052], [2.0504146]AhTh, AdTd, AsTs, AcTc[/2.0504146], [2.4735103]Ah5h, Ad5d, As5s, Ac5c[/2.4735103], [2.48422516]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/2.48422516], [2.93681805]7h6h, 7d6d, 7s6s, 7c6c[/2.93681805], [3.4988826100000003]KhTh, KdTd, KsTs, KcTc[/3.4988826100000003], [3.76586923]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/3.76586923], [4.34177634]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/4.34177634], [4.411282040000001]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/4.411282040000001], [5.50593262]5h4h, 5d4d, 5s4s, 5c4c[/5.50593262], [5.57184553]6h5h, 6d5d, 6s5s, 6c5c[/5.57184553], [6.34214148]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/6.34214148], [7.4904107799999995]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/7.4904107799999995], [8.0182971]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/8.0182971], [12.805748829999999]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/12.805748829999999], [14.48432962]AhJh, AdJd, AsJs, AcJc[/14.48432962], [18.05272178]KhQh, KdQd, KsQs, KcQc[/18.05272178], [22.3854]AhQh, AdQd, AsQs, AcQc[/22.3854]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
