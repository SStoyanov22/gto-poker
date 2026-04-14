// CO vs sqz UTG+BTN (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz UTG+BTN",
  description: "CO called UTG, faces BTN squeeze — 6-max, 100bb",
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
        '100bb': "[12.44933164]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/12.44933164], [21.204927809999997]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/21.204927809999997]"
      },
      call: {
        '11bb': "[1.01824497]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/1.01824497], [4.01997478]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/4.01997478], [4.8018821]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/4.8018821], [7.76493172]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/7.76493172], [9.0063909]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/9.0063909], [11.32026164]KhJh, KdJd, KsJs, KcJc[/11.32026164], [12.532278629999999]7h6h, 7d6d, 7s6s, 7c6c[/12.532278629999999], [13.744125160000001]Ah4h, Ad4d, As4s, Ac4c[/13.744125160000001], [16.37275137]6h5h, 6d5d, 6s5s, 6c5c[/16.37275137], [19.02350676]5h4h, 5d4d, 5s4s, 5c4c[/19.02350676], [19.07747332]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/19.07747332], [22.99939337]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/22.99939337], [28.698089160000002]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/28.698089160000002], [36.492821209999995]AhQh, AdQd, AsQs, AcQc[/36.492821209999995], [43.11439084]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/43.11439084], [49.987840649999995]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/49.987840649999995]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
