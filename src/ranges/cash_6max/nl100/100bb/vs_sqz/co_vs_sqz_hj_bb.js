// CO vs sqz HJ+BB (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "CO vs sqz HJ+BB",
  description: "CO called HJ, faces BB squeeze — 6-max, 100bb",
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
        '100bb': "[3.62630168]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/3.62630168], [3.97238267]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/3.97238267], [6.23513612]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/6.23513612]"
      },
      call: {
        '15bb': "[0.86382489]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/0.86382489], [0.95618534]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/0.95618534], [2.02482547]5h4h, 5d4d, 5s4s, 5c4c[/2.02482547], [3.02336557]KhQh, KdQd, KsQs, KcQc[/3.02336557], [4.2218260899999995]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/4.2218260899999995], [5.03054602]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/5.03054602], [6.50888533]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/6.50888533], [7.34477972]6h5h, 6d5d, 6s5s, 6c5c[/7.34477972], [7.98180082]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/7.98180082], [9.24410244]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/9.24410244], [16.11165036]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/16.11165036], [22.38329577]AhQh, AdQd, AsQs, AcQc[/22.38329577], [38.08283773]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/38.08283773]"
      },
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
