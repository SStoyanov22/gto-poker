// BTN vs sqz CO+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BTN vs sqz CO+BB",
  description: "BTN called CO, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[1.52761695]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/1.52761695], [4.36633707]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/4.36633707], [11.78710062]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/11.78710062], [12.16854579]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/12.16854579]"
      },
      call: {
        '15bb': "[4.20157267]5h4h, 5d4d, 5s4s, 5c4c[/4.20157267], [5.83004342]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/5.83004342], [6.36185012]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/6.36185012], [7.86833936]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/7.86833936], [12.49707139]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/12.49707139], [14.55854953]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/14.55854953], [20.67477959]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/20.67477959], [20.68591833]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/20.68591833], [30.863483870000003]KhQh, KdQd, KsQs, KcQc[/30.863483870000003], [32.1251846]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/32.1251846], [35.18731639]AhJh, AdJd, AsJs, AcJc[/35.18731639]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
