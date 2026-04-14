// SB vs HJ+CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "SB vs HJ+CO",
  description: "SB faces HJ raise + CO call — 6-max, 100bb",
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
        '15bb': "[1.09636]Ah3h, Ad3d, As3s, Ac3c[/1.09636], [2.08188]7h6h, 7d6d, 7s6s, 7c6c[/2.08188], [3.4144300000000003]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/3.4144300000000003], [9.265410000000001]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/9.265410000000001], [12.610899999999999]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/12.610899999999999], [16.3772]5h4h, 5d4d, 5s4s, 5c4c[/16.3772], [17.0716]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/17.0716], [20]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/20], [20.0474]6h5h, 6d5d, 6s5s, 6c5c[/20.0474], [20.5014]Ah4h, Ad4d, As4s, Ac4c[/20.5014], [23.4456]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/23.4456], [25.304199999999998]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/25.304199999999998], [28.5333]JhTh, JdTd, JsTs, JcTc[/28.5333], [61.1312]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/61.1312], [65.9466]AhQh, AdQd, AsQs, AcQc[/65.9466], [73.7811]Ah5h, Ad5d, As5s, Ac5c[/73.7811], [88.3044]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/88.3044], [98.441]AhJh, AdJd, AsJs, AcJc[/98.441], [99.6018]KhQh, KdQd, KsQs, KcQc[/99.6018], [99.9811]AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs[/99.9811], [99.99080000000001]QdQh, QsQh, QcQh, QsQd, QcQd, QcQs[/99.99080000000001], [99.99900000000001]KhJh, KdJd, KsJs, KcJc[/99.99900000000001], [99.9997]AhKh, AdKd, AsKs, AcKc, QhJh, QdJd, QsJs, QcJc[/99.9997], [99.9999]KdKh, KsKh, KcKh, KsKd, KcKd, KcKs[/99.9999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs"
      },
      call: {
        '2.5bb' : "[1.5589799999999998]AhJh, AdJd, AsJs, AcJc[/1.5589799999999998], [6.396019999999999]Ah9h, Ad9d, As9s, Ac9c[/6.396019999999999], [6.569800000000001]2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s[/6.569800000000001], [7.0135000000000005]4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s[/7.0135000000000005], [10.3017]3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/10.3017], [10.4766]Ah3h, Ad3d, As3s, Ac3c[/10.4766], [11.4556]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/11.4556], [11.6931]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/11.6931], [16.4804]7h6h, 7d6d, 7s6s, 7c6c[/16.4804], [19.1984]6h5h, 6d5d, 6s5s, 6c5c[/19.1984], [21.0362]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/21.0362], [24.2703]5h4h, 5d4d, 5s4s, 5c4c[/24.2703], [24.7076]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/24.7076], [25.848300000000002]Ah5h, Ad5d, As5s, Ac5c[/25.848300000000002], [27.8999]Ah4h, Ad4d, As4s, Ac4c[/27.8999], [29.3732]KhTh, KdTd, KsTs, KcTc[/29.3732], [31.4534]JhTh, JdTd, JsTs, JcTc[/31.4534], [34.0533]AhQh, AdQd, AsQs, AcQc[/34.0533], [39.2192]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/39.2192], [43.8134]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/43.8134], [58.093799999999995]AhTh, AdTd, AsTs, AcTc[/58.093799999999995], [62.773500000000006]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s[/62.773500000000006], [82.92819999999999]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/82.92819999999999]",
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
