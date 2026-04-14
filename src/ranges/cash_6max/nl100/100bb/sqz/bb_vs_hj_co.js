// BB vs HJ+CO (6-max, 100bb)
// Paste your GTO ranges under each pfr size below.
export default {
  name: "BB vs HJ+CO",
  description: "BB faces HJ raise + CO call — 6-max, 100bb",
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
        '15bb': "[1.03112]Ah3h, Ad3d, As3s, Ac3c[/1.03112], [5.64773]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/5.64773], [6.51452]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/6.51452], [6.59936]7h5h, 7d5d, 7s5s, 7c5c[/6.59936], [7.36464]6h4h, 6d4d, 6s4s, 6c4c[/7.36464], [9.6771]8h7h, 8d7d, 8s7s, 8c7c[/9.6771], [10.8492]6h5h, 6d5d, 6s5s, 6c5c[/10.8492], [13.549900000000001]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/13.549900000000001], [17.4144]5h4h, 5d4d, 5s4s, 5c4c[/17.4144], [19.9895]JhTh, JdTd, JsTs, JcTc[/19.9895], [28.245700000000003]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/28.245700000000003], [29.2064]Ah2h, Ad2d, As2s, Ac2c[/29.2064], [29.2512]Jh8h, Jd8d, Js8s, Jc8c[/29.2512], [33.0448]Ah5h, Ad5d, As5s, Ac5c[/33.0448], [33.1273]Ah4h, Ad4d, As4s, Ac4c[/33.1273], [34.1789]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/34.1789], [39.7254]7h6h, 7d6d, 7s6s, 7c6c[/39.7254], [53.4257]Jh9h, Jd9d, Js9s, Jc9c[/53.4257], [56.862199999999994]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/56.862199999999994], [85.7564]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/85.7564], [98.239]AhJh, AdJd, AsJs, AcJc[/98.239], [99.98949999999999]AhQh, AdQd, AsQs, AcQc[/99.98949999999999], [99.99719999999999]KhQh, KdQd, KsQs, KcQc[/99.99719999999999], [99.99759999999999]KhJh, KdJd, KsJs, KcJc[/99.99759999999999], [99.99900000000001]JdJh, JsJh, JcJh, JsJd, JcJd, JcJs[/99.99900000000001], [99.9999]AhKh, AdKd, AsKs, AcKc[/99.9999], AdAh, AsAh, AcAh, AsAd, AcAd, AcAs, AhKd, AhKs, AhKc, AdKh, AdKs, AdKc, AsKh, AsKd, AsKc, AcKh, AcKd, AcKs, KdKh, KsKh, KcKh, KsKd, KcKd, KcKs, QdQh, QsQh, QcQh, QsQd, QcQd, QcQs, QhJh, QdJd, QsJs, QcJc",
      },
      call: {
        '2.5bb': "[0.911862]QhJd, QhJs, QhJc, QdJh, QdJs, QdJc, QsJh, QsJd, QsJc, QcJh, QcJd, QcJs[/0.911862], [1.7609799999999998]AhJh, AdJd, AsJs, AcJc[/1.7609799999999998], [7.60524]4h3h, 4d3d, 4s3s, 4c3c[/7.60524], [10.0742]Th8h, Td8d, Ts8s, Tc8c[/10.0742], [14.2436]AhQd, AhQs, AhQc, AdQh, AdQs, AdQc, AsQh, AsQd, AsQc, AcQh, AcQd, AcQs[/14.2436], [18.7311]Jh9h, Jd9d, Js9s, Jc9c[/18.7311], [22.9195]KhJd, KhJs, KhJc, KdJh, KdJs, KdJc, KsJh, KsJd, KsJc, KcJh, KcJd, KcJs[/22.9195], [38.671]5h3h, 5d3d, 5s3s, 5c3c[/38.671], [44.5157]AhJd, AhJs, AhJc, AdJh, AdJs, AdJc, AsJh, AsJd, AsJc, AcJh, AcJd, AcJs[/44.5157], [47.6683]7h5h, 7d5d, 7s5s, 7c5c[/47.6683], [57.2746]7h6h, 7d6d, 7s6s, 7c6c[/57.2746], [57.404900000000005]8h7h, 8d7d, 8s7s, 8c7c[/57.404900000000005], [61.8174]8h6h, 8d6d, 8s6s, 8c6c[/61.8174], [62.130399999999995]6h4h, 6d4d, 6s4s, 6c4c[/62.130399999999995], [63.7566]9h7h, 9d7d, 9s7s, 9c7c[/63.7566], [65.8102]KhQd, KhQs, KhQc, KdQh, KdQs, KdQc, KsQh, KsQd, KsQc, KcQh, KcQd, KcQs[/65.8102], [66.8726]Ah4h, Ad4d, As4s, Ac4c[/66.8726], [66.9539]Ah5h, Ad5d, As5s, Ac5c[/66.9539], [68.3095]Ah2h, Ad2d, As2s, Ac2c[/68.3095], [71.3943]Ah6h, Ad6d, As6s, Ac6c[/71.3943], [72.6382]Th9h, Td9d, Ts9s, Tc9c[/72.6382], [74.4222]9h8h, 9d8d, 9s8s, 9c8c[/74.4222], [76.59559999999999]Ah7h, Ad7d, As7s, Ac7c[/76.59559999999999], [79.99810000000001]JhTh, JdTd, JsTs, JcTc[/79.99810000000001], [82.5647]5h4h, 5d4d, 5s4s, 5c4c[/82.5647], [86.45009999999999]6d6h, 6s6h, 6c6h, 6s6d, 6c6d, 6c6s[/86.45009999999999], [89.1508]6h5h, 6d5d, 6s5s, 6c5c[/89.1508], [93.4855]8d8h, 8s8h, 8c8h, 8s8d, 8c8d, 8c8s[/93.4855], [94.3523]7d7h, 7s7h, 7c7h, 7s7d, 7c7d, 7c7s[/94.3523], [98.8069]Ah8h, Ad8d, As8s, Ac8c[/98.8069], [98.96340000000001]Ah3h, Ad3d, As3s, Ac3c[/98.96340000000001], [99.6419]QhTh, QdTd, QsTs, QcTc[/99.6419], [99.9152]5d5h, 5s5h, 5c5h, 5s5d, 5c5d, 5c5s[/99.9152], [99.9383]Ah9h, Ad9d, As9s, Ac9c[/99.9383], [99.9847]KhTh, KdTd, KsTs, KcTc[/99.9847], [99.9987]AhTh, AdTd, AsTs, AcTc[/99.9987], [99.99940000000001]TdTh, TsTh, TcTh, TsTd, TcTd, TcTs[/99.99940000000001], [99.9999]9d9h, 9s9h, 9c9h, 9s9d, 9c9d, 9c9s, 4d4h, 4s4h, 4c4h, 4s4d, 4c4d, 4c4s, 3d3h, 3s3h, 3c3h, 3s3d, 3c3d, 3c3s[/99.9999], 2d2h, 2s2h, 2c2h, 2s2d, 2c2d, 2c2s",
      }
    },
    '3bb': {
      raise: "",
      call: "",
    },
  }
}
